import { IoChatbubblesOutline, IoHeartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Card({ restaurant }) {
    console.log(restaurant, 'hereee')
    const formattedBody = restaurant.description.substring(0, 250);
    const likes = Math.ceil(Math.random() * 999);
    const comments = Math.floor(Math.random() * 100);

    return (
        <div className="flex flex-row w-full bg-white py-6 px-4 border-b border-slate-200">
            <div className="flex flex-col w-1/5 justify-center items-center py-2 pl-2 pr-6">
                <img
                    src={`http://127.0.0.1:8000/${restaurant.photo}`}
                    alt={restaurant.name}
                
                />
            </div>
            <div className="flex flex-col w-4/5 p-2">
                <div className="flex w-full hover:underline cursor-pointer">
                    <span className="text-2xl font-bold ">{restaurant.name}</span>
                </div>
                <div className="flex flex-row w-full py-2 gap-3 items-center">
                    <span className="text-sm font-semibold">⭐ {restaurant.rating}</span>
                    <span>|</span>
                    <span className="text-sm font-light">👁️ {restaurant.views}</span>
                </div>
                <div className="flex w-full flex-row py-2">
                    <div className={`flex rounded-full px-4 py-1 ${restaurant.category === "Fine Dining" ? "bg-sky-100" : restaurant.category === "Casual Dining" ? "bg-green-100" : restaurant.category === "Cafe" ? "bg-violet-100" : "bg-orange-100"}`}>
                        <span className={`font-semibold text-xs ${restaurant.category === "Fine Dining" ? "text-sky-500" : restaurant.category === "Casual Dining" ? "text-green-500" : restaurant.category === "Cafe" ? "bg-violet-500" : "text-orange-500"}`}>{restaurant.category}</span>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    {formattedBody}...
                </div>
                <div className="flex flex-row w-full gap-2 mt-6">
                    <a  href={`https://www.google.com/maps?q=${restaurant.lat},${restaurant.long}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex flex-row w-full gap-2"
                    >
                        <div className="flex w-6">
                            <img src={'/public/images/loc.png'} alt="" />
                        </div>
                        <span className="underline italic">Location</span>
                    </a>
                </div>
            </div>
        </div>
    )
}