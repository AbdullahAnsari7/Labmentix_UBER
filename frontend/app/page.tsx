"use client";
import { useState } from "react";

export default function Home() {

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [rides, setRides] = useState([]);

  const requestRide = async () => {

    const res = await fetch("http://localhost:3001/rides/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    <div style={{fontFamily:"Arial", padding:"40px"}}>

      <h1>🚖 Labmentix Ride Dashboard</h1>

      <div style={{marginTop:"30px"}}>

        <h2>Request Ride</h2>

        <input
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e)=>setPickup(e.target.value)}
          style={{padding:"10px",marginRight:"10px"}}
        />

        <input
          placeholder="Drop Location"
          value={drop}
          onChange={(e)=>setDrop(e.target.value)}
          style={{padding:"10px",marginRight:"10px"}}
        />

        <button
          onClick={requestRide}
          style={{padding:"10px",background:"black",color:"white"}}
        >
          Request Ride
        </button>

      </div>

      <div style={{marginTop:"40px"}}>

        <h2>Your Rides</h2>

        {rides.map((ride,i)=>(
          <div key={i} style={{
            border:"1px solid #ddd",
            padding:"15px",
            marginTop:"10px"
          }}>

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