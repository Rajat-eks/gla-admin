import React from "react";
import ModalLayout from "../../../layout/modalLayout";
import { useForm } from "react-hook-form";
import { createEvent } from "../../../services";
import toast from "react-hot-toast";

interface AddEventInterface {
  // Define your interface properties here
  isModalShow: boolean;
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}
type FormValues = {
  eventName: string;
  eventDate: string;
  eventVenue: string;
  eventDescription: string;
  slug: string;
  bannerUrl: string;
};

const AddEvent: React.FC<AddEventInterface> = ({
  isModalShow,
  setIsModalShow,
}) => {
  if (!isModalShow) return null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted:", data);
    // Make API call here
    try {
      await createEvent(data);
      toast.success("Event created successfully!");
    } catch (error: any) {
      console.error("Error creating event:", error);
      toast.error(error.message);
    }
  };

  return (
    <ModalLayout title="Add Event" setIsModalShow={setIsModalShow}>
      <section className="py-4 px-5">
        <form action="" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="" className="text-[13px] px-1 text-gray-500">
              Event Name <span className="text-red font-semibold">*</span>
            </label>
            <input
              type="text"
              className="border-[1px] p-2 w-full rounded border-gray-400"
              placeholder="Event Name"
              {...register("eventName", { required: "Event Name is required" })}
            />
            {errors.eventName && <p>{errors.eventName.message}</p>}
          </div>
          <div>
            <label htmlFor="" className="text-[13px] px-1 text-gray-500">
              Event Date <span className="text-red font-semibold">*</span>
            </label>
            <input
              type="date"
              className="border-[1px] p-2 w-full rounded border-gray-400"
              placeholder="Event Date"
              {...register("eventDate", { required: "Event Date is required" })}
            />
            {errors.eventDate && <p>{errors.eventDate.message}</p>}
          </div>
          <div>
            <label htmlFor="" className="text-[13px] px-1 text-gray-500">
              Event Venue <span className="text-red font-semibold">*</span>
            </label>
            <input
              type="text"
              className="border-[1px] p-2 w-full rounded border-gray-400"
              placeholder="Event Venue"
              {...register("eventVenue", {
                required: "Event Venue is required",
              })}
            />
            {errors.eventVenue && <p>{errors.eventVenue.message}</p>}
          </div>
          <div>
            <label htmlFor="" className="text-[13px] px-1 text-gray-500">
              Event Description{" "}
              <span className="text-red font-semibold">*</span>
            </label>
            <input
              type="text"
              className="border-[1px] p-2 w-full rounded border-gray-400"
              placeholder="Event Description"
              {...register("eventDescription", {
                required: "Event Description is required",
              })}
            />
            {errors.eventDescription && (
              <p>{errors.eventDescription.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="" className="text-[13px] px-1 text-gray-500">
              Slug <span className="text-red font-semibold">*</span>
            </label>
            <input
              type="text"
              className="border-[1px] p-2 w-full rounded border-gray-400"
              placeholder="Slug"
              {...register("slug", { required: "Slug is required" })}
            />
            {errors.slug && <p>{errors.slug.message}</p>}
          </div>
          <div>
            <label htmlFor="" className="text-[13px] px-1 text-gray-500">
              Banner Url <span className="text-red font-semibold">*</span>
            </label>
            <input
              type="text"
              className="border-[1px] p-2 w-full rounded border-gray-400"
              placeholder="Banner Url"
              {...register("bannerUrl", { required: "Banner Url is required" })}
            />
            {errors.bannerUrl && <p>{errors.bannerUrl.message}</p>}
          </div>
          <button className="bg-green py-2 w-full flex items-center text-white justify-center rounded-sm text-xl cursor-pointer">
            Submit
          </button>
        </form>
      </section>
    </ModalLayout>
  );
};

export default AddEvent;
