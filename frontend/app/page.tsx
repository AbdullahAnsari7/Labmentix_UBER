"use client";

import { useState } from "react";

type Ride = {
  pickupAddress: string;
  dropAddress: string;
  status: string;
  fare: number;
};

export default function Page() {
  const [pickup, setPickup] = useState<string>("");
  const [drop, setDrop] = useState<string>("");
  const [rides, setRides] = useState<Ride[]>([
    {
      pickupAddress: "Bandra West, Mumbai",
      dropAddress: "Andheri East, Mumbai",
      status: "COMPLETED",
      fare: 350,
    },
  ]);

  const requestRide = () => {
    if (!pickup || !drop) return;

    const newRide: Ride = {
      pickupAddress: pickup,
      dropAddress: drop,
      status: "REQUESTED",
      fare: 300,
    };

    setRides((prev) => [newRide, ...prev]);
    setPickup("");
    setDrop("");
  };

  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>🚖 Labmentix Ride Dashboard</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Uber-style car booking platform prototype
      </p>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        }}
      >
        <h2 style={{ marginBottom: "16px" }}>Request a Ride</h2>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <input
            placeholder="Pickup Location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            style={{
              flex: 1,
              minWidth: "220px",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />

          <input
            placeholder="Drop Location"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            style={{
              flex: 1,
              minWidth: "220px",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />

          <button
            onClick={requestRide}
            style={{
              padding: "12px 20px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Request Ride
          </button>
        </div>
      </div>

      <div>
        <h2 style={{ marginBottom: "16px" }}>Ride History</h2>

        {rides.length === 0 ? (
          <p>No rides yet</p>
        ) : (
          rides.map((ride, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "18px",
                marginBottom: "14px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              }}
            >
              <p><b>Pickup:</b> {ride.pickupAddress}</p>
              <p><b>Drop:</b> {ride.dropAddress}</p>
              <p><b>Status:</b> {ride.status}</p>
              <p><b>Fare:</b> ₹{ride.fare}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}