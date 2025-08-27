import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/dashboardLayout";
import { Trash2 } from "lucide-react";
import { Table } from "../../components/common/Table";
import AddPartner from "../../components/modal/AddPartner";
import TableHeader from "../../components/common/TableHeader";
import { deletePartner, getPartner } from "../../services/partner";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

interface SpeakerInterface {
  // Define your interface properties here
}
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
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
      await deletePartner(id);
      toast.success("Partner deleted successfully!");

      // TODO: Update your state/UI to reflect deletion
    } catch (error: any) {
      toast.error(error.message || "Delete failed.");
    }
  }
};
interface DataRow {
  _id: any;
  logo: string;
  partnerType: string;
}

const columns: TableColumn<DataRow>[] = [
  {
    key: "logo",
    label: "Logo",
    render: (value) => <img src={value} alt="img" className="w-20" />,
  },
  {
    key: "partnerType",
    label: "Partner Type",
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

const Partner: React.FC<SpeakerInterface> = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [filteredData, setFilteredData] = useState<DataRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalShow, setIsModalShow] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPartner();
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

  console.log("filter", filteredData);
  return (
    <DashboardLayout>
      <TableHeader
        setIsModalShow={setIsModalShow}
        setFilteredData={setFilteredData}
        data={data}
      />
      <section>
        <Table
          columns={columns}
          data={filteredData}
          rowKey="_id"
          selectedIds={selectedIds}
          onCheckboxChange={handleCheckboxChange}
        />
      </section>
      <AddPartner isModalShow={isModalShow} setIsModalShow={setIsModalShow} />
    </DashboardLayout>
  );
};

export default Partner;
