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
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useDarkMode } from "../components/DarkModeContext";
import GroupsModal from "../components/groupsmodal";
import { FaEdit } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

export const meta = () => {
  return [{ title: "Contacts - Dhiraagu Bulk SMS" }];
};

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

export default function Contacts() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isValidContact, setIsValidContact] = useState(true);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [newContact, setNewContact] = React.useState({
    name: "",
    number: "",
    group: "",
  });
  const [rows, setRows] = React.useState(initialRows);
  const [groups, setGroups] = React.useState([
    "Market",
    "Finance",
    "Development",
  ]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [isGroupsModalOpen, setGroupsModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    // Reset new contact form
    setNewContact({ name: "", number: "", group: "" });
    setIsValidContact(true);
  };

  const handleInputChange = (field, value) => {
    setNewContact((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddContact = () => {
    // Validate and add the new contact
    if (newContact.name.trim() && newContact.number.trim()) {
      const id = Date.now(); // Using timestamp as a unique ID
      setRows((oldRows) => [...oldRows, { id, ...newContact, isNew: true }]);
      closeModal();
    } else {
      // Handle validation error
      // alert("Name and number are required.");
      setIsValidContact(false);
    }
  };

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
    <div
      className={`h-screen w-full flex justify-center xl:pl-20 animate-fade-up animate-once animate-duration-200 animate-ease-in ${
        isDarkMode ? "dark " : ""
      }`}
    >
      <div className="h-min min-h-full rounded-lg md:shadow-lg xl:border-t-4 border-secondary w-full px-10 mt-4 xl:w-2/3 bg-white dark:bg-slate-900">
        <h1 className="font-bold text-2xl my-10 dark:text-slate-200">
          Contacts
        </h1>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            className="dark:bg-slate-800 bg-slate-50"
            rows={rows}
            columns={columns}
            editMode="row"
            checkboxSelection
            disableRowSelectionOnClick
            onRowEditStop={handleRowEditStop}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            processRowUpdate={processRowUpdate}
            components={{
              Toolbar: () => (
                <GridToolbarContainer className="flex flex-row sm:flex-row justify-between bg-slate-200 dark:bg-slate-600">
                  <div>
                    <Button startIcon={<IoMdAddCircle />} onClick={openModal}>
                      <p className="hidden sm:block mr-5">Add Contact</p>
                    </Button>
                    <Button
                      startIcon={<MdGroupAdd />}
                      onClick={() => setGroupsModalOpen(true)}
                    >
                      <p className="hidden sm:block">Manage Groups</p>
                    </Button>
                  </div>
                  <GridToolbarExport
                    printOptions={{ disableToolbarButton: true }}
                  >
                    <p className="hidden sm:block">Export</p>
                  </GridToolbarExport>
                </GridToolbarContainer>
              ),
            }}
          ></DataGrid>
        </div>
        <GroupsModal
          isOpen={isGroupsModalOpen}
          onClose={() => setGroupsModalOpen(false)}
          groups={groups}
          setGroups={setGroups}
        />
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          className={`flex items-center align-middle justify-center ${
            isDarkMode ? "dark " : ""
          }`}
        >
          <Box className="border-t-4 border-secondary bg-white dark:bg-slate-800 absolute flex flex-col p-6 shadow-md rounded-lg left-50 z-10 w-4/5 sm:w-1/2 lg:w-1/3 xl:w-1/4 animate-fade-down animate-once animate-duration-[240ms] animate-ease-in">
            <h2 className="dark:text-slate-200 text-md font-bold justify-self-center self-center">
              Add Contact
            </h2>
            <TextField
              error={!isValidContact && !newContact.name}
              label="Name"
              variant="standard"
              inputProps={{ maxLength: 30 }}
              value={newContact.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              error={!isValidContact && !newContact.number}
              label="Number"
              variant="standard"
              required
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 7);
              }}
              type="number"
              value={newContact.number}
              onChange={(e) => handleInputChange("number", e.target.value)}
              fullWidth
              margin="normal"
            />
            <div>
              <FormControl variant="standard" fullWidth margin="normal">
                <InputLabel id="group-label">Group</InputLabel>
                <Select
                  labelId="group-label"
                  id="group"
                  value={newContact.group}
                  onChange={(e) => handleInputChange("group", e.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  {groups.map((group) => (
                    <MenuItem key={group} value={group}>
                      {group}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="mt-12 flex justify-end ">
              <div
                className="text-white bg-secondary hover:bg-hoversec w-full md:w-min font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-1 align-middle flex justify-center cursor-pointer"
                onClick={handleAddContact}
              >
                <div> Add</div>
                <div className="flex align-middle justify-center ml-2">
                  <IoMdAdd
                    className="self-middle justify-self-center "
                    size={20}
                  />
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
