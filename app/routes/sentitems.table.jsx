import { DataGrid } from "@mui/x-data-grid";
import { MdError } from "react-icons/md";
import { useState, useCallback } from "react";
import { MdDelete } from "react-icons/md";
import Modal from "@mui/material/Modal";
// const rows = [
//   {
//     id: 1,
//     col1: "User 1",
//     col2: "Hello World",
//     col3: "Delivered",
//     col4: "5-12-2023 15:42",
//   },
//   {
//     id: 2,
//     col1: "User 2",
//     col2: "Bye World",
//     col3: "Delivered",
//     col4: "5-12-2023 11:41",
//   },
//   {
//     id: 3,
//     col1: "User 3",
//     col2: "Hi World",
//     col3: "Delivered",
//     col4: "5-12-2023 15:44",
//   },
//   {
//     id: 4,
//     col1: "User 4",
//     col2: "Hello World",
//     col3: "Pending",
//     col4: "5-12-2023 10:30",
//   },
//   {
//     id: 5,
//     col1: "User 5",
//     col2: "Bye World",
//     col3: "Delivered",
//     col4: "5-12-2023 09:15",
//   },
//   {
//     id: 6,
//     col1: "User 6",
//     col2: "Hi World",
//     col3: "Failed",
//     col4: "5-12-2023 08:20",
//   },
//   {
//     id: 7,
//     col1: "User 7",
//     col2: "Hello World",
//     col3: "Delivered",
//     col4: "5-12-2023 14:10",
//   },
//   {
//     id: 8,
//     col1: "User 8",
//     col2: "Bye World",
//     col3: "Pending",
//     col4: "5-12-2023 13:05",
//   },
//   {
//     id: 9,
//     col1: "User 9",
//     col2: "Hi World",
//     col3: "Failed",
//     col4: "5-12-2023 12:00",
//   },
//   {
//     id: 10,
//     col1: "User 10",
//     col2: "Hello World",
//     col3: "Delivered",
//     col4: "5-12-2023 11:55",
//   },
//   {
//     id: 11,
//     col1: "User 11",
//     col2: "Bye World",
//     col3: "Pending",
//     col4: "5-12-2023 16:30",
//   },
//   {
//     id: 12,
//     col1: "User 12",
//     col2: "Hi World",
//     col3: "Failed",
//     col4: "5-12-2023 16:15",
//   },
//   {
//     id: 13,
//     col1: "User 13",
//     col2: "Hello World",
//     col3: "Delivered",
//     col4: "5-12-2023 15:00",
//   },
//   {
//     id: 14,
//     col1: "User 14",
//     col2: "Bye World",
//     col3: "Pending",
//     col4: "5-12-2023 14:55",
//   },
//   {
//     id: 15,
//     col1: "User 15",
//     col2: "Hi World",
//     col3: "Failed",
//     col4: "5-12-2023 14:50",
//   },
//   {
//     id: 16,
//     col1: "User 16",
//     col2: "Hello World",
//     col3: "Delivered",
//     col4: "5-12-2023 14:45",
//   },
//   {
//     id: 17,
//     col1: "User 17",
//     col2: "Bye World",
//     col3: "Pending",
//     col4: "5-12-2023 14:40",
//   },
//   {
//     id: 18,
//     col1: "User 18",
//     col2: "Hi World",
//     col3: "Failed",
//     col4: "5-12-2023 14:35",
//   },
//   {
//     id: 19,
//     col1: "User 19",
//     col2: "Hello World",
//     col3: "Delivered",
//     col4: "5-12-2023 14:30",
//   },
//   {
//     id: 20,
//     col1: "User 20",
//     col2: "Bye World",
//     col3: "Pending",
//     col4: "5-12-2023 14:25",
//   },
//   {
//     id: 21,
//     col1: "User 21",
//     col2: "Hi World",
//     col3: "Failed",
//     col4: "5-12-2023 14:20",
//   },
//   {
//     id: 22,
//     col1: "User 22",
//     col2: "Hello World",
//     col3: "Delivered",
//     col4: "5-12-2023 14:15",
//   },
//   {
//     id: 23,
//     col1: "User 23",
//     col2: "Bye World",
//     col3: "Pending",
//     col4: "5-12-2023 14:10",
//   },
//   {
//     id: 24,
//     col1: "User 24",
//     col2: "Hi World",
//     col3: "Failed",
//     col4: "5-12-2023 14:05",
//   },
//   {
//     id: 25,
//     col1: "User 25",
//     col2: "Hello World",
//     col3: "Delivered",
//     col4: "5-12-2023 14:00",
//   },
//   {
//     id: 26,
//     col1: "User 26",
//     col2: "Bye World",
//     col3: "Pending",
//     col4: "5-12-2023 13:55",
//   },
//   {
//     id: 27,
//     col1: "User 27",
//     col2: "Hi World",
//     col3: "Failed",
//     col4: "5-12-2023 13:50",
//   },
//   {
//     id: 28,
//     col1: "User 28",
//     col2: "Hello World",
//     col3: "Delivered",
//     col4: "5-12-2023 13:45",
//   },
//   {
//     id: 29,
//     col1: "User 29",
//     col2: "Bye World",
//     col3: "Pending",
//     col4: "5-12-2023 13:40",
//   },
//   {
//     id: 30,
//     col1: "User 30",
//     col2: "Hi World",
//     col3: "Failed",
//     col4: "5-12-2023 13:35",
//   },
// ];

const rows = [
  {
    id: "abcde",
    col1: "User 1",
    col2: "Hello World",
    col3: "Delivered",
    col4: "5-12-2023 15:42",
  },
  {
    id: "fghij",
    col1: "User 2",
    col2: "Bye World",
    col3: "Delivered",
    col4: "5-12-2023 11:41",
  },
  {
    id: "klmno",
    col1: "User 3",
    col2: "Hi World",
    col3: "Delivered",
    col4: "5-12-2023 15:44",
  },
  {
    id: "pqrst",
    col1: "User 4",
    col2: "Hello World",
    col3: "Pending",
    col4: "5-12-2023 10:30",
  },
  {
    id: "uvwxy",
    col1: "User 5",
    col2: "Bye World",
    col3: "Delivered",
    col4: "5-12-2023 09:15",
  },
  {
    id: "z1234",
    col1: "User 6",
    col2: "Hi World",
    col3: "Failed",
    col4: "5-12-2023 08:20",
  },
  {
    id: "56789",
    col1: "User 7",
    col2: "Hello World",
    col3: "Delivered",
    col4: "5-12-2023 14:10",
  },
];

const columns = [
  { field: "col1", headerName: "To", width: 150 },
  { field: "col2", headerName: "Text", width: 150 },
  { field: "col3", headerName: "Status", width: 100 },
  { field: "col4", headerName: "Sent", width: 150 },
];

export default function SentTable() {
  // const checkedRows = (rowSelectionModel) => {
  //   console.log("Row change");
  //   console.log(rowSelectionModel);
  // };
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteClick = () => {
    console.log("Deleting rows:", selectedRows);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex items-center align-middle justify-center"
        >
          <div className="bg-white">
            <p>
              Are you sure you want to delete {selectedRows.length} messages
            </p>
            <button>No</button>
            <button>Delete</button>
          </div>
        </Modal> */}

        <button
          disabled={selectedRows.length === 0}
          // onClick={handleOpen}
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
