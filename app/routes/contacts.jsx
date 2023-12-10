import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IoIosArrowDown } from "react-icons/io";

export default function Contacts() {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150, editable: true },
    { field: "number", headerName: "Number", width: 150 },
    {
      field: "group",
      headerName: "Group",
      type: "singleSelect",
      valueOptions: ["Market", "Finance", "Development"],
      width: 120,
      editable: true,
    },
  ];

  const rows = [
    { id: 1, name: "John Doe", number: "7777303", group: "Market" },
    { id: 2, name: "Jane Doe", number: "7223053", group: "Finance" },
    // Other rows...
  ];
  return (
    <div className="h-screen w-full flex justify-center xl:pl-20 animate-fade-up animate-once animate-duration-200 animate-ease-in">
      <div className=" h-min min-h-full rounded-lg md:shadow-lg  xl:border-t-4  border-secondary w-full px-10 mt-4 xl:w-2/3">
        <h1 className="font-bold text-2xl my-10">Contacts</h1>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
}
