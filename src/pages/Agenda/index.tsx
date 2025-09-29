import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layout/dashboardLayout";
import type { IAgendaSession } from "../../interface/agenda/agenda.interface";
import { getAllAgendaSessions } from "../../services/agenda";
import AddAgenda from "./add/Add-Agenda";

const Agenda: React.FC = () => {
  const [sessions, setSessions] = useState<IAgendaSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchAgendaSessions();
  }, []);

  const fetchAgendaSessions = async () => {
    try {
      setLoading(true);
      const response = await getAllAgendaSessions();
      setSessions(response.data || []);
    } catch (err) {
      console.log(err);
      // setError(
      //   err instanceof Error ? err.message : "Failed to fetch agenda sessions"
      // );
    } finally {
      setLoading(false);
    }
  };

  const handleAgendaCreated = () => {
    fetchAgendaSessions();
  };

  const formatTime = (time: string) => {
    try {
      const date = new Date(time);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return time;
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading agenda sessions...</div>
        </div>
      </DashboardLayout>
    );
  }

  // if (error) {
  //   return (
  //     <DashboardLayout>
  //       <div className="flex justify-center items-center h-64">
  //         <div className="text-red-600">Error: {error}</div>
  //       </div>
  //     </DashboardLayout>
  //   );
  // }

  return (
    <DashboardLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-3xl font-semibold">Agenda</h4>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-green text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Add Session
          </button>
        </div>
        <div className="border-[1px] rounded p-10 my-10 border-gray-300 space-y-2">
          {sessions.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No agenda sessions found. Click the + button to add a new session.
            </div>
          ) : (
            sessions.map((session) => (
              <section
                key={session.id}
                className="flex items-center border-[1px] p-4 rounded text-gray-600 text-[18px] hover:bg-gray-50"
              >
                <div className="w-[30%] text-[16px] font-medium">
                  {formatTime(session.startTime)} -{" "}
                  {formatTime(session.endTime)}
                </div>
                <span className="border-l-[1px] h-8 mx-4"></span>
                <div className="w-[70%]">
                  <div className="text-red-600 font-semibold mb-2">
                    {session.title}
                  </div>
                  {session.description && (
                    <div className="text-gray-500 text-sm mb-2">
                      {session.description}
                    </div>
                  )}
                  {session.speakers && session.speakers.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {session.speakers.map((speaker, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                        >
                          {speaker.avatar && (
                            <img
                              src={speaker.avatar}
                              alt={speaker.name}
                              className="w-6 h-6 rounded-full mr-2 object-cover"
                            />
                          )}
                          <span className="font-medium">{speaker.name}</span>
                          {speaker.designation && (
                            <span className="text-gray-500 ml-1">
                              - {speaker.designation}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="text-xl cursor-pointer hover:text-blue-600 transition-colors"
                >
                  +
                </button>
              </section>
            ))
          )}
        </div>
      </div>

      {/* Add Agenda Modal */}
      <AddAgenda
        isModalShow={isAddModalOpen}
        setIsModalShow={setIsAddModalOpen}
        onAgendaCreated={handleAgendaCreated}
      />
    </DashboardLayout>
  );
};

export default Agenda;
