import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useSidebarStore from "../../stores/SidebarStore";
import { FiLogOut } from "react-icons/fi";
import { SiGooglemaps } from "react-icons/si";

export default function Sidebar() {
    const { currentMenu, updateCurrentMenu } = useSidebarStore();
    const navigate = useNavigate();
    const logout = async () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    }

    return (
        <div className="flex flex-col w-1/6 bg-white border-r border-r-slate-100 shadow-xl px-4">
            {/* Logo dan Judul */}
            <div className="flex flex-col w-full justify-center items-center content-center py-4">
                <div className="w-35">
                    <img src={"/public/images/goers-logo.png"} alt="Logo Goers" />
                </div>
                <div className="flex w-full justify-center items-center content-center py-2">
                    <span className="italic font-bold text-red-800">Goerstaurant</span>
                </div>
            </div>

            {/* Menu Items */}
            <div className="w-full flex flex-col gap-4">
                {/* Dashboard */}
                <div className="w-full flex">
                    <Link
                        to={"/admin"}
                        className={`w-full flex flex-row justify-center hover:bg-[#CA3F4B] py-2 px-3 rounded-full group transition-colors duration-500 cursor-pointer ${currentMenu === 'dashboard' ? 'bg-primary-goers' : ''}`}
                        onClick={() => updateCurrentMenu('dashboard')}
                    >
                        <div className="flex w-1/5 justify-center">
                            <MdDashboard size={24} className={`text-red-800 group-hover:text-white ${currentMenu === 'dashboard' ? 'text-white' : ''}`} />
                        </div>
                        <div className={`flex w-4/5 items-center text-md text-red-800 group-hover:text-white ${currentMenu === 'dashboard' ? 'text-white' : ''}`}>
                            Dashboard
                        </div>
                    </Link>
                </div>

                {/* Restoran */}
                <div className="w-full flex">
                    <Link
                        to={"/admin/restaurant"}
                        className={`w-full flex flex-row justify-center hover:bg-[#CA3F4B] py-2 px-3 rounded-full group transition-colors duration-500 cursor-pointer ${currentMenu === 'restaurant' ? 'bg-primary-goers' : ''}`}
                        onClick={() => updateCurrentMenu('restaurant')}
                    >
                        <div className="flex w-1/5 justify-center">
                            <SiGooglemaps size={20} className={`text-red-800 group-hover:text-white ${currentMenu === 'restaurant' ? 'text-white' : ''}`} />
                        </div>
                        <div className={`flex w-4/5 items-center text-md text-red-800 group-hover:text-white ${currentMenu === 'restaurant' ? 'text-white' : ''}`}>
                            Restaurant
                        </div>
                    </Link>
                </div>

                <div className="w-full flex">
                    <div
                        onClick={logout}
                        className={`w-full flex flex-row justify-center border-2 border-red-400 text-red-400 hover:bg-red-500 py-2 px-3 rounded-full group transition-colors duration-500 cursor-pointer ${currentMenu === 'logout' ? 'bg-red-500' : ''}`}
                    >
                        <div className="flex w-1/5 justify-center">
                            <FiLogOut size={20} className={`text-red-bg-red-500 group-hover:text-white ${currentMenu === 'logout' ? 'text-white' : ''}`} />
                        </div>
                        <div className={`flex w-4/5 items-center text-md text-red-bg-red-500 group-hover:text-white ${currentMenu === 'logout' ? 'text-white' : ''}`}>
                            Log Out
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}