import React from "react";
import ModalLayout from "../../../layout/modalLayout";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { uploadFile } from "../../../services/upload/upload.service";
import type { IPARTNER } from "../../../interface/partner/partner.interafce";
import { createPartner } from "../../../services/partner";

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
      label: "DUBAI CONCODIUM 2025",
      value: "CONDUBAI2025",
    },
  ]);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPARTNER>();

  const onSubmit = async (data: IPARTNER) => {
    // Make API call here
    try {
      await createPartner(data);
      toast.success("Partner created successfully!");
    } catch (error: any) {
      console.error("Error creating partner:", error);
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
      setValue("logo", url?.path, { shouldValidate: true });
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast.error(error.message);
    }
  };

  return (
    <ModalLayout title={"Add Partner"} setIsModalShow={setIsModalShow}>
      <section className="py-4 px-5">
        <form action="" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-[13px] px-1 text-gray-500">
              Event Name <span className="text-red-500 font-semibold">*</span>
            </label>
            <select
              {...register("conference", { required: true })}
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
            {errors.conference && (
              <span className="text-red-500">Event is required</span>
            )}
          </div>
          <label className="text-[13px] px-1 text-gray-500">
            Partner Type <span className="text-red-500 font-semibold">*</span>
          </label>
          <select
            {...register("partnerType", { required: true })}
            className="border-[1px] p-2 w-full rounded border-gray-400"
          >
            <option value="" selected disabled>
              Select Partner Type
            </option>
            <option value="MEDIAPARTNER">Media Partner</option>
            <option value="ASSOCIATE">Associate</option>
          </select>
          {errors.partnerType && (
            <span className="text-red-500">Partner Type is required</span>
          )}

          <div>
            <label htmlFor="" className="text-[13px] px-1 text-gray-500">
              Logo <span className="text-red font-semibold">*</span>
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
            {errors.logo && (
              <span className="text-red-500">Logo is required</span>
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
