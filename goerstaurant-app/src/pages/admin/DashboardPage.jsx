import { useState, useEffect } from "react";
import Sidebar from "../../components/fragments/Sidebar";
import axios from "axios";
import { TbReportAnalytics } from "react-icons/tb";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useNavigate } from "react-router-dom";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function DashboardPage() {
    const [dataReport, setDataReport] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const getReport = async () => {
        setIsLoading(true);
        const endpoint = `http://127.0.0.1:8000/api/report`;

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ` + localStorage.getItem('access_token')
                }
            });

            setDataReport(response.data.data);
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

    useEffect(() => {
        getReport();
    }, []);

    const chartData = {
        labels: dataReport.map(item => item.name),
        datasets: [
            {
                label: 'Total Engagement',
                data: dataReport.map(item => item.views),
                backgroundColor: 'oklch(44.4% 0.177 26.899)',
                borderColor: 'oklch(44.4% 0.177 26.899)',
                borderWidth: 1,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Restaurant Engagement Data',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.raw} views`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return value;
                    }
                }
            }
        }
    };

    const LoadingSpinner = () => (
        <div className="flex flex-col justify-center items-center content-center h-full gap-20">
            <span className="loading loading-spinner text-red-800 w-36"></span>
            <div className="flex justify-center items-center content-center">
                <span>Mohon tunggu...</span>
            </div>
        </div>
    );

    return (
        <section className="w-full flex flex-row min-h-screen">
            <Sidebar />
            <div className="flex flex-col w-5/6 bg-slate-100 px-6 py-4 gap-4">
                <div className="flex flex-row w-full rounded-xl shadow-xl bg-white px-4 py-4">
                    <div className="flex w-1/2 items-center content-center gap-4 flex-row">
                        <TbReportAnalytics size={40} className={`text-red-800`} />
                        <span className="text-xl font-semibold text-red-800">Dashboard</span>
                    </div>
                    <div className="flex flex-row w-1/2 px-4 justify-end">
                        <div className="breadcrumbs text-md">
                            <ul>
                                <li>
                                    <a>
                                        <TbReportAnalytics size={20} className={`text-red-800`} />
                                        <span className="text-red-800">
                                            Dashboard
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full h-full bg-white px-8 py-4 rounded-xl shadow-xl justify-center items-center content-center">
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="flex flex-col w-full rounded-xl overflow-hidden">
                            <div className="h-96 w-full">
                                <Bar data={chartData} options={chartOptions} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}