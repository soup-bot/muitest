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
import { FaUserEdit } from "react-icons/fa";
import { checkUserLoggedIn } from "../data/authentication.server";
import { redirect } from "@remix-run/node";
import { getAccessTokenFromCookie } from "../data/authentication.server";
import dotenv from "dotenv";
import { Form, useActionData, useLoaderData } from "@remix-run/react";

export const meta = () => {
  return [{ title: "Contacts - Dhiraagu Bulk SMS" }];
};

export const loader = async ({ request }) => {
  dotenv.config();
  const { isLoggedIn, userId } = await checkUserLoggedIn(request);
  const accessToken = getAccessTokenFromCookie(request);
  const getContactsEP = process.env.REACT_APP_GET_CONTACTS_EP;
  const contactsUrl = `${getContactsEP}${userId}`;
  if (!isLoggedIn) {
    // User is not logged in, redirect to /auth
    return redirect("/auth");
  }
  try {
    const response = await fetch(contactsUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const contacts = await response.json();
      console.log(contacts);
      return { contacts, userId };
    }
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    // Assume user is not logged in on error, redirect to /auth
    return null;
  }

  // User is logged in, you can use userId if needed
  return { userId };
};

export default function Contacts() {
  const data = useActionData();
  console.log(data);
  const { contacts } = useLoaderData();
  const [rows, setRows] = React.useState(contacts);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isValidContact, setIsValidContact] = useState(true);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isGroupModalOpen, setGroupModalOpen] = React.useState(false);
  const [newGroup, setNewGroup] = React.useState("");
  const [newContact, setNewContact] = React.useState({
    name: "",
    number: "",
    group: "",
  });
  // const [rows, setRows] = React.useState(initialRows);
  const [groups, setGroups] = React.useState([
    "Marketing",
    "Finance",
    "Sales",
    "IT",
  ]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [isGroupsModalOpen, setGroupsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const openModal = () => {
    setModalOpen(true);
  };

  React.useEffect(() => {
    setModalOpen(false);
    setRows(contacts);
  }, [contacts]);

  const closeModal = () => {
    setModalOpen(false);
    setGroupModalOpen(false);
    setNewGroup("");
    // Reset new contact form
    setNewContact({ name: "", number: "", group: "" });
    setIsValidContact(true);
  };

  const handleInputChange = (field, value) => {
    setNewContact((prev) => ({ ...prev, [field]: value }));
  };

  //-----------------------------------------------------

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
      valueGetter: (params) =>
        params.row.group ? params.row.group.groupName : "",
    },
  ];

  return (
    <div
      className={`h-screen w-full flex justify-center xl:pl-20 animate-fade-up animate-once animate-duration-200 animate-ease-in ${
        isDarkMode ? "dark " : ""
      }`}
    >
      <div className="h-min min-h-full rounded-lg md:shadow-lg xl:border-t-4 border-secondary w-full px-10 mt-4 xl:w-2/3 bg-white dark:bg-slate-900">
        <h1 className="font-medium text-2xl my-10 dark:text-slate-200">
          Contacts
        </h1>

        {/* <p className="dark:text-white">{selectedRows}</p> */}
        <div className="h-full">
          <DataGrid
            className="dark:bg-slate-800 bg-slate-50"
            rows={rows}
            columns={columns}
            editMode="row"
            checkboxSelection
            disableRowSelectionOnClick
            rowModesModel={rowModesModel}
            onRowSelectionModelChange={(itm) => setSelectedRows(itm)}
            slots={{
              toolbar: () => (
                <GridToolbarContainer className="flex flex-row sm:flex-row justify-between bg-slate-200 dark:bg-slate-600">
                  <div>
                    <Button
                      startIcon={<IoMdAddCircle />}
                      onClick={openModal}
                      color="info"
                    >
                      <p className="hidden sm:block mr-5">Add Contact</p>
                    </Button>
                    <Button
                      color="info"
                      startIcon={<MdGroupAdd />}
                      onClick={() => setGroupsModalOpen(true)}
                    >
                      <p className="hidden sm:block mr-5">Manage Groups</p>
                    </Button>

                    <Button
                      color="info"
                      disabled={selectedRows.length <= 0}
                      startIcon={<FaUserEdit />}
                      onClick={() => setGroupModalOpen(true)}
                    >
                      <p className="hidden sm:block">Change Group</p>
                    </Button>
                  </div>
                  <GridToolbarExport color="info"></GridToolbarExport>
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
          <Box className="border  dark:border-slate-500 bg-white dark:bg-slate-800 absolute flex flex-col p-6 shadow-md rounded-lg left-50 z-10 w-4/5 sm:w-1/2 lg:w-1/3 xl:w-1/4 animate-fade-down animate-once animate-duration-[240ms] animate-ease-in">
            <h2 className="dark:text-slate-200 text-md font-bold justify-self-center self-center">
              Add Contact
            </h2>
            <Form method="post" action="/addContact">
              <TextField
                error={!isValidContact && !newContact.name}
                name="name"
                label="Name"
                className={`${
                  !isValidContact && !newContact.name
                    ? "animate-shake animate-duration-[120ms] "
                    : ""
                }`}
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
                name="number"
                label="Number"
                className={`${
                  !isValidContact && !newContact.number
                    ? "animate-shake animate-duration-[120ms] "
                    : ""
                }`}
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
                    name="group"
                    id="group"
                    value={newContact.group}
                    onChange={(e) => {
                      handleInputChange("group", e.target.value);
                      // handleGroupChange(e.target.value); // change groups of selected (checked) rows simultaneously
                    }}
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
                <div className="flex justify-end w-full md:w-min">
                  <Button
                    className="w-full"
                    type="submit"
                    color="secondary"
                    variant="contained"
                    endIcon={<IoMdAdd color="white" />}
                    // onClick={handleAddContact}
                  >
                    <p className="text-white font-medium">Add</p>
                  </Button>
                </div>
              </div>
            </Form>
          </Box>
        </Modal>
        <Modal
          open={isGroupModalOpen}
          onClose={closeModal}
          className={`flex items-center align-middle justify-center ${
            isDarkMode ? "dark " : ""
          }`}
        >
          <Box className=" bg-white border  dark:border-slate-500 dark:bg-slate-800 absolute flex flex-col p-6 shadow-md rounded-lg left-50 z-10 w-4/5 sm:w-1/2 lg:w-1/3 xl:w-1/4 animate-fade-down animate-once animate-duration-[240ms] animate-ease-in">
            <h2 className="dark:text-slate-200 text-md font-bold justify-self-center self-center">
              Change groups
            </h2>
            <p className="dark:text-slate-200 mt-10 text-sm">
              Change the group of {selectedRows.length} contacts:
            </p>
            <div className="mt-3">
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel id="group-label">Group</InputLabel>
                <Select
                  labelId="group-label"
                  id="group"
                  value={newGroup}
                  onChange={(e) => setNewGroup(e.target.value)}
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
              <div className="flex align-middle justify-center ml-2 w-full md:w-min">
                <Button
                  className="w-full"
                  variant="contained"
                  color="secondary"
                  endIcon={<FaSave color="white" />}
                  onClick={() => handleGroupChange(newGroup)}
                >
                  <p className="text-white">Save</p>
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
