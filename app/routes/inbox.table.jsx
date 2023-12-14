import { DataGrid } from "@mui/x-data-grid";
import { MdError } from "react-icons/md";
import { useState, useCallback } from "react";
import { MdDelete } from "react-icons/md";
import Modal from "@mui/material/Modal";

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = () => {
    console.log("Deleting rows:", selectedRows);
    handleClose();
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex items-center align-middle justify-center "
        >
          <div className="bg-white p-3 px-6 flex flex-col justify-center align-middle items-center outline-none rounded-md border shadow-md ">
            <p className="text-black mt-4 mb-12">
              Are you sure you want to delete{" "}
              <span className="font-black">{selectedRows.length}</span> message
              {selectedRows.length > 1 && <span>s</span>}?
            </p>
            <div className="flex gap-1 justify-end w-full">
              <button
                onClick={handleClose}
                type="button"
                className="text-white bg-slate-400 hover:bg-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                No
              </button>
              <button
                onClick={handleDeleteClick}
                type="button"
                className="text-white bg-primary hover:bg-hoverprim font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
        <button
          disabled={selectedRows.length === 0}
          onClick={handleOpen}
          className="bg-red-500 hover:bg-red-800 disabled:bg-gray-300 active:scale-105 transition text-white p-1 rounded-md dark:disabled:bg-slate-600"
        >
          <MdDelete size={20} />
        </button>
      </div>

      <DataGrid
        className="dark:bg-slate-700 bg-slate-50"
        density="compact"
        rows={rows}
        columns={columns}
        onRowSelectionModelChange={(itm) => setSelectedRows(itm)}
        checkboxSelection
      />
    </>
  );
}
