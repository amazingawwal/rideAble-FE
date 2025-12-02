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
import type {
  RideRequest,
  RideRequestProps,
  RideResponse,
} from "../assets/types";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const containerStyle = {
  width: "100%",
  height: "260px",
  borderRadius: "12px",
};

export default function RequestRide({ onDriverFound }: RideRequestProps) {
  const [loading, setLoading] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const navigate = useNavigate();

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

  interface CoordResult {
    lat: number;
    lng: number;
    ors: [number, number];
  }

  const generateCoord = (id: string | undefined): Promise<CoordResult> => {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ placeId: id }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const loc = results[0].geometry.location;
          resolve({
            lat: loc.lat(),
            lng: loc.lng(),
            ors: [loc.lng(), loc.lat()],
          });
        } else {
          reject("Failed to geocode placeId " + id);
        }
      });
    });
  };

  const generateRoute = (): Promise<google.maps.DirectionsResult> => {
    return new Promise((resolve, reject) => {
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
            resolve(result);
            if (!pickup.trim() || !destination.trim()) {
              return reject(new Error("Pickup or destination is empty"));
            }
          } else {
            reject("Failed to generate route");
          }
        },
      );
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!pickup || !destination) {
        alert("Please enter pickup and drop off locations");
        setLoading(false);
        return;
      }
      await generateRoute();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err instanceof Error ? err.message : String(err));
      } else {
        toast.error("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const findRide = async () => {
    try {
      if (selected.length === 0) {
        alert("Please select your preferred accessibility options");
        return;
      }

      const route = await generateRoute();

      const pickupId = route.geocoded_waypoints![0].place_id;
      const destId = route.geocoded_waypoints![1].place_id;

      const pickupCoords = await generateCoord(pickupId);
      const destCoords = await generateCoord(destId);

      const payload: RideRequest = {
        accessibilityFeatures: selected,
        pickup: pickupCoords.ors,
        destination: destCoords.ors,
      };

      setLoading(true);
      setLoading(true);
      const data: RideResponse = await apiRideRequest(
        "/rides/request",
        "POST",
        payload,
      );

      onDriverFound?.(data);
      navigate("/pax/ride-request/driver-found");
      toast.success("Ride found");
      console.log(data);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center py-10">
      <div className="absolute top-20 left-1 z-50">
        <BackButton fallback="/dashboard/pax" />
      </div>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold text-center">Where to?</h1>

        <form onSubmit={onSubmit} className="space-y-5 mt-8">
          <Autocomplete
            onLoad={setPickupAC}
            onPlaceChanged={() => {
              const place = pickupAC?.getPlace();
              setPickup(place?.formatted_address || place?.name || "");
            }}
          >
            <InputField
              placeholder="Enter pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </Autocomplete>

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

              <Button onClick={findRide} type="button" variant="outline">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Spinner />
                    <span>Finding your ride...</span>
                  </div>
                ) : (
                  "Find ride"
                )}
              </Button>
            </div>
          ) : (
            <Button type="submit" size="sm" variant="outline">
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner />
                  <span>Routing...</span>
                </div>
              ) : (
                "Show route"
              )}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
