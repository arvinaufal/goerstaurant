import { useEffect, useRef, useState } from 'react';

export default function GoogleMapComponent({ onLocationSelect, initialPosition }) {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        if (window.google && window.google.maps) {
            setScriptLoaded(true);
            initializeMap();
            return;
        }

        if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        const checkInterval = setInterval(() => {
            if (window.google && window.google.maps) {
            clearInterval(checkInterval);
            setScriptLoaded(true);
            initializeMap();
            }
        }, 100);
        return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
        setScriptLoaded(true);
            initializeMap();
        };
        document.head.appendChild(script);

        return () => {
        if (mapInstanceRef.current) {
            window.google.maps.event.clearInstanceListeners(mapInstanceRef.current);
        }
        };
    }, []);

    useEffect(() => {
        if (scriptLoaded && mapInstanceRef.current && initialPosition) {
        const { lat, lng } = initialPosition;
        mapInstanceRef.current.setCenter({ lat, lng });
        
        if (markerRef.current) {
            markerRef.current.setPosition({ lat, lng });
        } else {
            createMarker({ lat, lng });
        }
        }
    }, [initialPosition, scriptLoaded]);

    const createMarker = (position) => {
        if (markerRef.current) {
        markerRef.current.setMap(null);
        }
        
        markerRef.current = new window.google.maps.Marker({
            position,
            map: mapInstanceRef.current,
            draggable: true
        });
        
        markerRef.current.addListener('dragend', (e) => {
            const position = markerRef.current.getPosition();
            onLocationSelect({
                lat: position.lat(),
                lng: position.lng()
            });
        });
    };

    const initializeMap = () => {
        if (!window.google || !window.google.maps) return;
        
        const defaultPosition = initialPosition || { lat: -6.226228, lng: 106.846130 };
        
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
            center: defaultPosition,
            zoom: 14,
            mapId: "DEMO_MAP_ID"
        });

        mapInstanceRef.current.addListener('click', (e) => {
            const { latLng } = e;
            const lat = latLng.lat();
            const lng = latLng.lng();
            
            createMarker({ lat, lng });
            onLocationSelect({ lat, lng });
        });

        if (initialPosition) {
            createMarker(defaultPosition);
        }
    };

    return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
}