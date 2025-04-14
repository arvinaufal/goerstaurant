import { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import axios from "axios";
import Navbar from "../../components/fragments/Navbar";

export default function ExplorePage() {
    const [dataRestaurant, setDataRestaurant] = useState([]);
    const [mapOptions, setMapOptions] = useState({ 
        searchKeyword: '', 
        perPage: 'all', 
        day_of_week: '', 
        opening_time: '', 
        closing_time: '' 
    });
    const [isLoading, setIsLoading] = useState(false);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [infoWindows, setInfoWindows] = useState([]);
    const mapRef = useRef(null);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    

    const getRestaurant = async () => {
        setIsLoading(true);
        const { searchKeyword, perPage, page, day_of_week, opening_time, closing_time } = mapOptions;
        const endpoint = `http://127.0.0.1:8000/api/restaurants?search=${searchKeyword}&perPage=${perPage}&page=${page}&day_of_week=${day_of_week}&opening_time=${opening_time}&closing_time=${closing_time}`;

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            });


            setDataRestaurant(response.data.data);
            setmapOptions(prev => ({ ...prev, totalRows: response.data.total }));
        } catch (error) {

            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getRestaurant();
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&v=beta`;
        script.async = true;
        script.onload = () => {
            initMap();
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (map && dataRestaurant.length > 0) {
            clearMarkers();
            createMarkers();
        }
    }, [dataRestaurant, map]);

    const initMap = () => {

        const defaultCenter = { lat: -6.226228, lng: 106.846130 };
        
        const mapInstance = new window.google.maps.Map(mapRef.current, {
            center: defaultCenter,
            zoom: 12,
            mapId: "DEMO_MAP_ID"
        });
        
        setMap(mapInstance);
    };

    const createMarkers = () => {
        const newMarkers = [];
        const newInfoWindows = [];
        
        const bounds = new window.google.maps.LatLngBounds();

        dataRestaurant.forEach(restaurant => {
            if (!restaurant.lat || !restaurant.long) return;
            
            const position = { 
                lat: parseFloat(restaurant.lat), 
                lng: parseFloat(restaurant.long) 
            };
            
            const marker = new window.google.maps.marker.AdvancedMarkerElement({
                position,
                map,
                title: restaurant.name
            });
            
            const contentString = `
                <div class="p-2">
                    <h3 class="font-bold text-lg">${restaurant.name}</h3>
                    <img src="http://127.0.0.1:8000/${restaurant.photo}" alt="${restaurant.name}" class="w-full  object-cover my-2">
                    <p class="text-sm">${restaurant.description}</p>
                    <p class="text-sm mt-2"><b>Rating:</b> ⭐ ${restaurant.rating}</p>
                    <div class="mt-2">
                        ${restaurant.restaurant_schedules?.map(schedule => `
                            <p class="text-xs">
                            📅 
                                <b>${schedule.day_of_week}:</b> 
                                ${schedule.opening_time} - ${schedule.closing_time}
                            </p>
                        `).join('')}
                    </div>
                </div>
            `;
            
            const infoWindow = new window.google.maps.InfoWindow({
                content: contentString,
                ariaLabel: restaurant.name
            });
            
            marker.addListener('click', () => {
                infoWindows.forEach(iw => iw.close());
                infoWindow.open({
                    anchor: marker,
                    map
                });
            });
            
            newMarkers.push(marker);
            newInfoWindows.push(infoWindow);
            bounds.extend(position);
        });
        
        setMarkers(newMarkers);
        setInfoWindows(newInfoWindows);
        
        if (newMarkers.length > 0) {
            map.fitBounds(bounds);
            
            if (newMarkers.length === 1) {
                map.setZoom(15);
            }
        }
    };

    const clearMarkers = () => {
        markers.forEach(marker => {
            marker.map = null;
        });
        infoWindows.forEach(infoWindow => {
            infoWindow.close();
        });
        setMarkers([]);
        setInfoWindows([]);
    };


    return (
        <section className="flex flex-col w-full min-h-screen bg-white">
            <Navbar />
            <div className="flex flex-col w-full justify-center pt-8">
                <div className="w-full justify-start content-center items-center px-16">
                    <span className="text-4xl font-semibold text-red-800">🗺️ Explore the restaurants</span>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full px-16 pb-16 pt-4 rounded-xl overflow-hidden">
                        <div 
                            ref={mapRef} 
                            className="w-full h-[600px] rounded-xl border border-gray-200"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}