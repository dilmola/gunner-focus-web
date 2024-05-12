const Table = ({ columns, data, isExpanded }) => {
  const tableHeight = isExpanded ? "auto" : "25rem";

  return (
    <div>
      <div
        className="rounded-lg overflow-hidden border"
        style={{ height: tableHeight }}
      >
        <table className="w-full border-collapse text-left text-sm text-gray-700">
          <thead>
            <tr className="bg-[#F2F2F2] text-gray-800">
              {columns.map((col) => (
                <th key={col.key} className="p-4 border-b-2 border-gray-300 font-normal text-slate-700/60">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-[#fafafa] text-gray-800 font-semibold">
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
    </div>
  );
};

export default Table;
