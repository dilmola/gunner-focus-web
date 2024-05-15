"use client";
import React, { useState } from "react";

import seemoreArrow from "../../../public/icons/seemore_arrow.png";
import Modal from "../modal/modal";

const Table = ({ columns, data, isExpanded, clickableColumns }) => {
  const tableHeight = isExpanded ? "auto" : "25rem";
  const [isHovered, setIsHovered] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = (rowIndex) => {
    setIsHovered(rowIndex);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleRowClick = (rowData) => {
    if (clickableColumns) {
      setSelectedRowData(rowData);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        className="rounded-lg overflow-hidden "
        style={{ height: tableHeight }}
      >
        <table className="w-full border-collapse text-left text-sm text-gray-700">
          <thead>
            <tr className="bg-[#F2F2F2] text-gray-800">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="p-4 border-b-2 border-gray-300 font-normal text-slate-700/60"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`bg-[#fafafa] text-gray-800 font-semibold ${
                  clickableColumns ? "cursor-pointer hover:bg-gray-100" : ""
                }`}
                onClick={() => clickableColumns && handleRowClick(row)}
                onMouseEnter={() => handleMouseEnter(rowIndex)}
                onMouseLeave={handleMouseLeave}
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-4">
                    {col.key === "lastFive" &&
                    typeof row.lastFive === "string" ? (
                      <div className="flex">
                        {row.lastFive.split("").map((result, index) => {
                          const color =
                            result === "W"
                              ? "bg-green-500"
                              : result === "D"
                              ? "bg-gray-500"
                              : result === "L"
                              ? "bg-red-500"
                              : "";
                          return (
                            <div
                              key={index}
                              className={`w-4 h-4 rounded-full ${color} mr-2`}
                            />
                          );
                        })}
                      </div>
                    ) : col.key === "photo" && row.photo ? (
                      <div className="flex items-center">
                        <img
                          src={row.photo}
                          alt={row[col.key]}
                          className="w-8 h-8 rounded mr-6 bg-[#D9D9D9]"
                        />
                        <span className="text-sm text-gray-800">
                          {row.player}
                        </span>
                      </div>
                    ) : col.key === "logo" && row.logo ? (
                      <div className="flex items-center">
                        <img
                          src={row.logo}
                          alt={row[col.key]}
                          className="w-8 h-8 rounded mr-3"
                        />
                      </div>
                    ) : col.key === "position" && seemoreArrow.src ? (
                      <div className="flex justify-between">
                        <div className="pr-4 font-semibold">{row.position}</div>
                        <div>
                          <img
                            src={seemoreArrow.src}
                            alt={seemoreArrow}
                            className="h-4"
                            style={{
                              opacity: isHovered === rowIndex ? 1 : 0,
                              transition: "opacity 0.5s ease",
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {/* Content of the modal */}
          <div>
            <h2>Selected Row Data</h2>
            <pre>{JSON.stringify(selectedRowData, null, 2)}</pre>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Table;
