import { Form, Link, Outlet } from "@remix-run/react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useRef, forwardRef } from "react";
import dayjs from "dayjs";
import { FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "@remix-run/react";

const usr_rows = [
  {
    id: 1,
    col1: "User 1",
    col2: "John",
    col3: "Doe",
    col4: "7837777",
    col5: "johndoe@gmail.com",
    col6: "30",
    col7: "30",
  },
];

const usr_columns = [
  { field: "col1", headerName: "Username", width: 100 },
  { field: "col2", headerName: "First Name", width: 150 },
  { field: "col3", headerName: "Last Name", width: 150 },
  { field: "col4", headerName: "Mobile Number", width: 150 },
  { field: "col5", headerName: "Email Address", width: 250 },
  { field: "col6", headerName: "Messages", width: 100 },
  { field: "col7", headerName: "Charges", width: 100 },
];

function UsageReport() {
  return (
    <div className="mt-10">
      <DataGrid
        className="dark:bg-slate-700 bg-slate-50"
        density="compact"
        rows={usr_rows}
        columns={usr_columns}
        hideFooter
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
}

export default UsageReport;
