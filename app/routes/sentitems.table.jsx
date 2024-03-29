// components/SentTable.js

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { MdError, MdDelete } from "react-icons/md";
import Modal from "@mui/material/Modal";
import { useDarkMode } from "../components/DarkModeContext";
import dayjs from "dayjs";
import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "@remix-run/react";
import {
  checkUserLoggedIn,
  getAccessTokenFromCookie,
} from "../data/authentication.server";
import { useLoaderData, useNavigate } from "react-router";
import dotenv from "dotenv";
import { useFetcher } from "@remix-run/react";
import { cleanFilterItem } from "@mui/x-data-grid/hooks/features/filter/gridFilterUtils";

export const loader = async ({ request }) => {
  dotenv.config();
  const getSentItemsEP = process.env.REACT_APP_GET_SENT_ITEMS_EP;
  const accessToken = getAccessTokenFromCookie(request);
  const { isLoggedIn, userId } = await checkUserLoggedIn(request);
  const url = new URL(request.url);
  const page = +url.searchParams.get("page");
  const pageSize = +url.searchParams.get("pageSize");
  const startDate = url.searchParams.get("startDate");
  const endDate = url.searchParams.get("endDate");

  const validPage = isNaN(page) ? 1 : page;
  const validPageSize = isNaN(pageSize) ? 25 : pageSize;
  const sentitemsURL = `http://localhost:5294/api/BulkSms?userId=${userId}&page=${validPage}&pageSize=${validPageSize}&startDate=${startDate}&endDate=${endDate}`;

  try {
    const response = await fetch(sentitemsURL, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData || !Array.isArray(responseData.data)) {
      throw new Error("Invalid response data");
    }
    const totalRowCount = responseData.totalRowCount;
    const rowz = responseData.data.map((item) => ({
      id: item.id,
      col1: item.destination,
      col2: item.message,
      col3: item.status,
      col4: new Date(item.sentTimeStamp).toLocaleString(),
    }));

    return {
      rowz,
      totalRowCount,
      loading: false,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};

export default function SentTable() {
  const { startDate, endDate, buttonClick } = useOutletContext();
  const navigate = useNavigate();
  const { rowz, totalRowCount, loading } = useLoaderData();
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const [rowCountState, setRowCountState] = useState(totalRowCount || 0);

  useEffect(() => {
    setIsLoading(false);
  }, [rowz]);

  useEffect(() => {
    navigate(
      `/sentitems/table?page=${paginationModel.page + 1}&pageSize=${
        paginationModel.pageSize
      }&startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`
    );
    setIsLoading(true);
  }, [paginationModel.page, paginationModel.pageSize, buttonClick, navigate]);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      totalRowCount !== undefined ? totalRowCount : prevRowCountState
    );
  }, [totalRowCount, setRowCountState]);

  const handlePaginationModelChange = (model, details) => {
    setIsLoading(true);
    setPaginationModel(model);
  };

  const handleDeleteClick = () => {
    console.log("Deleting rows:", selectedRows);
    handleClose();
  };

  const columns = [
    {
      field: "col1",
      headerName: "To",
      width: 150,
      filterable: false,
      sortable: false,
    },
    {
      field: "col2",
      headerName: "Text",
      width: 300,
      filterable: false,
      sortable: false,
    },
    {
      field: "col3",
      headerName: "Status",
      width: 100,
      filterable: false,
      sortable: false,
    },
    {
      field: "col4",
      headerName: "Sent",
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
      width: 250,
      filterable: false,
      sortable: false,
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-4">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className={`flex items-center align-middle justify-center `}
        >
          <div className="bg-white dark:bg-slate-800 p-3 px-6 flex flex-col justify-center align-middle items-center outline-none rounded-md border dark:border-slate-600 shadow-md animate-fade animate-duration-[350ms]">
            <p className="text-black mt-4 mb-12 dark:text-slate-200">
              Are you sure you want to delete{" "}
              <span className="font-black ">{selectedRows.length}</span> message
              {selectedRows.length > 1 && <span>s</span>}?
            </p>
            <div className="flex gap-1 justify-end w-full">
              <Button
                variant="contained"
                size="medium"
                color="info"
                onClick={handleClose}
              >
                <p className="text-white">No</p>
              </Button>
              <Button
                variant="contained"
                startIcon={<MdDelete />}
                size="medium"
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <DataGrid
        className="dark:bg-slate-800 bg-slate-50"
        density="compact"
        rows={rowz}
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
        autoHeight
        keepNonExistentRowsSelected
        columns={columns}
        loading={isLoading}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        paginationMode="server"
        rowCount={rowCountState}
        initialState={{
          sorting: {
            sortModel: [{ field: "col4", sort: "desc" }],
          },
          pagination: { paginationModel: { pageSize: 25 } },
        }}
        pageSizeOptions={[25, 50, 100]}
        onRowSelectionModelChange={(itm) => setSelectedRows(itm)}
        // checkboxSelection
        // slots={{
        //   toolbar: () => (
        //     <GridToolbarContainer className="flex flex-row sm:flex-row justify-end bg-slate-200 dark:bg-slate-600">
        //       <div className="">
        //         <Button
        //           color="info"
        //           disabled={selectedRows.length <= 0}
        //           startIcon={<MdDelete size={25} />}
        //           onClick={handleOpen}
        //         >
        //           <p className="hidden sm:block">DELETE</p>
        //         </Button>
        //       </div>
        //     </GridToolbarContainer>
        //   ),
        // }}
      />
    </>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <main className="flex flex-col  align-middle items-center justify-center font-medium text-xl m-10">
      <div className="bg-white p-10 rounded-2xl shadow-md dark:bg-slate-900 dark:text-white">
        <h4 className="text-red-800 flex flex-col md:flex-row align-middle justify-center items-center gap-3">
          <MdError size={25} />{" "}
          <p>There was an error while fetching your data</p>
        </h4>
      </div>
    </main>
  );
}
