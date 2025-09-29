import React from "react";
import ModalLayout from "../../../layout/modalLayout";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createRegisteration } from "../../../services/registeration";

interface AddEventInterface {
  isModalShow: boolean;
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IREGISTERATION {
  eventName: string;
  name: string;
  price: number;
  strikePrice: number;
  benefits: string;
}

const AddRegisteration: React.FC<AddEventInterface> = ({
  isModalShow,
  setIsModalShow,
}) => {
  if (!isModalShow) return null;
  const [events, _] = React.useState([
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
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IREGISTERATION>();

  const onSubmit = async (data: IREGISTERATION) => {
    const benefits = data.benefits
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

  try {
    await createRegisteration({ ...data, benefits });
    toast.success("Registration created successfully!");
  } catch (error: any) {
    console.error("Error creating registration:", error);
      toast.error(error.message);
    } finally {
      reset();
      setIsModalShow(false);
    }
  };

  return (
    <ModalLayout title={"Add Registeration"} setIsModalShow={setIsModalShow}>
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
              placeholder="Registeration Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>
          <div>
            <label htmlFor="" className="text-[13px] px-1 text-gray-500">
              Price <span className="text-red font-semibold">*</span>
            </label>
            <input
              type="number"
              className="border-[1px] p-2 w-full rounded border-gray-400"
              placeholder="Event Price"
              min={0}
              max={10000}
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-red-500">Price is required</span>
            )}
          </div>
          <div>
            <label htmlFor="" className="text-[13px] px-1 text-gray-500">
              Strike Price <span className="text-red font-semibold">*</span>
            </label>
            <input
              type="number"
              className="border-[1px] p-2 w-full rounded border-gray-400"
              placeholder="Strike Price"
              min={0}
              max={10000}
              {...register("strikePrice", { required: true })}
            />
            {errors.strikePrice && (
              <span className="text-red-500">Strike Price is required</span>
            )}
          </div>
          <div>
            <label htmlFor="" className="text-[13px] px-1 text-gray-500">
              Benefits{" "}
              <span className="text-[12px]">
                (For multiple benefits use comma separated value(,))
              </span>{" "}
              <span className="text-red font-semibold">*</span>
            </label>
            <textarea
              className="border-[1px] p-2 w-full rounded border-gray-400"
              placeholder="Benefits1, Benefits2, Benefits3"
              rows={4}
              cols={10}
              {...register("benefits", { required: true })}
            />
            {errors.benefits && (
              <span className="text-red-500">Benefits are required</span>
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

export default AddRegisteration;
