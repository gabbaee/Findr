import { useState } from "react";
import { Search, MapPin, CalendarDays } from "lucide-react";
import LostFoundHeader from "../components/LostFoundHeader";
import "../styles/lost-found-pages.css";
import { imagePath } from "../utils/imagePath";

const items = [
  {
    id: 1,
    title: "Hydro Flask (Yellow)",
    type: "Found",
    category: "Daily Essentials",
    campus: "Talamban Campus",
    location: "Basketball Court",
    date: "Oct 23, 2026",
    image: imagePath("yellow-flask.jpg")
  },
  {
    id: 2,
    title: "USC Card & Leather Wallet",
    type: "Found",
    category: "Personal IDs",
    campus: "Talamban Campus",
    location: "Basketball Court",
    date: "Oct 24, 2026",
    image: imagePath("wallet.jpg")
  },
  {
    id: 3,
    title: "AirPods Pro Gen 2",
    type: "Lost",
    category: "Electronics",
    campus: "Downtown Campus",
    location: "Library",
    date: "Oct 25, 2026",
    image: imagePath("airpods.jpg")
  },
  {
    id: 4,
    title: "Red Cap",
    type: "Found",
    category: "Accessories",
    campus: "Talamban Campus",
    location: "Main Entrance",
    date: "Oct 26, 2026",
    image: imagePath("red-cap.jpg")
  }
];

export default function LostAndFound() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = items.filter((item) => {
    const matchesType = filter === "All" || item.type === filter;
    const matchesSearch = [
      item.title,
      item.category,
      item.campus,
      item.location
    ].some((value) => value.toLowerCase().includes(search.toLowerCase()));

    return matchesType && matchesSearch;
  });

  return (
    <main className="lf-page">
      <LostFoundHeader />

      <div className="lf-section-heading">
        <div>
          <h2>Lost & Found Items</h2>
          <p>Browse items reported by the Carolinian community.</p>
        </div>
      </div>

      <div className="lf-toolbar">
        <div className="lf-filter-buttons">
          {["All", "Lost", "Found"].map((type) => (
            <button
              key={type}
              type="button"
              className={filter === type ? "active" : ""}
              onClick={() => setFilter(type)}
            >
              {type === "All" ? "All Items" : type}
            </button>
          ))}
        </div>

        <div className="lf-search">
          <Search size={16} />
          <input
            type="search"
            placeholder="Search items..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="lf-items-grid">
        {filtered.map((item) => (
          <article className="lf-item-card" key={item.id}>
            <div className="lf-item-image">
              <img
                src={item.image}
                alt={item.title}
              />
              <span className={`lf-item-badge ${item.type.toLowerCase()}`}>
                {item.type}
              </span>
            </div>

            <div className="lf-item-info">
              <span className="lf-item-category">{item.category}</span>
              <h3>{item.title}</h3>
              <p><MapPin size={14} /> {item.location}, {item.campus}</p>
              <p><CalendarDays size={14} /> {item.date}</p>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="lf-empty">No matching items found.</p>
      )}
    </main>
  );
}
