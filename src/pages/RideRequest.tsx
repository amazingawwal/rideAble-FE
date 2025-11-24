// import { apiRequest } from "../utils/api/api";
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import InputField from "../components/Input";
import Button from "../components/Button";
import Spinner from "../utils/Spinner";
import { apiRideRequest } from "../utils/api/rideRequestAPI";

const containerStyle = {
  width: "100%",
  height: "260px",
  borderRadius: "12px",
};

export default function RequestRide() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [pickupAC, setPickupAC] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [destinationAC, setDestinationAC] =
    useState<google.maps.places.Autocomplete | null>(null);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);

  const [selected, setSelected] = useState<string[]>([]);

  const toggleItem = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const defaultCenter = { lat: 9.0579, lng: 7.4951 };

  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        setUserLocation(defaultCenter);
      },
    );
  }, []);

  const generateCoord = async (id: string | undefined) => {
    const geocoder = new google.maps.Geocoder();

    return await geocoder.geocode({ placeId: id }, (results, status) => {
      if (status === "OK") {
        const location = results![0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();

        const orsCoordinates = [lng, lat];

        console.log("Ready for ORS:", orsCoordinates);
      } else {
        console.log("No ORS");
      }
    });
  };

  /** Generate the route + compute distance + duration */
  const generateRoute = async () => {
    if (!pickup || !destination) return;

    const service = new google.maps.DirectionsService();

    return await service.route(
      {
        origin: pickup,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
          console.log(result);
          const leg = result.routes[0].legs[0];
          //   const pickup_id = result.geocoded_waypoints![0].place_id
          //   const destination_id = result.geocoded_waypoints![1].place_id

          setDistance(leg.distance?.text || null);
          setDuration(leg.duration?.text || null);

          {
            //   generateCoord(pickup_id),
            //   generateCoord(destination_id)
          }
        }
      },
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickup || !destination) {
      alert("Please fill pickup and destination.");
      return;
    }
    const generatedRoute = await generateRoute();
    const A_lat = (
      await generateCoord(generatedRoute?.geocoded_waypoints![0].place_id)
    ).results[0].geometry.location.lat();
    const A_lng = (
      await generateCoord(generatedRoute?.geocoded_waypoints![0].place_id)
    ).results[0].geometry.location.lng();
    const B_lat = (
      await generateCoord(generatedRoute?.geocoded_waypoints![1].place_id)
    ).results[0].geometry.location.lat();
    const B_lng = (
      await generateCoord(generatedRoute?.geocoded_waypoints![1].place_id)
    ).results[0].geometry.location.lng();

    const pickupCoord = [A_lng, A_lat];
    const destinationCoord = [B_lng, B_lat];

    console.log({
      pickup,
      destination,
      accessibility: selected,
      route: generatedRoute,
      pickupCoord,
      destinationCoord,
    });

    const payload = {
      pickup: generateCoord(generatedRoute?.geocoded_waypoints![0].place_id),
      destination: generateCoord(
        generatedRoute?.geocoded_waypoints![1].place_id,
      ),
      accessibilityFeatures: selected,
      pickupCoord,
      destinationCoord,
    };

    await apiRideRequest("/rides/request", "POST", payload);
  };

  //   const findRide = ()=>{

  //   }

  if (!isLoaded)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold text-center">Where to?</h1>

        <form onSubmit={onSubmit} className="space-y-5 mt-8">
          {/* Pickup Input */}
          <Autocomplete
            onLoad={setPickupAC}
            onPlaceChanged={() => {
              const place = pickupAC?.getPlace();
              setPickup(place?.formatted_address || "");
            }}
          >
            <InputField
              placeholder="Enter pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </Autocomplete>

          {/* Destination Input */}
          <Autocomplete
            onLoad={setDestinationAC}
            onPlaceChanged={() => {
              const place = destinationAC?.getPlace();
              setDestination(place?.formatted_address || "");
            }}
          >
            <InputField
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </Autocomplete>

          {/* Map */}
          <div className="rounded-xl overflow-hidden">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={userLocation || undefined}
              zoom={12}
            >
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </div>
          <h3 className="font-semibold mb-2">Accessibility Options</h3>
          <div className="relative">
            <div className="border rounded-lg px-4 py-2 cursor-pointer bg-white">
              <span className="text-gray-500">
                {selected.length === 0 ? "Select accessibility features" : ""}
              </span>

              <div className="flex flex-wrap gap-2">
                {selected.map((item) => (
                  <span
                    key={item}
                    className="bg-sky-100 text-sky-700 px-2 py-1 rounded-md flex items-center gap-1"
                  >
                    {item.replace(/_/g, " ")}
                    <button onClick={() => toggleItem(item)}>✕</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="border flex flex-wrap justify-between rounded-lg mt-1 bg-white shadow p-2">
              {[
                "Ramps_and_lifts",
                "Wide_door_openings",
                "Lowered_floors",
                "Swivel_seats",
                "Wheelchair_restraints",
                "Spacious_interior",
                "Customizable_seating",
                "Others",
              ].map((feature) => (
                <div
                  key={feature}
                  className="px-2  py-1 hover:bg-sky-200 rounded-lg cursor-pointer"
                  onClick={() => toggleItem(feature)}
                >
                  {feature.replace(/_/g, " ")}
                </div>
              ))}
            </div>
          </div>

          {/* ⭐ Distance + Duration Summary Card */}
          {distance && duration && (
            <div className="p-4 bg-gray-100 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-2">Trip Summary</h3>

              <div className="flex justify-between text-gray-700">
                <p>Distance:</p>
                <p className="font-medium">{distance}</p>
              </div>

              <div className="flex justify-between text-gray-700">
                <p>Estimated Time:</p>
                <p className="font-medium">{duration}</p>
              </div>
            </div>
          )}

          {distance && duration ? (
            <div className="flex justify-between gap-4 pt-4">
              <button
                type="button"
                className="w-1/2 border py-3 rounded-xl hover:bg-red-400 font-medium"
              >
                Cancel
              </button>

              <Button type="submit" variant="outline">
                Find a ride
              </Button>
            </div>
          ) : (
            <Button type="submit" size="sm" variant="outline">
              Show Route
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

//   <div>
//     <label className="block font-medium mb-2">
//       Accessibility Features
//     </label>
//     <div className="grid grid-cols-2 gap-2 text-gray-700">
//       {[
//         "Ramps_and_lifts",
//         "Wide_door_openings",
//         "Lowered_floors",
//         "Swivel_seats",
//         "Wheelchair_restraints",
//         "Spacious_interior",
//         "Customizable_seating",
//         "Others",
//       ].map((feature) => (
//         <label
//           key={feature}
//           className="flex items-center gap-2"
//         >
//           <input
//             type="checkbox"
//             checked={vehicle.accessibilityFeature.includes(
//               feature,
//             )}
//             onChange={() =>
//               handleFeatureToggle(index, feature)
//             }
//           />
//           {feature}
//         </label>
//       ))}
//     </div>
//   </div>
