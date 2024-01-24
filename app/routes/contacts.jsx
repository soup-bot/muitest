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
import GroupsModal from "../components/modals/GroupsModal";
import { FaEdit } from "react-icons/fa";
import { getSession, commitSession } from "../sessions";
import { MdGroupAdd } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { checkUserLoggedIn } from "../data/authentication.server";
import { json, redirect } from "@remix-run/node";
import { getAccessTokenFromCookie } from "../data/authentication.server";
import { useEffect } from "react";

import dotenv from "dotenv";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";

export const meta = () => {
  return [{ title: "Contacts - Dhiraagu Bulk SMS" }];
};
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
});
export const loader = async ({ request }) => {
  dotenv.config();
  const url = new URL(request.url);
  const page = +url.searchParams.get("page");
  const pageSize = +url.searchParams.get("pageSize");
  const searchQuery = url.searchParams.get("filterName") || "";
  const validPage = isNaN(page) ? 1 : page;
  const validPageSize = isNaN(pageSize) ? 25 : pageSize;
  const { isLoggedIn, userId, serviceStatus } = await checkUserLoggedIn(
    request
  );
  const accessToken = getAccessTokenFromCookie(request);
  const getGroupsEP = process.env.REACT_APP_GET_GROUPS_EP;
  const getContactsEP = process.env.REACT_APP_GET_CONTACTS_EP;
  const contactsUrl = `${getContactsEP}?page=${validPage}&pageSize=${validPageSize}&filterName=${searchQuery}`;
  console.log(contactsUrl);
  if (!isLoggedIn) {
    return redirect("/auth");
  }

  if (!(serviceStatus === "active")) {
    // User is not logged in, redirect to /auth
    return redirect("/dashboard");
  }

  try {
    // Fetch contacts
    const contactsResponse = await fetch(
      `${getContactsEP}?page=${validPage}&pageSize=${validPageSize}&filterName=${searchQuery}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Fetch groups
    const groupsResponse = await fetch(getGroupsEP, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (contactsResponse.ok && groupsResponse.ok) {
      const { contacts, totalCount } = await contactsResponse.json();
      const groups = await groupsResponse.json();
      return {
        contacts,
        groups,
        totalRowCount: totalCount,
        loading: false,
      };
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    // Assume user is not logged in on error, redirect to /auth
    return null;
  }

  // User is logged in, you can use userId if needed
  return { userId };
};

export default function Contacts() {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const { contacts, groups } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  let actionData = useActionData();
  const [searchInput, setSearchInput] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { totalRowCount } = useLoaderData();
  const [rows, setRows] = React.useState(
    Array.isArray(contacts) ? contacts : []
  );
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [rowCountState, setRowCountState] = useState(totalRowCount || 0);

  const [isValidContact, setIsValidContact] = useState(true);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isGroupModalOpen, setGroupModalOpen] = React.useState(false);
  const [buttonClick, setButtonClick] = useState(false);
  const [newGroup, setNewGroup] = React.useState("");
  const [newContact, setNewContact] = React.useState({
    name: "",
    number: "",
    group: "",
  });
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handlePaginationModelChange = (model, details) => {
    setIsLoading(true);
    setPaginationModel(model);
  };

  // const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [isGroupsModalOpen, setGroupsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const search = () => {
    setButtonClick((prevButtonClick) => !prevButtonClick);
  };

  useEffect(
    function resetFormOnSuccess() {
      if (navigation.state === "idle") {
        console.log("useeffect");
        setNewContact({ name: "", number: "", group: "" });
      }
    },
    [navigation.state]
  );

  useEffect(() => {
    setIsLoading(false);
    setGroupModalOpen(false);
    setOpenDelete(false);
    setGroupsModalOpen(false);
  }, [rows]);

  useEffect(() => {
    if (searchInput === "") {
      navigate(`/contacts?page=1&pageSize=25&filterName=`);
    }
  }, [searchInput]);

  useEffect(() => {
    navigate(
      `/contacts?page=${paginationModel.page + 1}&pageSize=${
        paginationModel.pageSize
      }&filterName=${searchInput}`
    );
    setIsLoading(true);
  }, [paginationModel.page, paginationModel.pageSize, buttonClick, navigate]);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      totalRowCount !== undefined ? totalRowCount : prevRowCountState
    );
  }, [totalRowCount, setRowCountState]);

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
    { field: "name", headerName: "Name", width: 200 },
    { field: "number", headerName: "Number", width: 200 },
    {
      field: "group",
      headerName: "Group",
      width: 200,
      valueGetter: (params) => {
        const groupName = params.row.group ? params.row.group.groupName : "";
        return groupName;
      },
    },
  ];

  return (
    <div
      className={`h-screen w-full flex justify-center xl:pl-20 animate-fade-up animate-once animate-duration-200 animate-ease-in `}
    >
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={`flex items-center align-middle justify-center`}
      >
        <div className="bg-white dark:bg-slate-800  p-3 px-6 flex flex-col justify-center align-middle items-center outline-none rounded-md border dark:border-slate-600 shadow-md animate-fade animate-duration-[350ms]">
          <p className="text-black mt-4 mb-12 dark:text-slate-200">
            Are you sure you want to delete{" "}
            <span className="font-black ">{selectedRows.length}</span> contact
            {selectedRows.length > 1 && <span>s</span>}?
          </p>
          <div className="flex gap-1 justify-end w-full">
            <Form method="delete" action="/deleteContacts">
              <div className="flex">
                <div className="mr-2">
                  <Button
                    type="button"
                    variant="contained"
                    size="medium"
                    color="info"
                    onClick={handleCloseDelete}
                  >
                    <p className="text-white">No</p>
                  </Button>
                </div>
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<MdDelete />}
                    size="medium"
                    name="contactIDs"
                    value={selectedRows}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Modal>

      <div className="h-min min-h-full rounded-lg md:shadow-lg xl:border dark:border-slate-600 w-full px-10 mt-4 xl:w-2/3 bg-white dark:bg-slate-900">
        <h1 className="font-medium text-2xl my-10 text-slate-800 dark:text-slate-200">
          Contacts
        </h1>
        <div className="flex mb-10 mt-5 w-full">
          <TextField
            label="Search by Name"
            variant="outlined"
            size="small"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="mr-2 w-full md:w-2/5"
          />
          <div className="mx-2">
            <Button
              variant="contained"
              color="primary"
              className="h-full"
              size="small"
              onClick={search}
            >
              Search
            </Button>
          </div>
        </div>
        {/* <p className="dark:text-white">{selectedRows}</p> */}
        <div className="h-full pb-10">
          <DataGrid
            autoHeight
            className="dark:bg-slate-800 bg-slate-50"
            rows={rows}
            columns={columns}
            keepNonExistentRowsSelected
            density="compact"
            loading={isLoading}
            checkboxSelection
            sx={{
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
                width: "0.1em",
              },
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
                background: "#cecece3d",
              },
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
                backgroundColor: "#979797af",
              },
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover": {
                background: "#979797af",
              },
            }}
            disableRowSelectionOnClick
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            paginationMode="server"
            rowCount={rowCountState}
            rowModesModel={rowModesModel}
            pageSizeOptions={[25, 50, 100]}
            initialState={{
              pagination: { paginationModel: { pageSize: 25 } },
            }}
            onRowSelectionModelChange={(itm) => setSelectedRows(itm)}
            slots={{
              toolbar: () => (
                <GridToolbarContainer className="flex flex-row  justify-between bg-slate-100 dark:bg-slate-600 w-full">
                  <div className="w-full flex justify-around sm:justify-start ">
                    <Button
                      startIcon={<IoMdAddCircle />}
                      onClick={openModal}
                      color="info"
                    >
                      <p className="hidden md:block mr-5">Add Contact</p>
                    </Button>
                    <Button
                      color="info"
                      startIcon={<MdGroupAdd />}
                      onClick={() => setGroupsModalOpen(true)}
                    >
                      <p className="hidden md:block mr-5">Manage Groups</p>
                    </Button>

                    <Button
                      color="info"
                      disabled={selectedRows.length <= 0}
                      startIcon={<FaUserEdit />}
                      onClick={() => setGroupModalOpen(true)}
                    >
                      <p className="hidden md:block">Change Group</p>
                    </Button>
                    <Button
                      color="info"
                      disabled={selectedRows.length <= 0}
                      startIcon={<MdDelete size={25} />}
                      onClick={() => setOpenDelete(true)}
                    >
                      <p className="hidden md:block">DELETE</p>
                    </Button>
                  </div>
                </GridToolbarContainer>
              ),
            }}
          ></DataGrid>
        </div>
        <GroupsModal
          isOpen={isGroupsModalOpen}
          onClose={() => setGroupsModalOpen(false)}
          groups={groups}
        />
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          className={`flex items-center align-middle justify-center`}
        >
          <Box className="border  dark:border-slate-500 bg-white dark:bg-slate-800 absolute flex flex-col p-6 shadow-md rounded-lg left-50 z-10 w-4/5 sm:w-1/2 lg:w-1/3 xl:w-1/4 animate-fade-down animate-once animate-duration-[240ms] animate-ease-in">
            <h2 className="dark:text-slate-200 text-slate-800 text-md font-bold justify-self-center self-center">
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
                    }}
                  >
                    <MenuItem value="">None</MenuItem>
                    {groups.map((group) => (
                      <MenuItem key={group.id} value={group.groupName}>
                        {group.groupName}
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
          className={`flex items-center align-middle justify-center`}
        >
          <Box className=" bg-white border  dark:border-slate-500 dark:bg-slate-800 absolute flex flex-col p-6 shadow-md rounded-lg left-50 z-10 w-4/5 sm:w-1/2 lg:w-1/3 xl:w-1/4 animate-fade-down animate-once animate-duration-[240ms] animate-ease-in">
            <Form method="post" action="/changeGroups">
              <h2 className="dark:text-slate-200 text-slate-800 text-md font-bold justify-self-center self-center">
                Change groups
              </h2>
              <p className="dark:text-slate-200 text-slate-800 mt-10 text-sm">
                Change the group of {selectedRows.length} contacts:
              </p>
              <div className="mt-3">
                <FormControl variant="outlined" fullWidth margin="normal">
                  <InputLabel id="group-label">Group</InputLabel>
                  <Select
                    labelId="group-label"
                    name="group"
                    id="group"
                    onChange={(e) => {
                      handleInputChange("group", e.target.value);
                    }}
                  >
                    <MenuItem value="">None</MenuItem>
                    {groups.map((group) => (
                      <MenuItem key={group.id} value={group.id}>
                        {group.groupName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="mt-12 flex justify-end ">
                <div className="flex align-middle justify-center ml-2 w-full md:w-min">
                  <Button
                    className="w-full"
                    type="submit"
                    variant="contained"
                    name="groupIds"
                    value={selectedRows.join(",")}
                    color="secondary"
                    endIcon={<FaSave color="white" />}
                  >
                    <p className="text-white">Save</p>
                  </Button>
                </div>
              </div>
            </Form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
