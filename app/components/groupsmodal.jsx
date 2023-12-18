// GroupsModal.jsx
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useDarkMode } from "../components/DarkModeContext";

const GroupsModal = ({ isOpen, onClose, groups, setGroups }) => {
  const [newGroupName, setNewGroupName] = useState("");
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleCreateGroup = () => {
    // Perform validation and add the new group
    if (newGroupName.trim() !== "") {
      setGroups([...groups, newGroupName.trim()]);
      setNewGroupName("");
    }
  };

  const handleDeleteGroup = (groupName) => {
    // Filter out the selected group
    setGroups(groups.filter((group) => group !== groupName));
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className={`flex items-center align-middle justify-center ${
        isDarkMode ? "dark " : ""
      }`}
    >
      <Box className=" border-t-4 border-secondary bg-white dark:bg-slate-800 absolute flex flex-col p-6 shadow-md rounded-lg left-50 z-10 w-100 sm:w-1/2 lg:w-1/3 xl:w-1/4 animate-fade-down animate-once animate-duration-[240ms] animate-ease-in ">
        <div className="">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <p className="font-bold">Group Name</p>
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    <p className="font-bold">Actions</p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map((group) => (
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

          <div className="w-full flex align-middle justify-center mt-3 px-4">
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              class="bg-gray-50 border mr-3 border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Name"
            />

            <IconButton onClick={handleCreateGroup}>
              <IoMdAdd />
            </IconButton>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default GroupsModal;
