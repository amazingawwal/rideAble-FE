import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

interface MapProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
}

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "16px",
};

const defaultCenter = { lat: 40.7128, lng: -74.006 }; // NYC fallback

export default function GoogleMapView({
  center = defaultCenter,
  zoom = 13,
}: MapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  if (!isLoaded) return <div className="flex items-center justify-center h-full">Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
    >
      <Marker position={center} />
      {/* <Marker
  position={center}
  icon={{
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: "#4285F4",
    fillOpacity: 1,
    strokeWeight: 2,
    strokeColor: "white",
  }}
/> */}



    </GoogleMap>
    
  );
}
