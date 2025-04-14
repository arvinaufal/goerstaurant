import Navbar from "../../components/fragments/Navbar";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { LoadingSpinner, NoDataAvailable } from "../../components/fragments/Other";
import axios from "axios";

export default function HomePage() {
    const [dataRestaurant, setDataRestaurant] = useState([]);
    const [datatableOptions, setDatatableOptions] = useState({ searchKeyword: '', perPage: 10, page: 1, totalRows: 0, day_of_week: '', opening_time: '', closing_time: '' });
    const [isLoading, setIsLoading] = useState(false);
    const searchTimerRef = useRef(null);
    const [selectedDays, setSelectedDays] = useState({
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        Sun: false
    });
    const [timeFilters, setTimeFilters] = useState({
        opening_time: '',
        closing_time: ''
    });

    const getRestaurant = async () => {
        setIsLoading(true);
        const { searchKeyword, perPage, page, day_of_week, opening_time, closing_time } = datatableOptions;
        const endpoint = `http://127.0.0.1:8000/api/restaurants?search=${searchKeyword}&perPage=${perPage}&page=${page}&day_of_week=${day_of_week}&opening_time=${opening_time}&closing_time=${closing_time}`;

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    // Authorization: `Bearer ` + localStorage.getItem('access_token')
                }
            });


            setDataRestaurant(response.data.data);
            setDatatableOptions(prev => ({ ...prev, totalRows: response.data.total }));
        } catch (error) {

            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        if (searchTimerRef.current) {
            clearTimeout(searchTimerRef.current);
        }


        searchTimerRef.current = setTimeout(() => {
            getRestaurant();
        }, 500);


        return () => {
            if (searchTimerRef.current) {
                clearTimeout(searchTimerRef.current);
            }
        };
    }, [datatableOptions.searchKeyword, datatableOptions.perPage, datatableOptions.page, datatableOptions.day_of_week, datatableOptions.opening_time, datatableOptions.closing_time]);


    const handleSearch = (keyword) => {
        setDatatableOptions(prev => ({
            ...prev,
            searchKeyword: keyword,
            page: 1
        }));
    };


    const handlePerPageChange = (newPerPage) => {
        setDatatableOptions(prev => ({ ...prev, perPage: newPerPage, page: 1 }));
    };


    const handlePageChange = (newPage) => {
        setDatatableOptions(prev => ({ ...prev, page: newPage }));
    };

    const handleDayChange = (day) => {
        const updatedSelectedDays = {
            ...selectedDays,
            [day]: !selectedDays[day]
        };

        const selectedDayString = Object.entries(updatedSelectedDays)
            .filter(([day, isSelected]) => isSelected)
            .map(([day]) => day)
            .join(',');
            
        setSelectedDays(updatedSelectedDays);
        setDatatableOptions(prev => ({
            ...prev,
            day_of_week: selectedDayString,
            page: 1
        }));
    };


    const handleTimeChange = (type, value) => {
        const updatedTimeFilters = {
            ...timeFilters,
            [type]: value
        };
        
        setTimeFilters(updatedTimeFilters);

        if (searchTimerRef.current) {
            clearTimeout(searchTimerRef.current);
        }
        
        searchTimerRef.current = setTimeout(() => {
            setDatatableOptions(prev => ({
            ...prev,
            opening_time: updatedTimeFilters.opening_time,
            closing_time: updatedTimeFilters.closing_time,
            page: 1
            }));
        }, 500);
    };



    const columns = [
        {
            name: 'No',
            selector: (row, index) => (datatableOptions.page - 1) * datatableOptions.perPage + index + 1,
            sortable: false,
            width: '80px',
        },
        {
            name: 'Restaurant Name',
            cell: row => {

                if (row.name.length > 50) {
                    return <span>{row.name.slice(0, 50) + '...'}</span>;
                } else {
                    return <span>{row.name}</span>;
                }
            },
            sortable: true,
            width: '150px',
        },
        {
            name: "Description",
            cell: row => {
                const textContent = row.description.replace(/<[^>]*>/g, '');

                if (textContent.length > 50) {
                    return <span>{textContent.slice(0, 50) + '...'}</span>;
                } else {
                    return <span dangerouslySetInnerHTML={{ __html: row.description }} />;
                }
            },
            sortable: true,
            width: '150px',
        },
        {
            name: 'Maps',
            cell: row => (
                <div className="flex flex-row justify-center gap-1">
                    <span>🌏</span>
                    
                    <a 
                        href={`https://www.google.com/maps?q=${row.lat},${row.long}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="italic underline flex justify-center"
                    >
                        Location
                    </a>
                </div>
            ),
            width: '150px',
        },    
        {
            name: "Schedule",
            cell: row => {
                console.log(row.restaurant_schedules)
                let component = ``;

                row.restaurant_schedules.forEach((schedule) => {
                    component += `<div className="w-full flex flex-row font-semibold">
                        📅 ${schedule.day_of_week} : ${schedule.opening_time} - ${schedule.closing_time}
                    </div>`
                })

                return <div className="w-full flex flex-col" dangerouslySetInnerHTML={{ __html: component }} />;
            },
            sortable: true,
        },
        {
            name: 'Rating',
            cell: row => {
                
                    return <span>⭐ {row.rating}</span>;
            },
            sortable: true,
        },
        
    ];


    const customStyles = {
        rows: {
            style: {
                border: '1px solid #e2e8f0',
            },
        },
        headCells: {
            style: {
                backgroundColor: '#CA3F4B',
                color: '#ffffff',
                fontWeight: 'bold',
            },
        },
        cells: {
            style: {
                padding: '10px',
            },
        },
    };


    const conditionalRowStyles = [
        {
            when: (row, index) => index % 2 === 0,
            style: {
                backgroundColor: '#bae6fd',
            },
        },
        {
            when: (row, index) => index % 2 !== 0,
            style: {
                backgroundColor: '#ffffff',
            },
        },
    ];

    return (
        <section className="flex flex-col w-full min-h-screen bg-white">
            <Navbar />
            <div className="flex flex-row w-full justify-center pt-16 gap-14 ">
                <div className="flex flex-col w-3/5">
                    <div className="flex flex-col w-full rounded-xl overflow-hidden">
                        <DataTable
                            columns={columns}
                            data={dataRestaurant}
                            customStyles={customStyles}
                            conditionalRowStyles={conditionalRowStyles}
                            pagination
                            paginationServer
                            paginationTotalRows={datatableOptions.totalRows}
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handlePerPageChange}
                            progressPending={isLoading}
                            progressComponent={<LoadingSpinner />}
                            noDataComponent={<NoDataAvailable />}
                            highlightOnHover
                            striped={false}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-1/5 bg-white mt-6">
                    <div className="p-4 w-full flex flex-col  bg-white rounded-xl border border-slate-200">
                        <div className="flex flex-row w-full h-8 border border-slate-200 rounded-full">
                            <input
                                type="text"
                                name="search"
                                value={datatableOptions.searchKeyword}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="bg-white w-5/6 rounded-l-full px-4 outline-none focus:bg-white"
                                placeholder="Find restaurant ..."
                            />
                            <div className="flex w-1/5 h-full rounded-full justify-center items-center" >
                                <div className="flex w-full h-full rounded-r-full justify-center items-center">
                                    <FaMagnifyingGlass size={18} color="gray" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-center mt-6 gap-6">
                            <h3 className="font-medium">Schedule Filter:</h3>
                            <div className="w-full flex flex-col justify-start gap-2">
                                {[
                                    { day: 'Mon', label: 'Monday' },
                                    { day: 'Tue', label: 'Tuesday' },
                                    { day: 'Wed', label: 'Wednesday' },
                                    { day: 'Thu', label: 'Thursday' },
                                    { day: 'Fri', label: 'Friday' },
                                    { day: 'Sat', label: 'Saturday' },
                                    { day: 'Sun', label: 'Sunday' }
                                ].map(({ day, label }) => (
                                    <div key={day} className="w-full flex flex-row justify-start gap-2 items-center">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedDays[day]}
                                            onChange={() => handleDayChange(day)}
                                            className="checkbox checkbox-success"
                                            id={`day-${day}`}
                                            disabled={isLoading}
                                        />
                                        <label htmlFor={`day-${day}`}>
                                            {label}
                                            {isLoading && selectedDays[day]}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full flex flex-row justify-start gap-2">
                                <div className="w-1/2 flex flex-col justify-center gap-1">
                                    <span>Opening time:</span>
                                    <input 
                                    type="time" 
                                    className="input input-bordered w-full"
                                    value={timeFilters.opening_time}
                                    onChange={(e) => handleTimeChange('opening_time', e.target.value)}
                                    />
                                </div>
                                <div className="w-1/2 flex flex-col justify-center gap-1">
                                    <span>Closing time:</span>
                                    <input 
                                    type="time" 
                                    className="input input-bordered w-full"
                                    value={timeFilters.closing_time}
                                    onChange={(e) => handleTimeChange('closing_time', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-end mt-2">
                                <button 
                                    className="btn btn-xs btn-ghost"
                                    onClick={() => {
                                    handleTimeChange('opening_time', '');
                                    handleTimeChange('closing_time', '');
                                    }}
                                    disabled={!timeFilters.opening_time && !timeFilters.closing_time}
                                >
                                    Clear Times
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}