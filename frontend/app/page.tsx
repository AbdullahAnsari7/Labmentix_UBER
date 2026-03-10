"use client";

import { useMemo, useState } from "react";

type RideStatus = "REQUESTED" | "ACCEPTED" | "IN_PROGRESS" | "COMPLETED";

type Ride = {
  id: number;
  pickupAddress: string;
  dropAddress: string;
  status: RideStatus;
  fare: number;
  date: string;
};

export default function Page() {
  const userName = "Abdullah";

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [fare, setFare] = useState("300");
  const [activeTab, setActiveTab] = useState<"all" | RideStatus>("all");

  const [rides, setRides] = useState<Ride[]>([
    {
      id: 1,
      pickupAddress: "Bandra West, Mumbai",
      dropAddress: "Andheri East, Mumbai",
      status: "COMPLETED",
      fare: 350,
      date: "10 Mar 2026",
    },
    {
      id: 2,
      pickupAddress: "Kurla, Mumbai",
      dropAddress: "Powai, Mumbai",
      status: "IN_PROGRESS",
      fare: 280,
      date: "11 Mar 2026",
    },
    {
      id: 3,
      pickupAddress: "Dadar, Mumbai",
      dropAddress: "Colaba, Mumbai",
      status: "REQUESTED",
      fare: 420,
      date: "11 Mar 2026",
    },
  ]);

  const filteredRides = useMemo(() => {
    if (activeTab === "all") return rides;
    return rides.filter((ride) => ride.status === activeTab);
  }, [rides, activeTab]);

  const totalRides = rides.length;
  const completedRides = rides.filter((r) => r.status === "COMPLETED").length;
  const activeRides = rides.filter(
    (r) => r.status === "REQUESTED" || r.status === "ACCEPTED" || r.status === "IN_PROGRESS"
  ).length;

  const totalSpent = rides.reduce((sum, ride) => sum + ride.fare, 0);

  const requestRide = () => {
    if (!pickup.trim() || !drop.trim()) {
      alert("Please enter pickup and drop locations.");
      return;
    }

    const newRide: Ride = {
      id: Date.now(),
      pickupAddress: pickup,
      dropAddress: drop,
      status: "REQUESTED",
      fare: Number(fare) || 300,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setRides((prev) => [newRide, ...prev]);
    setPickup("");
    setDrop("");
    setFare("300");
    setActiveTab("all");
  };

  const getStatusColor = (status: RideStatus) => {
    switch (status) {
      case "REQUESTED":
        return "#f59e0b";
      case "ACCEPTED":
        return "#2563eb";
      case "IN_PROGRESS":
        return "#7c3aed";
      case "COMPLETED":
        return "#16a34a";
      default:
        return "#6b7280";
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
        fontFamily: "Arial, sans-serif",
        padding: "32px 20px",
        color: "#111827"
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
            color: "white",
            borderRadius: "20px",
            padding: "28px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
            marginBottom: "24px",
          }}
        >
          <p style={{ margin: 0, opacity: 0.85 }}>Labmentix Ride Platform</p>
          <h1 style={{ margin: "10px 0 8px 0", fontSize: "34px" }}>
            Welcome back, {userName} 👋
          </h1>
          <p style={{ margin: 0, opacity: 0.9 }}>
            Book rides, track history, and manage your trips from one dashboard.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <StatCard title="Total Rides" value={String(totalRides)} />
          <StatCard title="Active Rides" value={String(activeRides)} />
          <StatCard title="Completed" value={String(completedRides)} />
          <StatCard title="Total Spent" value={`₹${totalSpent}`} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <section
            style={{
              background: "white",
              borderRadius: "18px",
              padding: "22px",
              boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Request a Ride</h2>
            <p style={{ color: "#6b7280", marginTop: "-4px", marginBottom: "20px" }}>
              Enter your ride details below.
            </p>

            <label style={labelStyle}>Pickup Location</label>
            <input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="e.g. Bandra West, Mumbai"
              style={inputStyle}
            />

            <label style={labelStyle}>Drop Location</label>
            <input
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              placeholder="e.g. Andheri East, Mumbai"
              style={inputStyle}
            />

            <label style={labelStyle}>Estimated Fare</label>
            <input
              value={fare}
              onChange={(e) => setFare(e.target.value)}
              placeholder="300"
              style={inputStyle}
            />

            <button onClick={requestRide} style={buttonStyle}>
              Request Ride
            </button>
          </section>

          <section
            style={{
              background: "white",
              borderRadius: "18px",
              padding: "22px",
              boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Quick Profile</h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginTop: "16px",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "#111827",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  fontWeight: 700,
                }}
              >
                A
              </div>
              <div>
                <h3 style={{ margin: 0 }}>{userName}</h3>
                <p style={{ margin: "6px 0 0 0", color: "#6b7280" }}>
                  Rider Dashboard
                </p>
              </div>
            </div>

            <div
              style={{
                marginTop: "22px",
                background: "#f9fafb",
                borderRadius: "14px",
                padding: "16px",
                border: "1px solid #e5e7eb",
              }}
            >
              <p style={{ margin: "0 0 8px 0" }}><b>Status:</b> Active User</p>
              <p style={{ margin: "0 0 8px 0" }}><b>Preferred City:</b> Mumbai</p>
              <p style={{ margin: 0 }}><b>Platform:</b> Labmentix Uber MVP</p>
            </div>
          </section>
        </div>

        <section
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "22px",
            boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
            border: "1px solid #e5e7eb",
            marginTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "18px",
            }}
          >
            <h2 style={{ margin: 0 }}>Ride History</h2>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["all", "REQUESTED", "ACCEPTED", "IN_PROGRESS", "COMPLETED"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as "all" | RideStatus)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "999px",
                    border: activeTab === tab ? "1px solid #111827" : "1px solid #d1d5db",
                    background: activeTab === tab ? "#111827" : "white",
                    color: activeTab === tab ? "white" : "#111827",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {filteredRides.length === 0 ? (
            <p style={{ color: "#6b7280" }}>No rides found for this filter.</p>
          ) : (
            filteredRides.map((ride) => (
              <div
                key={ride.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "14px",
                  padding: "16px",
                  marginBottom: "14px",
                  background: "#fcfcfd",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <p style={{ margin: "0 0 8px 0" }}><b>Pickup:</b> {ride.pickupAddress}</p>
                    <p style={{ margin: "0 0 8px 0" }}><b>Drop:</b> {ride.dropAddress}</p>
                    <p style={{ margin: 0 }}><b>Date:</b> {ride.date}</p>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: "0 0 8px 0", fontWeight: 700 }}>₹{ride.fare}</p>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        background: `${getStatusColor(ride.status)}20`,
                        color: getStatusColor(ride.status),
                        fontWeight: 700,
                        fontSize: "12px",
                      }}
                    >
                      {ride.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 8px 20px rgba(15,23,42,0.08)",
        border: "1px solid #e5e7eb",
      }}
    >
      <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>{title}</p>
      <h3 style={{ margin: "10px 0 0 0", fontSize: "28px" }}>{value}</h3>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "8px",
  fontWeight: 600,
  marginTop: "12px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  outline: "none",
  marginBottom: "4px",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  marginTop: "18px",
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#111827",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};