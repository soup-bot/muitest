import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MdError } from "react-icons/md";
import { useState, useCallback } from "react";
import { MdDelete } from "react-icons/md";
import Modal from "@mui/material/Modal";
import { useParams } from "@remix-run/react";

function ReportDetails() {
  const { id } = useParams();

  const columns = [
    { field: "col1", headerName: "Username", width: 150 },
    { field: "col2", headerName: "Destination", width: 150 },
    { field: "col3", headerName: "Status", width: 150 },
    { field: "col4", headerName: "Date", width: 150 },
    { field: "col5", headerName: "Segments", width: 150 },
    { field: "col6", headerName: "Total Charge", width: 150 },
  ];

  const demoReports = {
    1: [
      {
        id: 1,
        col1: "John",
        col2: "7381738",
        col3: "Success",
        col4: "01/11/23",
        col5: "1",
        col6: "1",
      },
      {
        id: 2,
        col1: "John",
        col2: "7555551",
        col3: "Success",
        col4: "13/04/23",
        col5: "7",
        col6: "7",
      },
      {
        id: 3,
        col1: "Ahmed",
        col2: "4343253",
        col3: "Success",
        col4: "21/09/22",
        col5: "4",
        col6: "4",
      },
    ],
    2: [
      {
        id: 2,
        col1: "Jack",
        col2: "9666538",
        col3: "Success",
        col4: "27/11/23",
        col5: "5",
        col6: "5",
      },
      {
        id: 3,
        col1: "Alex",
        col2: "8231231",
        col3: "Success",
        col4: "23/12/23",
        col5: "2",
        col6: "2",
      },
    ],
  };

  const reportRows = demoReports[id] || [];

  return (
    <div className="mt-10">
      <h1 className="mb-8 dark:text-slate-200">Report details </h1>

      <DataGrid
        className="dark:bg-slate-800 bg-slate-50"
        density="compact"
        rows={reportRows}
        columns={columns}
        hideFooter
        slots={{ toolbar: GridToolbar }}
        sx={{
          "& .MuiDataGrid-columnHeader": {
            fontWeight: "bold",
          },
        }}
      />
    </div>
  );
}

export default ReportDetails;
