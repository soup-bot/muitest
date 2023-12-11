import { DataGrid } from "@mui/x-data-grid";
import { MdError } from "react-icons/md";
import { useState, useCallback } from "react";
import { MdDelete } from "react-icons/md";

const rows = [
  { id: 1, col1: "User 1", col2: "Message 1", col3: "5-12-2023 15:42" },
  { id: 2, col1: "User 2", col2: "Message 2", col3: "5-12-2023 15:42" },
  { id: 3, col1: "User 3", col2: "Message 3", col3: "5-12-2023 15:42" },
  { id: 4, col1: "User 4", col2: "Message 4", col3: "5-12-2023 15:42" },
  { id: 5, col1: "User 5", col2: "Message 5", col3: "5-12-2023 15:42" },
  { id: 6, col1: "User 6", col2: "Message 6", col3: "5-12-2023 15:42" },
  { id: 7, col1: "User 7", col2: "Message 7", col3: "5-12-2023 15:42" },
  { id: 8, col1: "User 8", col2: "Message 8", col3: "5-12-2023 15:42" },
  { id: 9, col1: "User 9", col2: "Message 9", col3: "5-12-2023 15:42" },
  { id: 10, col1: "User 10", col2: "Message 10", col3: "5-12-2023 15:42" },
];

const columns = [
  { field: "col1", headerName: "From", width: 150 },
  { field: "col2", headerName: "Message", width: 250 },
  { field: "col3", headerName: "Received", width: 150 },
];

export default function InboxTable() {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleDeleteClick = () => {
    console.log("Deleting rows:", selectedRows);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          disabled={selectedRows.length === 0}
          onClick={handleDeleteClick}
          className="bg-red-500 hover:bg-red-800 disabled:bg-gray-300 active:scale-105 transition text-white p-1 rounded-md"
        >
          <MdDelete size={20} />
        </button>
      </div>

      <DataGrid
        density="compact"
        rows={rows}
        columns={columns}
        onRowSelectionModelChange={(itm) => setSelectedRows(itm)}
        checkboxSelection
      />
    </>
  );
}
