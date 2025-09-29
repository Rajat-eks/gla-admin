import React, { useState, useEffect } from "react";
import ModalLayout from "../../../layout/modalLayout";
import { useForm } from "react-hook-form";
import type { ICreateAgendaSession } from "../../../interface/agenda/agenda.interface";
import type { ISPEAKER } from "../../../interface/speaker/speaker.interface";
import {
  createAgendaSession,
  getAllAgendaSessions,
} from "../../../services/agenda";
import { getSpeakers } from "../../../services";
import toast from "react-hot-toast";
import { Plus, Trash2, Clock, Calendar } from "lucide-react";

interface AddAgendaInterface {
  isModalShow: boolean;
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  onAgendaCreated?: () => void;
}

type SessionFormData = {
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  speakerIds: string[];
  titleColor?: string;
};

type FormValues = {
  eventId: string;
  sessions: SessionFormData[];
};

type SessionStats = {
  totalSessions: number;
  sessionsByEvent: Record<string, number>;
  totalSpeakers: number;
};

type ApiSession = {
  eventId?: string;
  speakers?: Array<{ name: string }>;
};

const AddAgenda: React.FC<AddAgendaInterface> = ({
  isModalShow,
  setIsModalShow,
  onAgendaCreated,
}) => {
  const [speakers, setSpeakers] = useState<ISPEAKER[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    totalSessions: 0,
    sessionsByEvent: {},
    totalSpeakers: 0,
  });
  const [sessions, setSessions] = useState<SessionFormData[]>([
    {
      title: "",
      startTime: "",
      endTime: "",
      description: "",
      speakerIds: [],
      titleColor: "#ef4444",
    },
  ]);

  const [events] = useState([
    {
      label: "BANGKOK 2024",
      value: "BANGKOK2024",
    },
    {
      label: "DUBAI LITIGATION 2024",
      value: "DUBAILIT2024",
    },
    {
      label: "DUBAI CONCODIUM 2025",
      value: "CONDUBAI2025",
    },
    {
      label: "MALAYSIA  2026",
      value: "MALAYSIA2026",
    },
  ]);

  const { handleSubmit, reset, watch } = useForm<FormValues>();

  const selectedEventId = watch("eventId");

  useEffect(() => {
    if (isModalShow) {
      fetchSpeakers();
      fetchSessionStats();
    }
  }, [isModalShow]);

  useEffect(() => {
    if (selectedEventId) {
      fetchEventSessionStats(selectedEventId);
    }
  }, [selectedEventId]);

  if (!isModalShow) return null;

  const fetchSpeakers = async () => {
    try {
      const response = await getSpeakers();
      console.log(response,"response")
      setSpeakers(response.data || []);
    } catch (error) {
      console.error("Error fetching speakers:", error);
      toast.error("Failed to fetch speakers");
    }
  };

  const fetchSessionStats = async () => {
    try {
      const response = await getAllAgendaSessions();
      const allSessions = response.data || [];

      const stats: SessionStats = {
        totalSessions: allSessions.length,
        sessionsByEvent: {},
        totalSpeakers: new Set(
          allSessions.flatMap(
            (session: ApiSession) =>
              session.speakers?.map((speaker) => speaker.name) || []
          )
        ).size,
      };

      // Count sessions by event
      allSessions.forEach((session: ApiSession) => {
        if (session.eventId) {
          stats.sessionsByEvent[session.eventId] =
            (stats.sessionsByEvent[session.eventId] || 0) + 1;
        }
      });

      setSessionStats(stats);
    } catch (error) {
      console.error("Error fetching session stats:", error);
    }
  };

  const fetchEventSessionStats = async (eventId: string) => {
    try {
      const response = await getAllAgendaSessions();
      const eventSessions = (response.data || []).filter(
        (session: ApiSession) => session.eventId === eventId
      );

      // Update stats for the selected event
      setSessionStats((prev) => ({
        ...prev,
        sessionsByEvent: {
          ...prev.sessionsByEvent,
          [eventId]: eventSessions.length,
        },
      }));
    } catch (error) {
      console.error("Error fetching event session stats:", error);
    }
  };

  const addSession = () => {
    setSessions((prev) => [
      ...prev,
      {
        title: "",
        startTime: "",
        endTime: "",
        description: "",
        speakerIds: [],
        titleColor: "#ef4444",
      },
    ]);
  };

  const removeSession = (index: number) => {
    if (sessions.length > 1) {
      setSessions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateSession = (
    index: number,
    field: keyof SessionFormData,
    value: string | string[]
  ) => {
    setSessions((prev) =>
      prev.map((session, i) =>
        i === index ? { ...session, [field]: value } : session
      )
    );
  };

  const handleSpeakerToggle = (sessionIndex: number, speakerId: string) => {
    const session = sessions[sessionIndex];
    const newSpeakerIds = session.speakerIds.includes(speakerId)
      ? session.speakerIds.filter((id) => id !== speakerId)
      : [...session.speakerIds, speakerId];

    updateSession(sessionIndex, "speakerIds", newSpeakerIds);
  };

  const onSubmit = async (data: FormValues) => {
    // Validate sessions
    const validSessions = sessions.filter(
      (session) =>
        session.title.trim() &&
        session.startTime &&
        session.endTime &&
        session.speakerIds.length > 0
    );

    if (validSessions.length === 0) {
      toast.error(
        "Please add at least one valid session with title, timing, and speakers"
      );
      return;
    }

    if (validSessions.length !== sessions.length) {
      toast.error(
        "Some sessions are incomplete. Please fill all required fields."
      );
      return;
    }

    setLoading(true);
    try {
      console.log("validSessions", validSessions);
      // Create all sessions
      const promises = validSessions.map((session) => {
        const payload: ICreateAgendaSession = {
          title: session.title,
          startTime: session.startTime, // HH:mm
          endTime: session.endTime, // HH:mm
          description: session.description,
          speakerIds: session.speakerIds,
          eventId: data.eventId,
          titleColor: session.titleColor,
        };
        return createAgendaSession(payload);
      });

      await Promise.all(promises);

      toast.success(
        `${validSessions.length} agenda session(s) created successfully!`
      );

      // Reset form and close modal
      reset();
      setSessions([
        {
          title: "",
          startTime: "",
          endTime: "",
          description: "",
          speakerIds: [],
        },
      ]);
      setIsModalShow(false);

      // Callback to refresh agenda list
      if (onAgendaCreated) {
        onAgendaCreated();
      }
    } catch (error: unknown) {
      console.error("Error creating agenda sessions:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create agenda sessions";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalLayout
      title="Add Multiple Agenda Sessions"
      setIsModalShow={setIsModalShow}
    >
      <section className="py-4 px-5 max-h-[80vh] overflow-y-auto">
        {/* Statistics Dashboard */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Session Statistics
          </h3>

          {/* Sessions by Event */}
          {Object.keys(sessionStats.sessionsByEvent).length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Sessions by Event:
              </h4>
              <div className="space-y-1">
                {Object.entries(sessionStats.sessionsByEvent).map(
                  ([eventId, count]) => {
                    const event = events.find((e) => e.value === eventId);
                    return (
                      <div
                        key={eventId}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600">
                          {event?.label || eventId}
                        </span>
                        <span className="font-medium">{count} sessions</span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Event Selection */}

          {/* Sessions List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-[13px] px-1 text-gray-500">
                Sessions ({sessions.length}){" "}
                <span className="text-red-500 font-semibold">*</span>
              </label>
              <button
                type="button"
                onClick={addSession}
                className="flex 
                  items-center
                 gap-2 bg-blue-500
                 text-white px-3 py-1
                  rounded text-sm
                   hover:bg-blue-600"
              >
                <Plus className="w-4 h-4" />
                Add Session
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {sessions.map((session, sessionIndex) => (
                <div
                  key={sessionIndex}
                  className="border border-gray-300 rounded-lg p-4 bg-white"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">
                      Session {sessionIndex + 1}
                    </h4>
                    {sessions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSession(sessionIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    {/* Session Title + Color */}
                    <div>
                      <div className="flex items-end gap-3">
                        <div className="flex-1">
                          <label className="text-[12px] px-1 text-gray-500">
                            Session Title{" "}
                            <span className="text-red-500 font-semibold">
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            className="border-[1px] p-2 w-full rounded border-gray-400 text-sm"
                            placeholder="Enter session title"
                            value={session.title}
                            onChange={(e) =>
                              updateSession(
                                sessionIndex,
                                "title",
                                e.target.value
                              )
                            }
                            style={{ color: session.titleColor || "#111827" }}
                          />
                        </div>
                        <div>
                          <label className="text-[12px] px-1 text-gray-500">
                            Title Color
                          </label>
                          <input
                            type="color"
                            className="border-[1px] p-1 rounded border-gray-400 h-[42px] w-[42px]"
                            value={session.titleColor || "#111827"}
                            onChange={(e) =>
                              updateSession(
                                sessionIndex,
                                "titleColor",
                                e.target.value
                              )
                            }
                            aria-label="Pick title color"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[12px] px-1 text-gray-500">
                          Start Time{" "}
                          <span className="text-red-500 font-semibold">*</span>
                        </label>
                        <input
                          type="time"
                          className="border-[1px] p-2 w-full rounded border-gray-400 text-sm"
                          value={session.startTime}
                          onChange={(e) =>
                            updateSession(
                              sessionIndex,
                              "startTime",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="text-[12px] px-1 text-gray-500">
                          End Time{" "}
                          <span className="text-red-500 font-semibold">*</span>
                        </label>
                        <input
                          type="time"
                          className="border-[1px] p-2 w-full rounded border-gray-400 text-sm"
                          value={session.endTime}
                          onChange={(e) =>
                            updateSession(
                              sessionIndex,
                              "endTime",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-[12px] px-1 text-gray-500">
                        Description
                      </label>
                      <textarea
                        className="border-[1px] p-2 w-full rounded border-gray-400 resize-none text-sm"
                        placeholder="Enter session description (optional)"
                        rows={2}
                        value={session.description}
                        onChange={(e) =>
                          updateSession(
                            sessionIndex,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    {/* Speaker Selection */}
                    <div>
                      <label className="text-[12px] px-1 text-gray-500">
                        Speakers{" "}
                        <span className="text-red-500 font-semibold">*</span>
                      </label>
                      <div className="border-[1px] border-gray-400 rounded p-2 max-h-32 overflow-y-auto">
                        {speakers.length === 0 ? (
                          <div className="text-gray-500 text-xs text-center py-2">
                            No speakers available
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {speakers.map((speaker) => (
                              <div
                                key={speaker.name}
                                className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded cursor-pointer"
                                onClick={() =>
                                  handleSpeakerToggle(
                                    sessionIndex,
                                    speaker.name
                                  )
                                }
                              >
                                <input
                                  type="checkbox"
                                  checked={session.speakerIds.includes(
                                    speaker.name
                                  )}
                                  onChange={() =>
                                    handleSpeakerToggle(
                                      sessionIndex,
                                      speaker.name
                                    )
                                  }
                                  className="rounded border-gray-300"
                                />
                                <div className="flex items-center space-x-2 flex-1">
                                  {speaker.avatar && (
                                    <img
                                      src={speaker.avatar}
                                      alt={speaker.name}
                                      className="w-6 h-6 rounded-full object-cover"
                                    />
                                  )}
                                  <div>
                                    <div className="font-medium text-xs">
                                      {speaker.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {speaker.designation}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {session.speakerIds.length > 0 && (
                        <div className="mt-1">
                          <div className="text-xs text-gray-600">
                            Selected: {session.speakerIds.length} speaker(s)
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-green py-3 w-full flex items-center text-white justify-center rounded-sm text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Clock className="w-5 h-5 mr-2 animate-spin" />
                Creating {sessions.length} Session(s)...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Create {sessions.length} Session(s)
              </>
            )}
          </button>
        </form>
      </section>
    </ModalLayout>
  );
};

export default AddAgenda;
