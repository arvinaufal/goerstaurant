import { Link } from "react-router-dom";
import useNavbarStore from "../../stores/NavbarStore";

export default function Navbar() {
    const { currentMenu, updateCurrentMenu } = useNavbarStore();
    
    return (
        <div className="flex w-full py-6 justify-center items-center bg-white sticky top-0 z-10">
            <div className="flex flex-row w-5/6">
                <div className="flex flex-row w-2/5 text-3xl justify-start content-center items-center ">
                    <div className="flex flex-row  items-center justify-center content-center">
                        <a href="https://www.goersapp.com/">
                            <img src={"/public/images/goers-logo.png"} alt="Logo Goers" className="w-40" />
                        </a>
                    </div>
                    <div className="px-2 py-1 flex justify-end items-end content-end h-full bg-red-800 rounded-lg">
                        <span className="italic text-md font-semibold text-white">taurant</span>
                    </div>
                </div>
                <div className="flex flex-row w-3/5 gap-2 justify-end items-center content-center ">
                    <Link to={'/'} onClick={() => updateCurrentMenu('home')} className={`flex hover:font-semibold cursor-pointer w-32 ${currentMenu === 'home' ? 'font-semibold' : ''}`}>
                        <span className="text-xl">🏠 Home</span>
                    </Link>
                    <Link to={'/explore'} onClick={() => updateCurrentMenu('explore')} className={`flex hover:font-semibold cursor-pointer w-32 ${currentMenu === 'explore' ? 'font-semibold' : ''}`}>
                        <span className="text-xl">🗺️ Explore</span>
                    </Link>
                    <Link to={'/whats-new'} onClick={() => updateCurrentMenu('whats-new')} className={`flex hover:font-semibold cursor-pointer w-42 ${currentMenu === 'whats-new' ? 'font-semibold' : ''}`}>
                        <span className="text-xl">🔥 What's new?</span>
                    </Link>
                    <Link to={'/login'} className={`flex hover:font-semibold cursor-pointer w-48`}>
                        <span className="text-xl">🚪 Login</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}