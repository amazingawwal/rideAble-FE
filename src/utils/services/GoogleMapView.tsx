import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

interface MapProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  children?: React.ReactNode;
}

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "16px",
};

const defaultCenter = { lat: 9.0579, lng: 7.4951 };

export default function GoogleMapView({
  center = defaultCenter,
  zoom = 13,
}: MapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center h-full">
        Loading map...
      </div>
    );

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      <Marker position={center} />
    </GoogleMap>
  );
}
