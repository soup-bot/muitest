import { Form } from "@remix-run/react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useRef, forwardRef} from "react";
import DataTable from 'react-data-table-component';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from "dayjs";




const rows = [
  { id: 1, col1: 'User 1', col2: 'Hello World', col3: 'Delivered', col4: '5-12-2023 15:42' },
  { id: 2, col1: 'User 2', col2: 'Bye World', col3: 'Delivered', col4: '5-12-2023 11:41' },
  { id: 3, col1: 'User 3', col2: 'Hi World', col3: 'Delivered', col4: '5-12-2023 15:44' },
  { id: 4, col1: 'User 4', col2: 'Hello World', col3: 'Pending', col4: '5-12-2023 10:30' },
  { id: 5, col1: 'User 5', col2: 'Bye World', col3: 'Delivered', col4: '5-12-2023 09:15' },
  { id: 6, col1: 'User 6', col2: 'Hi World', col3: 'Failed', col4: '5-12-2023 08:20' },
  { id: 7, col1: 'User 7', col2: 'Hello World', col3: 'Delivered', col4: '5-12-2023 14:10' },
  { id: 8, col1: 'User 8', col2: 'Bye World', col3: 'Pending', col4: '5-12-2023 13:05' },
  { id: 9, col1: 'User 9', col2: 'Hi World', col3: 'Failed', col4: '5-12-2023 12:00' },
  { id: 10, col1: 'User 10', col2: 'Hello World', col3: 'Delivered', col4: '5-12-2023 11:55' },
  { id: 11, col1: 'User 11', col2: 'Bye World', col3: 'Pending', col4: '5-12-2023 16:30' },
  { id: 12, col1: 'User 12', col2: 'Hi World', col3: 'Failed', col4: '5-12-2023 16:15' },
  { id: 13, col1: 'User 13', col2: 'Hello World', col3: 'Delivered', col4: '5-12-2023 15:00' },
  { id: 14, col1: 'User 14', col2: 'Bye World', col3: 'Pending', col4: '5-12-2023 14:55' },
  { id: 15, col1: 'User 15', col2: 'Hi World', col3: 'Failed', col4: '5-12-2023 14:50' },
  { id: 16, col1: 'User 16', col2: 'Hello World', col3: 'Delivered', col4: '5-12-2023 14:45' },
  { id: 17, col1: 'User 17', col2: 'Bye World', col3: 'Pending', col4: '5-12-2023 14:40' },
  { id: 18, col1: 'User 18', col2: 'Hi World', col3: 'Failed', col4: '5-12-2023 14:35' },
  { id: 19, col1: 'User 19', col2: 'Hello World', col3: 'Delivered', col4: '5-12-2023 14:30' },
  { id: 20, col1: 'User 20', col2: 'Bye World', col3: 'Pending', col4: '5-12-2023 14:25' },
  { id: 21, col1: 'User 21', col2: 'Hi World', col3: 'Failed', col4: '5-12-2023 14:20' },
  { id: 22, col1: 'User 22', col2: 'Hello World', col3: 'Delivered', col4: '5-12-2023 14:15' },
  { id: 23, col1: 'User 23', col2: 'Bye World', col3: 'Pending', col4: '5-12-2023 14:10' },
  { id: 24, col1: 'User 24', col2: 'Hi World', col3: 'Failed', col4: '5-12-2023 14:05' },
  { id: 25, col1: 'User 25', col2: 'Hello World', col3: 'Delivered', col4: '5-12-2023 14:00' },
  { id: 26, col1: 'User 26', col2: 'Bye World', col3: 'Pending', col4: '5-12-2023 13:55' },
  { id: 27, col1: 'User 27', col2: 'Hi World', col3: 'Failed', col4: '5-12-2023 13:50' },
  { id: 28, col1: 'User 28', col2: 'Hello World', col3: 'Delivered', col4: '5-12-2023 13:45' },
  { id: 29, col1: 'User 29', col2: 'Bye World', col3: 'Pending', col4: '5-12-2023 13:40' },
  { id: 30, col1: 'User 30', col2: 'Hi World', col3: 'Failed', col4: '5-12-2023 13:35' },
];


const columns = [
  { field: 'col1', headerName: 'To', width: 150 },
  { field: 'col2', headerName: 'Text', width: 150 },
  { field: 'col3', headerName: 'Status', width: 100 },
  { field: 'col4', headerName: 'Sent', width: 150 },
];


export default function SentItems() {

  const [selectedRows, setSelectedRows] = useState([]);

  const getFirstDayOfMonth = () => {
    return dayjs().startOf('month');
  };
  

  // Function to get the last day of the current month
  const getLastDayOfMonth = () => {
    return dayjs().endOf('month');
  };

  const [startDate, setStartDate] = useState(getFirstDayOfMonth());
  const [endDate, setEndDate] = useState(getLastDayOfMonth());
  const dataGridRef = useRef(null);
 const today = dayjs().format('DD/MM/YYYY')
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
 

  return (
    <div className="h-screen w-full flex justify-center xl:pl-20">
      <div className=" h-min min-h-full rounded-lg md:shadow-lg  xl:border-t-4  border-secondary w-full px-10 mt-4 xl:w-2/3" >
      <h1 className="font-medium text-2xl my-10">Sent items</h1>

        <Form>
         
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search.." required/>
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-secondary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>

        </Form>
        <div className="my-5">
        <div className="flex-col sm:flex-row flex align-middle justify-center">
<div className="flex  gap-4">
        <DatePicker
          label="Start Date"
          defaultValue={today}
          value={startDate}
          format="DD-MM-YYYY"
          size="small"
          onChange={handleStartDateChange}
        />

        {/* {startDate && (
          <p className="text-gray-700 dark:text-white">
            Start: {startDate.format('DD/MM/YYYY') }
          </p>
        )} */}
         <DatePicker
          label="End Date"
          format="DD-MM-YYYY"
          value={endDate}
          onChange={handleEndDateChange}
        />

        {/* {endDate && (
          <p className="text-gray-700 dark:text-white">
            End: {endDate.format('DD/MM/YYYY') }
          </p>
        )} */}
        {/* <p>DIFFERENCE: {startDate && endDate && (endDate.diff(startDate))}</p> */}
        </div>
        <div className="flex align-middle justify-center items-center mb-8 sm:m-0 sm:ml-8">
        <button type="button" className=" w-full mt-8 sm:mt-0  text-white bg-primary hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 sm:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View</button>
        </div>
        </div>
        </div>
        <div className="flex-col flex align-middle mb-5">
      <DataGrid density="compact" rows={rows} columns={columns} checkboxSelection={true} />
        </div>
      </div>
     
    </div>
  );
}
