"use client";
import React, { useState } from "react";
import Modal from "../modal/modal";

const Table = ({ children, columns, data, isExpanded, clickableColumns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableHeight = isExpanded ? "auto" : "25rem";

  const handleRowClick = (row) => {
    if (clickableColumns) {
      setSelectedRow(row);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        className="rounded-lg overflow-hidden"
        style={{ height: tableHeight }}
      >
        <table className="w-full border-collapse text-left text-sm text-mirageColor dark:text-romanceColor">
          {columns && columns.length > 0 ? (
            <thead>
              <tr className="bg-bg-transparent">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`p-2 sm:p-4 border-b-2 border-mirageOpa01Color dark:border-romanceOpa01Color font-normal text-mirageOpa50Color dark:text-romanceOpa50Color ${
                      ["lastFive", "goalFor", "goalAgainst"].includes(col.key)
                        ? "hidden sm:table-cell"
                        : ""
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
          ) : (
            <thead>
              <tr className="bg-[#F2F2F2] text-gray-800">
                <th className="p-4 border-b-2 border-gray-300 font-normal text-slate-700/60">
                  No Data Available
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {React.Children.map(children, (child, rowIndex) =>
              React.cloneElement(child, {
                onClick: () => handleRowClick(data[rowIndex]),
                className: clickableColumns
                  ? "cursor-pointer hover:bg-romanceOpa50Color dark:hover:bg-mirageOpa50Color"
                  : "",
              })
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal} selectedRowData={selectedRow} />
      )}
    </div>
  );
};

export default Table;
