import InputField from "../components/Input";
import Button from "../components/Button";
import Spinner from "../utils/Spinner";

const containerStyle = {
  width: "100%",
  height: "260px",
  borderRadius: "12px",
};

export function RequestRide1() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [accessible, setAccessible] = useState(false);

  const [pickupAC, setPickupAC] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [destinationAC, setDestinationAC] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickup || !destination) {
      alert("Please fill pickup and destination.");
      return;
    }

    console.log({
      pickup,
      destination,
      accessibleVehicle: accessible,
    });
  };

  if (!isLoaded)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center">Where to?</h1>
        <p className="text-center text-gray-500">
          Request a ride with the accessibility you need.
        </p>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5 mt-8">
          {/* Pickup Input */}
          <div>
            <Autocomplete
              onLoad={setPickupAC}
              onPlaceChanged={() => {
                if (pickupAC) {
                  setPickup(pickupAC.getPlace()?.formatted_address || "");
                }
              }}
            >
              <input
                className="w-full px-4 py-3 border rounded-xl bg-gray-100 focus:ring-sky-500"
                placeholder="Enter pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
            </Autocomplete>
          </div>

          {/* Destination Input */}
          <div>
            <Autocomplete
              onLoad={setDestinationAC}
              onPlaceChanged={() => {
                if (destinationAC) {
                  setDestination(
                    destinationAC.getPlace()?.formatted_address || "",
                  );
                }
              }}
            >
              <input
                className="w-full px-4 py-3 border rounded-xl bg-gray-100 focus:ring-sky-500"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Autocomplete>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-xl">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={defaultCenter}
              zoom={13}
            />
          </div>

          {/* Accessibility Options */}
          <div className="pt-4">
            <h3 className="font-semibold mb-2">Accessibility Options</h3>

            <label className="flex items-center justify-between p-4 border rounded-xl bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="text-sky-600 text-xl">🦽</span>
                <span>Wheelchair accessible vehicle</span>
              </div>
              <input
                type="checkbox"
                checked={accessible}
                onChange={() => setAccessible(!accessible)}
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4 pt-4">
            <button
              type="button"
              className="w-1/2 border py-3 rounded-xl hover:bg-gray-100 font-medium"
            >
              Cancel
            </button>

            <Button type="submit" variant="primary">
              Find a Ride
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

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

  /** Generate the route + compute distance + duration */
  const generateRoute = () => {
    if (!pickup || !destination) return;

    const service = new google.maps.DirectionsService();

    service.route(
      {
        origin: pickup,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);

          const leg = result.routes[0].legs[0];

          setDistance(leg.distance?.text || null);
          setDuration(leg.duration?.text || null);
        }
      },
    );
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickup || !destination) {
      alert("Please fill pickup and destination.");
      return;
    }
    generateRoute();
  };

  if (!isLoaded) return <p>Loading map…</p>;

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
              mapContainerStyle={{ width: "100%", height: "260px" }}
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
