import { Form, Link, Outlet } from "@remix-run/react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useRef, forwardRef } from "react";
import dayjs from "dayjs";
import { FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { DataGrid, GridToolbarExport } from "@mui/x-data-grid";
import { useNavigate } from "@remix-run/react";
import { MdDelete } from "react-icons/md";
import Modal from "@mui/material/Modal";

const tr_columns = [
  { field: "col1", headerName: "Report Name", width: 150 },
  { field: "col2", headerName: "Report Date", width: 150 },
  { field: "col3", headerName: "Status", width: 150 },
  { field: "col4", headerName: "Date Range", width: 150 },
  { field: "col5", headerName: "File Size", width: 250 },
  {
    field: "col6",
    headerName: "Action",
    width: 150,
    renderCell: (params) => (
      <Link
        to={`/reports/transaction/${params.row.id}`}
        className="text-blue-500"
      >
        View
      </Link>
    ),
  },
];
const tr_rows = [
  {
    id: 1,
    col1: "User Usage Report",
    col2: "12/11/23",
    col3: "Success",
    col4: "01/11/23-01/12/23",
    col5: "1kb",
  },
  {
    id: 2,
    col1: "User Usage Report",
    col2: "10/11/23",
    col3: "Success",
    col4: "24/11/23-24/12/23",
    col5: "5kb",
  },
];

function TransactionReport() {
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
    <div className="mt-10">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center align-middle justify-center"
      >
        <div className="bg-white p-3 px-6 flex flex-col justify-center align-middle items-center outline-none rounded-md border shadow-md animate-jump-in animate-once animate-duration-200 animate-ease-in">
          <p className="text-black mt-4 mb-12">
            Are you sure you want to delete{" "}
            <span className="font-black">{selectedRows.length}</span> report
            {selectedRows.length > 1 && <span>s</span>}?
          </p>
          <div className="flex gap-1 w-full justify-end">
            <button
              onClick={handleClose}
              type="button"
              className="text-white bg-slate-400 hover:bg-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            >
              No
            </button>
            <button
              onClick={handleDeleteClick}
              type="button"
              className="text-white bg-primary hover:bg-hoverprim  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <div className="flex flex-col">
        <button
          disabled={selectedRows.length === 0}
          onClick={handleOpen}
          className="bg-red-500 hover:bg-red-800 disabled:bg-gray-300 active:scale-105 transition text-white p-1 rounded-md self-end mb-4 dark:disabled:bg-slate-600"
        >
          <MdDelete size={20} />
        </button>
        <DataGrid
          className="dark:bg-slate-800 bg-slate-50"
          density="compact"
          rows={tr_rows}
          columns={tr_columns}
          onRowSelectionModelChange={(itm) => setSelectedRows(itm)}
          checkboxSelection
        />
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-0.5 mt-20"></div>
      <Outlet></Outlet>
    </div>
  );
}

export default TransactionReport;
