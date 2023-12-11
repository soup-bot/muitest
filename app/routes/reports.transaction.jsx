import { Form, Link, Outlet } from "@remix-run/react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useRef, forwardRef } from "react";
import dayjs from "dayjs";
import { FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "@remix-run/react";

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
  return (
    <div className="mt-10">
      <DataGrid
        density="compact"
        rows={tr_rows}
        columns={tr_columns}
        hideFooter
      />
      <Outlet></Outlet>
    </div>
  );
}

export default TransactionReport;
