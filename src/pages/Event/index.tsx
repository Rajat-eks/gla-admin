import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/dashboardLayout";
import { Check, Eye, Trash2 } from "lucide-react";
import { Table } from "../../components/common/Table";
import AddEvent from "../../components/modal/AddEvent";
import TableHeader from "../../components/common/TableHeader";
import { getEvent } from "../../services";

interface EventInterface {
  // Define your interface properties here
}
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataRow {
  id: number;
  bannerUrl: string;
  createdAt: string;
  eventDate: string;
  eventDescription: string;
  eventName: string;
  eventVenue: string;
  slug: string;
}




const columns: TableColumn<DataRow>[] = [
  {
    key: "bannerUrl",
    label: "Event Name",
  },
  {
    key: "eventVenue",
    label: "Event Venue",
  },
  {
    key: "eventDate",
    label: "Event Date",
  },

  {
    key: "slug",
    label: "Slug",
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
    key: "id",
    label: "Action",
    render: () => (
      <div className="flex items-center gap-3 text-[13px]">
        <Eye className="text-gray-600 cursor-pointer" />
        <Check className="text-green-600 cursor-pointer" />
        <Trash2 className="text-red-600 cursor-pointer" />
      </div>
    ),
  },
];

const Event: React.FC<EventInterface> = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalShow, setIsModalShow] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getEvent();
      setData(response.data.data);
    })();
    console.log(data);
  }, []);

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
          rowKey="id"
          selectedIds={selectedIds}
          onCheckboxChange={handleCheckboxChange}
        />
      </section>
      <AddEvent isModalShow={isModalShow} setIsModalShow={setIsModalShow} />
    </DashboardLayout>
  );
};

export default Event;
