import React from "react";

interface TableHeaderInterface {
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredData?: any;
  data?: any[];
}

const TableHeader: React.FC<TableHeaderInterface> = ({
  setIsModalShow,
  setFilteredData,
  data,
}) => {
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
  ]);
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center justify-between w-full">
        <input
          onChange={(e) =>
            setFilteredData(
              data &&
                data.filter((item) =>
                  item?.name
                    ?.toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
            )
          }
          type="text"
          placeholder="Search"
          className="bg-white rounded p-2 w-[300px]  border-red border-2 "
        />
      </div>
      <div className="w-[70%] flex items-center justify-center px-10 gap-6">
        <button
          onClick={() => setIsModalShow(true)}
          className="bg-green py-2 px-4 rounded text-white cursor-pointer w-[30%]"
        >
          Add New
        </button>
        <div>
          <select
            onChange={(e: any) =>
              setFilteredData(
                data &&
                  [...data?.filter(
                    (item) =>
                      item?.eventName === e.target.value ||
                      item?.conference === e.target.value
                  )]
              )
            }
            className="border-[1px] p-2  rounded border-gray-400 w-full"
          >
            <option value="" selected disabled>
              Select a Event
            </option>
            {events?.map((event: any) => (
              <option key={event.value} value={event.value}>
                {event.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default TableHeader;
