import React from "react";
import ModalLayout from "../../../layout/modalLayout";
import { useForm } from "react-hook-form";
import type { ISPEAKER } from "../../../interface/speaker/speaker.interface";
import { createSpeaker } from "../../../services";
import toast from "react-hot-toast";
import { uploadFile } from "../../../services/upload/upload.service";

interface AddEventInterface {
  // Define your interface properties here
  isModalShow: boolean;
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSpeaker: React.FC<AddEventInterface> = ({
  isModalShow,
  setIsModalShow,
}) => {
  if (!isModalShow) return null;
  const [events, _] = React.useState([
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

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISPEAKER>();

  const onSubmit = async (data: ISPEAKER) => {
    console.log("Form submitted:", data);
    // Make API call here
    try {
      await createSpeaker(data);
      toast.success("Speaker created successfully!");
    } catch (error: any) {
      console.error("Error creating speaker:", error);
      toast.error(error.message);
    } finally {
      reset();
      setIsModalShow(false);
    }
  };

  const uploadFileHandler = async (file: File) => {
    try {
      const url = await uploadFile(file);
      toast.success("File uploaded successfully!");
      console.log("url", url);
      setValue("avatar", url?.path, { shouldValidate: true });
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast.error(error.message);
    }
  };

  return (
    <ModalLayout title={"Add Speaker"} setIsModalShow={setIsModalShow}>
      <section className="py-4 px-5">
        <form action="" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-[13px] px-1 text-gray-500">
              Event Name <span className="text-red-500 font-semibold">*</span>
            </label>
            <select
              {...register("eventName", { required: true })}
              className="border-[1px] p-2 w-full rounded border-gray-400"
            >
              <option value="" selected disabled>
                Select a Event
              </option>
              {events.map((event: any) => (
                <option key={event.value} value={event.value}>
                  {event.label}
                </option>
              ))}
            </select>
            {errors.eventName && (
              <span className="text-red-500">Event is required</span>
            )}
          </div>
          <div>
            <label htmlFor="" className="text-[13px] px-1 text-gray-500">
              Name <span className="text-red font-semibold">*</span>
            </label>
            <input
              type="text"
              className="border-[1px] p-2 w-full rounded border-gray-400"
              placeholder="Event Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>
          <div>
            <label htmlFor="" className="text-[13px] px-1 text-gray-500">
              Designation <span className="text-red font-semibold">*</span>
            </label>
            <input
              type="text"
              className="border-[1px] p-2 w-full rounded border-gray-400"
              placeholder="Event Name"
              {...register("designation", { required: true })}
            />
            {errors.designation && (
              <span className="text-red-500">Designation is required</span>
            )}
          </div>
          <div>
            <label htmlFor="" className="text-[13px] px-1 text-gray-500">
              Organization <span className="text-red font-semibold">*</span>
            </label>
            <input
              type="text"
              className="border-[1px] p-2 w-full rounded border-gray-400"
              placeholder="Event Name"
              {...register("company", { required: true })}
            />
            {errors.company && (
              <span className="text-red-500">Company is required</span>
            )}
          </div>{" "}
          <div>
            <label htmlFor="" className="text-[13px] px-1 text-gray-500">
              Country <span className="text-red font-semibold">*</span>
            </label>
            <input
              type="text"
              className="border-[1px] p-2 w-full rounded border-gray-400"
              placeholder="Event Name"
              {...register("country", { required: true })}
            />
            {errors.country && (
              <span className="text-red-500">Country is required</span>
            )}
          </div>{" "}
          <div>
            <label htmlFor="" className="text-[13px] px-1 text-gray-500">
              Linkedin <span className="text-red font-semibold">*</span>
            </label>
            <input
              type="text"
              className="border-[1px] p-2 w-full rounded border-gray-400"
              placeholder="Event Name"
              {...register("linkedin", { required: true })}
            />
            {errors.linkedin && (
              <span className="text-red-500">LinkedIn is required</span>
            )}
          </div>
          <div>
            <label htmlFor="" className="text-[13px] px-1 text-gray-500">
              Avatar <span className="text-red font-semibold">*</span>
            </label>
            <input
              type="file"
              className="border-[1px] p-2 w-full rounded border-gray-400 text-gray-500"
              placeholder="Event Name"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Handle file upload
                  uploadFileHandler(file);
                }
              }}
            />
            {errors.avatar && (
              <span className="text-red-500">Avatar is required</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-green py-2 w-full flex items-center text-white justify-center rounded-sm text-xl cursor-pointer"
          >
            Submit
          </button>
        </form>
      </section>
    </ModalLayout>
  );
};

export default AddSpeaker;
