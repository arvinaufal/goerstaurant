import { useState, useEffect, useRef } from "react";
import { MdEdit, MdDelete, MdAdd, MdMenuBook, MdCalendarMonth } from "react-icons/md";
import Sidebar from "../../components/fragments/Sidebar";
import { FaMagnifyingGlass } from "react-icons/fa6";
import DataTable from "react-data-table-component";
import axios from "axios";
import FormRestaurant from "../../components/restaurant/formRestaurant";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { ToastifyMessage } from "../../components/toastify";
import { useNavigate } from "react-router-dom";
import FormMenu from "../../components/restaurant/formMenu";
import FormSchedule from "../../components/restaurant/formSchedule";
import { SiGooglemaps } from "react-icons/si";

export default function RestaurantPage() {

    const [selectedData, setSelectedData] = useState({
        id: '',
        name: '',
        photo: '',
        description: '',
        rating: '',
        views: '',
        lat: '',
        long: '',
        category: '',
        menus: [],
        restaurant_schedules: []
    });
    const [dataRestaurant, setDataRestaurant] = useState([]);
    const [datatableOptions, setDatatableOptions] = useState({ searchKeyword: '', perPage: 10, page: 1, totalRows: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [selectedForm, setSelectedForm] = useState('');
    const searchTimerRef = useRef(null);
    const [pending, setPending] = useState(false);
    const navigate = useNavigate();


    const getRestaurant = async () => {
        setIsLoading(true);
        const { searchKeyword, perPage, page } = datatableOptions;
        const endpoint = `http://127.0.0.1:8000/api/restaurants?search=${searchKeyword}&perPage=${perPage}&page=${page}`;

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ` + localStorage.getItem('access_token')
                }
            });


            setDataRestaurant(response.data.data);
            setDatatableOptions(prev => ({ ...prev, totalRows: response.data.total }));
        } catch (error) {
            if (error.response?.data?.message === "Unauthenticated.") {
                localStorage.removeItem('access_token');
                navigate('/login');
            }

            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };


    const addRestaurant = async (formData) => {
        console.log('masuk addRestaurant')

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/restaurants`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Accept": "application/json",
                        Authorization: `Bearer ` + localStorage.getItem('access_token')
                    }
                }
            );

            const formattedMessage = Array.isArray(response.data.message)
                ? response.data.message.map(msg => `<div>${msg}</div>`).join("")
                : response.data.message;

            console.log(formattedMessage, 'formattedMessage')
            console.log(response, 'response')

            if (response.status === 201) {
                getRestaurant();
                document.getElementById('modal-add').close();
                toast.success(
                    <ToastifyMessage
                        title="Success"
                        messages={formattedMessage}
                    />, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    onClose: () => {
                        return { status: "success" };
                    }
                });
            }

        } catch (error) {
            const formattedMessage = Array.isArray(error.response?.data?.message)
                ? error.response?.data?.message.map(msg => `<div>${msg}</div>`).join("")
                : error.response?.data?.message;
            console.error("Registration failed:", error.response?.data || error.message);
            document.getElementById('modal-add').close();

            toast.error(
                <ToastifyMessage
                    title="Failed to create restaurant!"
                    messages={formattedMessage}
                />, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });


            return {
                status: "failed",
            };
        }
    };

    const updateRestaurant = async (formData) => {
        try {

            const response = await axios.post(
                `http://127.0.0.1:8000/api/restaurants/${selectedData.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Accept": "application/json",
                        Authorization: `Bearer ` + localStorage.getItem('access_token')
                    }
                }
            );

            const formattedMessage = Array.isArray(response.data.message)
                ? response.data.message.map(msg => `<div>${msg}</div>`).join("")
                : response.data.message;


            if (response.status === 200) {
                getRestaurant();
                document.getElementById('modal-update').close();
                document.getElementById('modal-menu').close();
                document.getElementById('modal-schedule').close();
                toast.success(
                    <ToastifyMessage
                        title="Success"
                        messages={formattedMessage}
                    />, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    onClose: () => {
                        return { status: "success" };
                    }
                });

            }

        } catch (error) {
            console.error("Registration failed:", error.response?.data || error.message);
            document.getElementById('modal-update').close();
            document.getElementById('modal-menu').close();
            document.getElementById('modal-schedule').close();
            document.getElementById('modal-add').close();


            const formattedMessage = Array.isArray(error.response?.data?.message)
                ? error.response?.data?.message.map(msg => `<div>${msg}</div>`).join("")
                : error.response?.data?.message;



            toast.error(
                <ToastifyMessage
                    title="Failed to update restaurant!"
                    messages={formattedMessage}
                />, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });


            return {
                status: "failed"
            };
        }
    };

    const deleteRestaurant = async (id) => {

        setPending(true);

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/restaurants/${id}`,
                {
                    _method: 'DELETE'
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        Authorization: `Bearer ` + localStorage.getItem('access_token')
                    }
                }
            );

            if (response.status === 200) {
                const formattedMessage = Array.isArray(response.data.message)
                    ? response.data.message.map(msg => `<div>${msg}</div>`).join("")
                    : response.data.message;

                getRestaurant();
                document.getElementById('modal-delete').close();
                setPending(false);
                toast.success(
                    <ToastifyMessage
                        title="Success"
                        messages={formattedMessage}
                    />, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    onClose: () => {
                        return { status: "success" };
                    }
                });
            }

        } catch (error) {
            const formattedMessage = Array.isArray(error.response?.data?.message)
                ? error.response?.data?.message.map(msg => `<div>${msg}</div>`).join("")
                : error.response?.data?.message;
            console.error("Registration failed:", error.response?.data || error.message);
            document.getElementById('modal-delete').close();
            setPending(false);
            toast.error(
                <ToastifyMessage
                    title="Failed to delete restaurant!"
                    messages={formattedMessage}
                />, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });


            return {
                status: "failed"
            };
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
    }, [datatableOptions.searchKeyword, datatableOptions.perPage, datatableOptions.page]);


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

    const LoadingSpinner = () => (
        <div className="flex flex-col justify-center items-center content-center h-full gap-20">
            <span className="loading loading-spinner text-red-800  w-36"></span>
            <div className="flex justify-center items-center content-center">
                <span>Mohon tunggu...</span>
            </div>
        </div>
    );

    const NoDataAvailable = () => (
        <div className="flex flex-col justify-center items-center h-full">
            <img src={"/public/images/no-data.png"} alt="Data illustrations by Storyset" style={{ width: 400 }} />
            <span className="text-gray-500 italic">No data available</span>
        </div>
    );


    const handleShowModal = (data, type) => {
        console.log(data, 'dataaaaaaaaaaaaaaaaaaaaaaaa')
        const {
            id,
            name,
            photo,
            description,
            rating,
            views,
            lat,
            long,
            category,
            menus,
            restaurant_schedules
        } = data;
        setSelectedData({
            id,
            name,
            photo,
            description,
            rating,
            views,
            lat,
            long,
            category,
            menus,
            restaurant_schedules
        });

        if (type === 'update-restaurant') {
            setSelectedForm('restaurant');
            document.getElementById('modal-update').showModal();
        } else if (type === 'menu') {
            setSelectedForm('menu');
            document.getElementById('modal-menu').showModal();

        } else if (type === 'schedule') {
            setSelectedForm('schedule');
            document.getElementById('modal-schedule').showModal();

        }
    }

    const handleModalDelete = (data) => {
        const { id, name } = data;
        setSelectedData({ id, name });
        document.getElementById('modal-delete').showModal();
    }


    const columns = [
        {
            name: 'No',
            selector: (row, index) => (datatableOptions.page - 1) * datatableOptions.perPage + index + 1,
            sortable: false,
            width: '80px',
        },
        {
            name: 'Restaurant Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Menus',
            cell: (row) => (
                <div className="flex">
                    <button
                        className="p-2 hover:bg-white hover:text-red-800 hover:border-2 hover:py-1 hover:px-2 hover:border-[#CA3F4B] bg-[#CA3F4B] cursor-pointer text-white rounded"
                        onClick={() => handleShowModal(row, 'menu')}
                    >
                        <MdMenuBook size={20} />
                    </button>
                </div>
            ),
            width: '150px',
        },
        {
            name: 'Schedule',
            cell: (row) => (
                <div className="flex">
                    <button
                        className="p-2 hover:bg-white hover:text-red-800 hover:border-2 hover:py-1 hover:px-2 hover:border-[#CA3F4B] bg-[#CA3F4B] cursor-pointer text-white rounded"
                        onClick={() => handleShowModal(row, 'schedule')}
                    >
                        <MdCalendarMonth size={20} />
                    </button>
                </div>
            ),
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
            name: 'Rating',
            selector: row => row.rating,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
        },
        {
            name: 'Tools',
            cell: (row) => (
                <div className="flex flex-row gap-2">
                    <button
                        className="p-2 hover:bg-white hover:text-red-800 hover:border-2 hover:py-1 hover:px-2 hover:border-[#CA3F4B] bg-[#CA3F4B] cursor-pointer text-white rounded"
                        onClick={() => handleShowModal(row, 'update-restaurant')}
                    >
                        <MdEdit size={20} />
                    </button>
                    <button
                        className="p-2 hover:bg-white hover:text-red-600 hover:border-2 hover:py-1 hover:px-2 hover:border-red-500 bg-red-500 cursor-pointer text-white rounded"
                        onClick={() => handleModalDelete(row)}
                    >
                        <MdDelete size={20} />
                    </button>
                </div>
            ),
            width: '150px',
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
        <section className="w-full flex flex-row min-h-screen">
            <Sidebar />
            <div className="flex flex-col w-5/6 bg-slate-100 px-6 py-4 gap-4">
                <div className="flex flex-row w-full rounded-xl shadow-xl bg-white px-4 py-4">
                    <div className="flex w-1/2 items-center content-center gap-4 flex-row">
                        <SiGooglemaps size={40} className={`text-red-800`} />
                        <span className="text-xl font-semibold text-red-800">Restaurant</span>
                    </div>
                    <div className="flex flex-row w-1/2 px-4 justify-end">
                        <div className="breadcrumbs text-md">
                            <ul>
                                <li>
                                    <a>
                                        <SiGooglemaps size={20} className={`text-red-800`} />
                                        <span className="text-red-800">
                                            Restaurant
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full h-full bg-white px-8 py-4 rounded-xl shadow-xl">
                    <div className="flex flex-row w-full">
                        <div className='w-1/2 flex flex-col justify-start items-start content-start my-8'>

                            <div className='flex flex-row w-2/3 justify-center relative'>
                                <input
                                    type="text"
                                    value={datatableOptions.searchKeyword}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder='Cari data...'
                                    className="bg-white focus:outline-none rounded-full  pr-16 pl-4 pt-2 pb-2 border border-solid border-red-800"
                                    style={{ width: "80%" }}
                                />
                                <div className='w-14 flex justify-center items-center content-center absolute right-9 top-1 rounded-full py-2' >
                                    <FaMagnifyingGlass style={{ color: "#CA3F4B", fontWeight: "bold" }} size={18} />
                                </div>
                            </div>

                        </div>
                        <div className="flex w-1/2 justify-end items-center content-center">
                            <div
                                className="hover:bg-white hover:text-red-800 hover:border-2 hover:border-[#CA3F4B] bg-[#CA3F4B] cursor-pointer text-white py-2 px-6 flex items-center gap-2 rounded-full transition-colors duration-500"
                                onClick={() => {
                                    setSelectedForm('restaurant')
                                    document.getElementById('modal-add').showModal()
                                }}
                            >
                                <MdAdd size={20} />
                                <span>Add Restaurant</span>
                            </div>
                        </div>

                    </div>


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
            </div>

            <dialog id="modal-add" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Restaurant</h3>
                    <div className="modal-action">
                        <div className="flex flex-col w-full">
                            {
                                selectedForm === 'restaurant' && (
                                    <FormRestaurant formType="add" addMethod={addRestaurant} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </dialog>


            <dialog id="modal-update" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Restaurant</h3>
                    <div className="modal-action">
                        <div className="flex flex-col w-full">
                            {
                                selectedForm === 'restaurant' && (
                                    <FormRestaurant formType="update" updateMethod={updateRestaurant} selectedData={selectedData} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </dialog>

            <dialog id="modal-delete" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Restaurant</h3>
                    <div className="modal-action">
                        <div className="flex flex-col w-full gap-4">
                            <div className="w-full flex ">
                                Are you sure you want you want to delete restaurant "{selectedData.name}"?
                            </div>
                            <div className="flex w-full mt-4 justify-end gap-4">
                                <div className="flex justify-center items-center content-center px-8 py-1 rounded-full cursor-pointer bg-slate-500 hover:bg-slate-600 transition-colors duration-500"
                                    onClick={() => {
                                        document.getElementById('modal-update').close();
                                        document.getElementById('modal-add').close();
                                        document.getElementById('modal-delete').close();
                                    }}
                                >
                                    <span className="text-sm text-white">Back</span>
                                </div>
                                {pending ? (
                                    <div className="h-8 rounded-full flex justify-center items-center cursor-pointer w-1/4 bg-red-600 text-black/40 transition-colors duration-500">
                                        <span className="loading loading-spinner loading-md text-white"></span>
                                    </div>


                                ) : (


                                    <div
                                        onClick={() => deleteRestaurant(selectedData.id)}
                                        className="h-8 bg-red-600 rounded-full flex justify-center items-center cursor-pointer  w-1/4 hover:bg-red-700 transition-colors duration-500"
                                    >
                                        <span className="text-sm text-white">Delete</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>


            <dialog id="modal-menu" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Set Restaurant's Menu</h3>
                    <div className="modal-action">
                        <div className="flex flex-col w-full">
                            {
                                selectedForm === 'menu' && (
                                    <FormMenu formType="update" setMethod={updateRestaurant} selectedData={selectedData} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </dialog>

            <dialog id="modal-schedule" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Set Restaurant's Schedule</h3>
                    <div className="modal-action">
                        <div className="flex flex-col w-full">
                            {
                                selectedForm === 'schedule' && (
                                    <FormSchedule formType="update" setMethod={updateRestaurant} selectedData={selectedData} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </dialog>



            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
                className="custom-toast-container"
                toastClassName="custom-toast"
                bodyClassName="custom-toast-body"
            />
        </section>
    );
}