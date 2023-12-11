import * as React from "react";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridRowModes,
  GridToolbarExport,
  GridToolbarContainer,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { IoIosArrowDown } from "react-icons/io";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { IoMdAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

function EditGroupsToolbar({ setGroups, groups }) {
  const handleClick = () => {
    const id = Date.now();
    setGroups((oldGroups) => [
      ...oldGroups,
      { id, name: "", members: 0, isNew: true },
    ]);
  };

  return (
    <GridToolbarContainer className="flex justify-between">
      <Button startIcon={<Button>Add Group</Button>} onClick={handleClick}>
        Add Group
      </Button>
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
}

const initialRows = [
  {
    id: 1,
    name: "John Doe",
    number: "7777303",
    group: "Market",
  },
  {
    id: 2,
    name: "Jane Doe",
    number: "7223053",
    group: "Finance",
  },
  // Other rows...
];

function EditToolbar({ setRows, setRowModesModel }) {
  const handleClick = () => {
    const id = Date.now(); // Using timestamp as a unique ID
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", number: "", group: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <div>
      <GridToolbarContainer className="flex justify-between">
        <Button startIcon={<IoMdAddCircle />} onClick={handleClick}>
          Add Contact
        </Button>
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      </GridToolbarContainer>
    </div>
  );
}

export default function Contacts() {
  const [contactsRowModesModel, setContactsRowModesModel] = React.useState({});
  const [groupsRowModesModel, setGroupsRowModesModel] = React.useState({});
  const [rows, setRows] = React.useState(initialRows);
  const [groups, setGroups] = React.useState([
    "Market",
    "Finance",
    "Development",
  ]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleCellEditCommit = React.useCallback(
    ({ id, field, props }) => {
      const updatedRows = rows.map((row) =>
        row.id === id ? { ...row, [field]: props.value } : row
      );
      setRows(updatedRows);
    },
    [rows]
  );

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150, editable: true },
    { field: "number", headerName: "Number", width: 150, editable: true },
    {
      field: "group",
      headerName: "Group",
      type: "singleSelect",
      valueOptions: groups,
      width: 120,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<FaSave size={20} />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<MdCancel size={20} />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<MdEdit size={20} />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<MdDelete size={20} />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div className="h-screen w-full flex justify-center xl:pl-20 animate-fade-up animate-once animate-duration-200 animate-ease-in">
      <div className="h-min min-h-full rounded-lg md:shadow-lg xl:border-t-4 border-secondary w-full px-10 mt-4 xl:w-2/3">
        <h1 className="font-bold text-2xl my-10">Contacts</h1>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            checkboxSelection
            disableRowSelectionOnClick
            onRowEditStop={handleRowEditStop}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          ></DataGrid>
        </div>
      </div>
    </div>
  );
}
