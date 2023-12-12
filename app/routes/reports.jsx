import { Form, Link, Outlet } from "@remix-run/react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useRef, forwardRef } from "react";
import dayjs from "dayjs";
import { FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "@remix-run/react";

const usr_rows = [
  {
    id: 1,
    col1: "User 1",
    col2: "John",
    col3: "Doe",
    col4: "7837777",
    col5: "johndoe@gmail.com",
    col6: "30",
    col7: "30",
  },
];

const usr_columns = [
  { field: "col1", headerName: "Username", width: 100 },
  { field: "col2", headerName: "First Name", width: 150 },
  { field: "col3", headerName: "Last Name", width: 150 },
  { field: "col4", headerName: "Mobile Number", width: 150 },
  { field: "col5", headerName: "Email Address", width: 250 },
  { field: "col6", headerName: "Messages", width: 100 },
  { field: "col7", headerName: "Charges", width: 100 },
];

const tr_columns = [
  { field: "col1", headerName: "Report Name", width: 150 },
  { field: "col2", headerName: "Report Date", width: 150 },
  { field: "col3", headerName: "Status", width: 150 },
  { field: "col4", headerName: "Date Range", width: 150 },
  { field: "col5", headerName: "File Size", width: 250 },
  {
    field: "col6",
    headerName: "Action",
    width: 150,
    renderCell: (params) => (
      <Link to={`/reports/${params.row.id}`} className="text-blue-500">
        View
      </Link>
    ),
  },
];
const tr_rows = [
  {
    id: 1,
    col1: "User Usage Report",
    col2: "12/11/23",
    col3: "Success",
    col4: "01/11/23-01/12/23",
    col5: "1kb",
  },
  {
    id: 2,
    col1: "User Usage Report",
    col2: "10/11/23",
    col3: "Success",
    col4: "24/11/23-24/12/23",
    col5: "5kb",
  },
];

const getFirstDayOfMonth = () => {
  return dayjs().startOf("month");
};

// Function to get the last day of the current month
const getLastDayOfMonth = () => {
  return dayjs().endOf("month");
};

export default function Reports() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(getFirstDayOfMonth());
  const [endDate, setEndDate] = useState(getLastDayOfMonth());

  const today = dayjs().format("DD/MM/YYYY");

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleReportTypeChange = (event) => {
    setSelectedReportType(event.target.value);
  };

  const search = () => {
    console.log("search button hit");
  };

  // const renderDataGrid = () => {
  //   if (selectedReportType === "usage") {
  //     // Render Transaction Report DataGrid
  //     return (
  //       <div>
  //         <DataGrid
  //           density="compact"
  //           rows={usr_rows}
  //           columns={usr_columns}
  //           hideFooter
  //         />
  //       </div>
  //     );
  //   } else if (selectedReportType === "transaction") {
  //     // Render Usage Summary Report DataGrid
  //     return (
  //       <div>
  //         <DataGrid
  //           density="compact"
  //           rows={tr_rows}
  //           columns={tr_columns}
  //           hideFooter
  //         />
  //         <Outlet />
  //       </div>
  //     );
  //   }
  //   // Default case: Render a placeholder or default DataGrid
  //   return (
  //     <DataGrid
  //       density="compact"
  //       rows={[]}
  //       columns={[]}
  //       hideFooter
  //       autoHeight
  //     />
  //   );
  // };

  return (
    <div className="h-screen w-full flex justify-center xl:pl-20 animate-fade-up animate-once animate-duration-200 animate-ease-in">
      <div className="h-min min-h-full rounded-lg md:shadow-lg xl:border-t-4 border-secondary w-full px-10 mt-4 xl:w-2/3">
        <h1 className="font-bold text-2xl my-10">Reports</h1>

        <label
          htmlFor="reportType"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Report type
        </label>
        <select
          id="reportType"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full md:w-2/3 lg:w-1/3 p-2.5 mb-4"
          onChange={(event) => navigate(`/reports/${event.target.value}`)}
        >
          {" "}
          <option value="" defaultValue={""}>
            Choose a report type
          </option>
          <option value="usage">Usage Summary Report</option>
          <option value="transaction">Transaction Report</option>
        </select>

        <div className="flex flex-col lg:flex-row w-full">
          <div className="my-3 w-full lg:wd-1/2">
            <div className="flex-col sm:flex-row flex align-middle justify-center md:justify-start">
              <div className="flex  gap-4">
                <DatePicker
                  label="Start Date"
                  defaultValue={today}
                  value={startDate}
                  format="DD-MM-YYYY"
                  size="small"
                  onChange={handleStartDateChange}
                />
                <DatePicker
                  label="End Date"
                  format="DD-MM-YYYY"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
              <div className="flex align-middle justify-center items-center mb-8 sm:m-0 sm:ml-8">
                <button
                  type="button"
                  onClick={search}
                  disabled={endDate.diff(startDate) < 0}
                  className="flex justify-center align-middle w-full mt-8 mb-0 sm:mt-0  text-white bg-primary hover:bg-hoverprim font-medium rounded-lg text-md px-3 py-2 disabled:bg-gray-200"
                >
                  <div className="flex align-middle justify-center items-center mt-1 lg:mt-0">
                    <TbReportSearch />
                  </div>

                  <div className="mx-2 lg:hidden">Generate</div>
                </button>
              </div>
            </div>
            <Outlet></Outlet>
            {/* <div className="mt-10">{renderDataGrid()}</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
