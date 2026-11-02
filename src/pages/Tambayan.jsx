
import { useState } from "react";
import { Clock3 } from "lucide-react";

const rooms = [
  {
    id: 1,
    building: "Lawrence Bunzel Building",
    code: "LB101",
    buildingCode: "LB",
    vacantFrom: "10:00 AM",
    vacantUntil: "12:30 PM",
    image: "/images/lawrence-bunzel.jpg"
  },
  {
    id: 2,
    building: "Michael Richartz Building",
    code: "MR203",
    buildingCode: "MR",
    vacantFrom: "11:30 AM",
    vacantUntil: "02:00 PM",
    image: "/images/michael-richartz.jpg"
  },
  {
    id: 3,
    building: "Robert Hoeppener Building",
    code: "RH305",
    buildingCode: "RH",
    vacantFrom: "09:00 AM",
    vacantUntil: "12:00 PM",
    image: "/images/robert-hoeppener.jpg"
  },
  {
    id: 4,
    building: "SAFAD Building",
    code: "AF102",
    buildingCode: "AF",
    vacantFrom: "01:00 PM",
    vacantUntil: "03:30 PM",
    image: "/images/safad-building.jpg"
  },
  {
    id: 5,
    building: "Lawrence Bunzel Building",
    code: "LB204",
    buildingCode: "LB",
    vacantFrom: "10:30 AM",
    vacantUntil: "01:00 PM",
    image: "/images/lawrence-bunzel.jpg"
  },
  {
    id: 6,
    building: "Michael Richartz Building",
    code: "MR105",
    buildingCode: "MR",
    vacantFrom: "02:00 PM",
    vacantUntil: "04:30 PM",
    image: "/images/michael-richartz.jpg"
  }
];

const buildings = [
  { code: "All", label: "All Buildings" },
  { code: "LB", label: "LB (Lawrence Bunzel)" },
  { code: "MR", label: "MR (Michael Richartz)" },
  { code: "RH", label: "RH (Robert Hoeppener)" },
  { code: "AF", label: "AF (SAFAD Building)" }
];

function RoomCard({ room }) {
  return (
    <article className="listing-card">
      <div className="listing-image">
        <img src={room.image} alt={room.building} />
      </div>

      <div className="listing-info">
        <span className="listing-category">
          {room.building}
        </span>

        <h3>{room.code}</h3>

        <p className="listing-detail">
          <Clock3 size={14} />
          Vacant: {room.vacantFrom} – {room.vacantUntil}
        </p>
      </div>
    </article>
  );
}

export default function Tambayan() {
  const [selectedBuilding, setSelectedBuilding] = useState("All");

  const filteredRooms = rooms.filter(
    (room) =>
      selectedBuilding === "All" ||
      room.buildingCode === selectedBuilding
  );

  return (
    <main className="listing-page tambayan-page">
      <section className="listing-hero tambayan-hero">
        <h1>
          Find a vacant room to <span>Tambay.</span>
        </h1>

        <h2>
          Available rooms for September 19, Tuesday, 2:08pm
        </h2>
      </section>

      <section className="listing-section">
        <div className="listing-section-header">
          <h2>Available Rooms Now</h2>

          <div className="listing-filters">
            {buildings.map((building) => (
              <button
                key={building.code}
                type="button"
                className={
                  selectedBuilding === building.code
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setSelectedBuilding(building.code)
                }
              >
                {building.label}
              </button>
            ))}
          </div>
        </div>

        <div className="listing-grid three-columns">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="listing-empty">
            No available rooms found in this building.
          </div>
        )}
      </section>
    </main>
  );
}
