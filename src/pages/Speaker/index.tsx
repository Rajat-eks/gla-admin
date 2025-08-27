import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/dashboardLayout";
import { Linkedin, Trash2 } from "lucide-react";
import { Table } from "../../components/common/Table";
import AddSpeaker from "../../components/modal/AddSpeaker";
import TableHeader from "../../components/common/TableHeader";
import toast from "react-hot-toast";
import { deleteSpeaker, getSpeakers } from "../../services";
import Swal from "sweetalert2";

interface SpeakerInterface {
  // Define your interface properties here
}
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataRow {
  _id: number;
  country: string;
  designation: string;
  eventId: string;
  linkdin: string;
  name: string;
  company: string;
  createdAt: string;
  avatar: string;
}

const deleteHandler = async (id: any) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won’t be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await deleteSpeaker(id);
      toast.success("Speaker deleted successfully!");

      // TODO: Update your state/UI to reflect deletion
    } catch (error: any) {
      toast.error(error.message || "Delete failed.");
    }
  }
};

const columns: TableColumn<DataRow>[] = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "designation",
    label: "Designation",
  },
  // {
  //   key: "security",
  //   label: "Security",
  //   render: (value) => (
  //     <span className="flex items-center">
  //       <Security status={value} />
  //       {value}
  //     </span>
  //   ),
  // },
  {
    key: "company",
    label: "Organization",
  },
  {
    key: "linkdin",
    label: "LinkedIn URL",
    render: (value) => (
      <a
        className="flex items-center text-red"
        href={value}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin />
      </a>
    ),
  },
  // {
  //   key: "status",
  //   label: "Status",
  //   render: (value) => (
  //     <span className="flex items-center">
  //       <Status status={value} />
  //       {value}
  //     </span>
  //   ),
  // },
  {
    key: "country",
    label: "Country",
  },
  {
    key: "avatar",
    label: "Avatar",
    render: (value) => (
      <img src={value} alt="image" className="w-40 h-20 object-contain" />
    ),
  },
  {
    key: "_id",
    label: "Action",
    render: (value) => (
      <div className="flex items-center gap-3 text-[13px]">
        <Trash2
          className="text-red-600 cursor-pointer"
          onClick={() => deleteHandler(value)}
        />
      </div>
    ),
  },
];

const Speaker: React.FC<SpeakerInterface> = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [filteredData, setFilteredData] = useState<DataRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalShow, setIsModalShow] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await getSpeakers();
        setData(response.data);
        setFilteredData(response.data);
      } catch (error: any) {
        toast.error(error.message);
      }
    })();
  }, []);

  const handleCheckboxChange = (id: number) => {
    if (id === -1) {
      setSelectedIds((prev) =>
        prev.length === data.length ? [] : data.map((d) => d._id)
      );
    } else {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    }
  };
  return (
    <DashboardLayout>
      <section>
        <TableHeader setIsModalShow={setIsModalShow} setFilteredData={setFilteredData} data={data} />
        <Table
          columns={columns}
          data={filteredData}
        
          rowKey="_id"
          selectedIds={selectedIds}
          onCheckboxChange={handleCheckboxChange}
        />
      </section>
      <AddSpeaker isModalShow={isModalShow} setIsModalShow={setIsModalShow} />
    </DashboardLayout>
  );
};

export default Speaker;
