import { DataGrid } from "@mui/x-data-grid";
import { MdError } from "react-icons/md";
import { useState, useCallback } from "react";
import { MdDelete } from "react-icons/md";
import Modal from "@mui/material/Modal";

function ReportDetails() {
  const columns = [
    { field: "col1", headerName: "Username", width: 150 },
    { field: "col2", headerName: "Destination", width: 150 },
    { field: "col3", headerName: "Status", width: 150 },
    { field: "col4", headerName: "Date", width: 150 },
    { field: "col5", headerName: "Segments", width: 150 },
    { field: "col6", headerName: "Total Charge", width: 150 },
  ];
  const rows = [
    {
      id: 1,
      col1: "john",
      col2: "7381738",
      col3: "Success",
      col4: "01/11/23",
      col5: "1",
      col6: "1",
    },
  ];

  return (
    <div className="mt-20">
      <h1 className="mb-8">Report details </h1>
      <DataGrid density="compact" rows={rows} columns={columns} hideFooter />
    </div>
  );
}

export default ReportDetails;
