import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useDarkMode } from "../components/DarkModeContext";
import TablePagination from "@mui/material/TablePagination";
import { IoMdAddCircle } from "react-icons/io";

const GroupsModal = ({ isOpen, onClose, groups, setGroups }) => {
  const [paginatedGroups, setPaginatedGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isValidGroup, setIsValidGroup] = useState(true);

  const handleCreateGroup = () => {
    const trimmedName = newGroupName.trim();

    if (trimmedName !== "") {
      // Check if the group name already exists
      if (groups.includes(trimmedName)) {
        setIsValidGroup(false);
      } else {
        setGroups([...groups, trimmedName]);
        setIsValidGroup(true);
        setNewGroupName("");
      }
    } else {
      setIsValidGroup(false);
    }
  };

  useEffect(() => {
    setPaginatedGroups(
      groups.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    );
  }, [groups, page, rowsPerPage]);

  const handleDeleteGroup = (groupName) => {
    setGroups(groups.filter((group) => group !== groupName));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClose = () => {
    setIsValidGroup(true);
    // Add any other logic you want to execute on modal close
    onClose();
    setNewGroupName("");
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className={`flex items-center align-middle justify-center ${
        isDarkMode ? "dark " : ""
      }`}
    >
      <Box className="border-t-4 border-secondary bg-white dark:bg-slate-800 absolute flex flex-col p-6 shadow-md rounded-lg left-50 z-10 w-4/5 sm:w-1/2 lg:w-1/3 xl:w-1/4 animate-fade-down animate-once animate-duration-[240ms] animate-ease-in">
        <div className="">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <p className="font-bold">Group Name</p>
                  </TableCell>
                  <TableCell align="right">
                    <p className="font-bold">Actions</p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedGroups.map((group) => (
                  <TableRow key={group}>
                    <TableCell>{group}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleDeleteGroup(group)}>
                        <MdDelete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={groups.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <div className="w-full flex align-middle justify-center px-2">
            {/* <input
              maxLength={30}
              type="text"
              value={newGroupName}
              onKeyDown={(e) => (e.keyCode === 13 ? handleCreateGroup() : null)}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="bg-gray-50 border mr-3 border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Name"
            /> */}
            <div className="flex align-middle justify-center w-full ">
              <TextField
                error={!isValidGroup}
                label="Name"
                helperText={!isValidGroup ? "Group name already exists" : " "}
                value={newGroupName}
                inputProps={{ maxLength: 30 }}
                onKeyDown={(e) =>
                  e.keyCode === 13 ? handleCreateGroup() : null
                }
                onChange={(e) => {
                  setNewGroupName(e.target.value);
                  setIsValidGroup(true);
                }}
                fullWidth
                required
                margin="normal"
              />
            </div>
            <div className="flex align-middle justify-center mb-3 0">
              <button
                onClick={handleCreateGroup}
                className="hover:scale-12 text-secondary hover:text-hoversec px-2 active:scale-110 transition"
              >
                <IoMdAddCircle size={40} />
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default GroupsModal;
