import { DataGrid } from "@mui/x-data-grid";
import { MdError } from "react-icons/md";

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
  return (
    <>
      <DataGrid
        density="compact"
        rows={rows}
        columns={columns}
        checkboxSelection={true}
      />
    </>
  );
}

export function ErrorBoundary({}) {
  return (
    <main className="flex flex-col  align-middle items-center justify-center font-medium text-xl m-10">
      <div className="bg-white p-10 rounded-2xl shadow-md">
        <h4 className="text-red-800 flex flex-col md:flex-row align-middle justify-center items-center gap-3">
          <MdError size={25} /> There was an error retrieving your data
        </h4>
      </div>
    </main>
  );
}
