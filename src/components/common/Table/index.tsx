import React from "react";
import Pagination from "../Pagonation";

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  selectedIds: (string | number)[];
  onCheckboxChange: any;
  rowKey: keyof T;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  rowKey,
}: TableProps<T>) {
  return (
    <div>
      <div className="overflow-x-auto p-3 rounded">
        <table className="min-w-full border text-white rounded">
          <thead>
            <tr className="bg-red text-left">
              {columns.map((col, idx) => (
                <th key={idx} className="p-3 border-b  text-[15px] font-[500]">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white text-black rounded">
            {data.map((row, rowIdx) => {
              const id = row[rowKey];
              return (
                <tr key={id}>
                  {columns.map((col, colIdx) => {
                    const rawValue = row[col.key];

                    let content = col.render
                      ? col.render(rawValue, row)
                      : rawValue;

                    return (
                      <td
                        key={`${rowIdx}-${colIdx}`}
                        className="p-3 border-b border-gray-200 text-[14px]"
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
}
