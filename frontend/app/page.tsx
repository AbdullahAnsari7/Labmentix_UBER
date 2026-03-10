"use client";
import { useState } from "react";

export default function Dashboard() {

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [rides, setRides] = useState([]);

  const requestRide = async () => {

    const res = await fetch("/api/rides/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pickupAddress: pickup,
        dropAddress: drop,
        pickupLat: 0,
        pickupLng: 0,
        dropLat: 0,
        dropLng: 0,
        fare: 300
      })
    });

    const data = await res.json();

    setRides([...rides, data.ride]);

    setPickup("");
    setDrop("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8 text-center">
        🚖 Labmentix Ride Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">

        <h2 className="text-xl font-semibold mb-4">
          Request a Ride
        </h2>

        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e)=>setPickup(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Drop Location"
          value={drop}
          onChange={(e)=>setDrop(e.target.value)}
        />

        <button
          onClick={requestRide}
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-800"
        >
          Request Ride
        </button>

      </div>

      <div className="max-w-xl mx-auto mt-10">

        <h2 className="text-xl font-semibold mb-4">
          Your Rides
        </h2>

        {rides.length === 0 && (
          <p className="text-gray-500">No rides yet</p>
        )}

        {rides.map((ride,index)=>(
          <div key={index} className="bg-white p-4 rounded shadow mb-3">

            <p><b>Pickup:</b> {ride.pickupAddress}</p>
            <p><b>Drop:</b> {ride.dropAddress}</p>
            <p><b>Status:</b> {ride.status}</p>
            <p><b>Fare:</b> ₹{ride.fare}</p>

          </div>
        ))}

      </div>

    </div>
  );
}