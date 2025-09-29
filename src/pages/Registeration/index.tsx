import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/dashboardLayout";
import { Check, Eye, Trash2 } from "lucide-react";
import { Table } from "../../components/common/Table";
import TableHeader from "../../components/common/TableHeader";
import AddRegisteration from "../../components/modal/AddRegisteration";
import { getRegisteration } from "../../services/registeration";

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

const Registeration: React.FC<EventInterface> = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalShow, setIsModalShow] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getRegisteration();
      setData(response.data.data);
      console.log("data", response);
    })();
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
      <AddRegisteration
        isModalShow={isModalShow}
        setIsModalShow={setIsModalShow}
      />
    </DashboardLayout>
  );
};

export default Registeration;
