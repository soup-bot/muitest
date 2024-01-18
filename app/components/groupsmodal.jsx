import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useDarkMode } from "../components/DarkModeContext";
import TablePagination from "@mui/material/TablePagination";
import { IoMdAddCircle } from "react-icons/io";
import { Form } from "@remix-run/react";

const GroupsModal = ({ isOpen, onClose, groups }) => {
  const [paginatedGroups, setPaginatedGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isValidGroup, setIsValidGroup] = useState(true);

  useEffect(() => {
    setPaginatedGroups(
      groups.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    );
  }, [groups, page, rowsPerPage]);

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
      <Box className="border  dark:border-slate-500 bg-white dark:bg-slate-800 absolute flex flex-col pt-6 px-6 shadow-md rounded-lg left-50 z-10 w-4/5 sm:w-1/2 lg:w-1/3 xl:w-1/4 animate-fade-down animate-once animate-duration-[240ms] animate-ease-in">
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
                  <TableRow key={group.id}>
                    <TableCell>{group.groupName}</TableCell>
                    <TableCell align="right">
                      <Form method="delete" action="/deleteGroup">
                        <input type="hidden" name="groupId" value={group.id} />
                        <IconButton
                          type="submit"
                          name="groupId"
                          onClick={() => console.log(group.id)}
                        >
                          <MdDelete />
                        </IconButton>
                      </Form>
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
          <Form method="post" action="/addGroup">
            <div className="w-full flex align-middle justify-center px-2">
              <div className="flex align-middle justify-center w-full ">
                <TextField
                  error={!isValidGroup}
                  label="Name"
                  name="groupname"
                  helperText={
                    (!isValidGroup &&
                      newGroupName !== "" &&
                      "Group name already exists") ||
                    (!isValidGroup &&
                      !newGroupName &&
                      "Please enter a group name") ||
                    " "
                  }
                  value={newGroupName}
                  inputProps={{ maxLength: 30 }}
                  onChange={(e) => {
                    setNewGroupName(e.target.value);
                    setIsValidGroup(true);
                  }}
                  fullWidth
                  required
                  margin="normal"
                />
              </div>

              <div className="justify-self-center self-center mb-3">
                <IconButton
                  color="secondary"
                  aria-label="create new group"
                  type="submit"
                >
                  <IoMdAddCircle size={35} />
                </IconButton>
              </div>
            </div>
          </Form>
        </div>
      </Box>
    </Modal>
  );
};

export default GroupsModal;
