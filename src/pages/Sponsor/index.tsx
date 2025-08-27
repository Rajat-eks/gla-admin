import React, { useState } from "react";
import DashboardLayout from "../../layout/dashboardLayout";
import { Check, Eye, Trash2 } from "lucide-react";
import { Table } from "../../components/common/Table";
import AddEvent from "../../components/modal/AddEvent";
import AddSpeaker from "../../components/modal/AddSpeaker";
import AddPartner from "../../components/modal/AddPartner";
import AddSponsor from "../../components/modal/AddSponsor";
import TableHeader from "../../components/common/TableHeader";

interface SpeakerInterface {
  // Define your interface properties here
}
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataRow {
  id: number;
  projectname: string;
  contentType: string;
  security: string;
  flaggedBy: string;
  reason: string;
  status: string;
  date: string;
}

const Status = ({ status }: { status: string }) => {
  const color =
    status.toLowerCase() === "pending"
      ? "bg-yellow-500"
      : status.toLowerCase() === "deleted"
      ? "bg-red-600"
      : "bg-green-600";

  return <span className={`h-3 w-3 ${color} rounded-full inline-block mr-2`} />;
};
const Security = ({ status }: { status: string }) => {
  const color =
    status.toLowerCase() === "medium"
      ? "bg-yellow-500"
      : status.toLowerCase() === "high"
      ? "bg-red-600"
      : "bg-green-600";

  return <span className={`h-3 w-3 ${color} rounded-full inline-block mr-2`} />;
};

const columns: TableColumn<DataRow>[] = [
  {
    key: "projectname",
    label: "Project Name",
  },
  {
    key: "contentType",
    label: "Content Type",
  },
  {
    key: "security",
    label: "Security",
    render: (value) => (
      <span className='flex items-center'>
        <Security status={value} />
        {value}
      </span>
    ),
  },
  {
    key: "flaggedBy",
    label: "Flagged By",
  },
  {
    key: "reason",
    label: "Reason",
  },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <span className='flex items-center'>
        <Status status={value} />
        {value}
      </span>
    ),
  },
  {
    key: "date",
    label: "Date",
  },
  {
    key: "id",
    label: "Action",
    render: () => (
      <div className='flex items-center gap-3 text-[13px]'>
        <Eye className='text-gray-600 cursor-pointer' />
        <Check className='text-green-600 cursor-pointer' />
        <Trash2 className='text-red-600 cursor-pointer' />
      </div>
    ),
  },
];

const initialData: DataRow[] = [
  {
    id: 1,
    projectname: "EcoVision",
    contentType: "Video",
    security: "High",
    flaggedBy: "User123",
    reason: "Inappropriate content",
    status: "Pending",
    date: "2025-08-06",
  },
  {
    id: 2,
    projectname: "GreenFuture",
    contentType: "Image",
    security: "Medium",
    flaggedBy: "Moderator001",
    reason: "Spam",
    status: "Approved",
    date: "2025-08-05",
  },

  {
    id: 2,
    projectname: "GreenFuture",
    contentType: "Image",
    security: "Medium",
    flaggedBy: "Moderator001",
    reason: "Spam",
    status: "Approved",
    date: "2025-08-05",
  },
  {
    id: 2,
    projectname: "GreenFuture",
    contentType: "Image",
    security: "Low",
    flaggedBy: "Moderator001",
    reason: "Spam",
    status: "Deleted",
    date: "2025-08-05",
  },
  {
    id: 2,
    projectname: "GreenFuture",
    contentType: "Image",
    security: "Medium",
    flaggedBy: "Moderator001",
    reason: "Spam",
    status: "Pending",
    date: "2025-08-05",
  },
  {
    id: 2,
    projectname: "GreenFuture",
    contentType: "Image",
    security: "Low",
    flaggedBy: "Moderator001",
    reason: "Spam",
    status: "Deleted",
    date: "2025-08-05",
  },
  {
    id: 2,
    projectname: "GreenFuture",
    contentType: "Image",
    security: "Low",
    flaggedBy: "Moderator001",
    reason: "Spam",
    status: "Deleted",
    date: "2025-08-05",
  },
  {
    id: 2,
    projectname: "GreenFuture",
    contentType: "Image",
    security: "Low",
    flaggedBy: "Moderator001",
    reason: "Spam",
    status: "Deleted",
    date: "2025-08-05",
  },
  {
    id: 2,
    projectname: "GreenFuture",
    contentType: "Image",
    security: "Low",
    flaggedBy: "Moderator001",
    reason: "Spam",
    status: "Deleted",
    date: "2025-08-05",
  },
  {
    id: 2,
    projectname: "GreenFuture",
    contentType: "Image",
    security: "Low",
    flaggedBy: "Moderator001",
    reason: "Spam",
    status: "Deleted",
    date: "2025-08-05",
  },
];
const Sponsor: React.FC<SpeakerInterface> = () => {
  const [data, setData] = useState<DataRow[]>(initialData);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalShow, setIsModalShow] = useState(false);
  const handleCheckboxChange = (id: number) => {
    if (id === -1) {
      setSelectedIds((prev) =>
        prev.length === data.length ? [] : data.map((d) => d.id)
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
        <TableHeader setIsModalShow={setIsModalShow} />
        <Table
          columns={columns}
          data={data}
          rowKey='id'
          selectedIds={selectedIds}
          onCheckboxChange={handleCheckboxChange}
        />
      </section>
      <AddSponsor isModalShow={isModalShow} setIsModalShow={setIsModalShow} />
    </DashboardLayout>
  );
};

export default Sponsor;
