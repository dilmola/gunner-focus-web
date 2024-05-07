const Table = ({ columns, data }) => (
  <div className="rounded-lg overflow-hidden">
    <table className="w-full border-collapse text-left text-sm text-gray-700">
      <thead>
        <tr className="bg-[#F2F2F2] text-gray-800">
          {columns.map((col) => (
            <th key={col.key} className="p-4 border-b-2 border-gray-300">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="bg-[#fafafa] text-gray-800">
            {columns.map((col) => (
              <td key={col.key} className="p-4">
                {col.key === "player" && row.image ? (
                  <div className="flex items-center">
                    <img
                      src={row.image}
                      alt={row[col.key]}
                      className="w-8 h-8 rounded mr-3 bg-[#D9D9D9]"
                    />
                    {row[col.key]}
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
);

export default Table;
