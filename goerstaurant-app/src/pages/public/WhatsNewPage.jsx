import Navbar from "../../components/fragments/Navbar";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Card from "../../components/fragments/Card";
import { useEffect, useRef, useState } from "react";
import { LoadingSpinner, NoDataAvailable } from "../../components/fragments/Other";
import axios from "axios";

export default function WhatsNewPage() {
    const [dataRestaurant, setDataRestaurant] = useState([]);
    const [mapOptions, setMapOptions] = useState({ 
        searchKeyword: '', 
        perPage: 'all', 
        cat: '', 
    });
    const [isLoading, setIsLoading] = useState(false);
    const searchTimerRef = useRef(null);

    const getRestaurant = async () => {
        setIsLoading(true);
        const { searchKeyword, cat } = mapOptions;
        const endpoint = `http://127.0.0.1:8000/api/restaurants?search=${searchKeyword}&perPage=all&page=&cat=${cat}`;

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            });

            setDataRestaurant(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (keyword) => {
        setMapOptions(prev => ({
            ...prev,
            searchKeyword: keyword
        }));
    };

    const handleCat = (category) => {
        setMapOptions(prev => ({
            ...prev,
            cat: prev.cat === category ? '' : category
        }));
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
    }, [mapOptions.searchKeyword, mapOptions.cat]);

    const categories = [
        { name: 'Fine Dining', color: 'sky' },
        { name: 'Casual Dining', color: 'green' },
        { name: 'Cafe', color: 'orange' },
        { name: 'Buffet', color: 'violet' }
    ];

    return (
        <section className="flex flex-col w-full min-h-screen bg-white">
            <Navbar />
            <div className="flex flex-row w-full justify-center ">
                <div className="flex flex-col w-3/5">
                    {isLoading && <LoadingSpinner/>}
                    {dataRestaurant.length == 0 && !isLoading && <NoDataAvailable/>}
                    {dataRestaurant.length > 0 &&
                        dataRestaurant.map((restaurant) => (
                            <Card key={restaurant.id} restaurant={restaurant} />
                        ))
                    }
                </div>
                <div className="flex flex-col w-1/5 bg-white mt-6">
                    <div className="p-4 w-full flex flex-col bg-white rounded-xl border border-slate-200">
                        <div className="flex flex-row w-full h-8 border border-slate-200 rounded-full">
                            <input
                                type="text"
                                name="search"
                                value={mapOptions.searchKeyword}
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
                        <div className="w-full flex flex-row justify-center mt-6 gap-6">
                            <div className="w-full flex flex-col justify-center gap-3">
                                {categories.slice(0, 2).map((category) => (
                                    <div 
                                        key={category.name}
                                        onClick={() => handleCat(category.name)} 
                                        className={`flex rounded-full cursor-pointer px-4 py-1 justify-center 
                                            ${mapOptions.cat === category.name 
                                                ? `bg-${category.color}-500` 
                                                : `bg-${category.color}-100`}`}
                                    >
                                        <span className={`font-semibold text-xs 
                                            ${mapOptions.cat === category.name 
                                                ? 'text-white' 
                                                : `text-${category.color}-500`}`}>
                                            {category.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full flex flex-col justify-center gap-3">
                                {categories.slice(2, 4).map((category) => (
                                    <div 
                                        key={category.name}
                                        onClick={() => handleCat(category.name)} 
                                        className={`flex rounded-full cursor-pointer px-4 py-1 justify-center 
                                            ${mapOptions.cat === category.name 
                                                ? `bg-${category.color}-500` 
                                                : `bg-${category.color}-100`}`}
                                    >
                                        <span className={`font-semibold text-xs 
                                            ${mapOptions.cat === category.name 
                                                ? 'text-white' 
                                                : `text-${category.color}-500`}`}>
                                            {category.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {mapOptions.cat && (
                            <button 
                                onClick={() => handleCat('')}
                                className="mt-4 text-xs text-gray-500 underline"
                            >
                                Clear filter
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}