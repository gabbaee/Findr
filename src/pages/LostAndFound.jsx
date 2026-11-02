
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, CalendarDays } from "lucide-react";

const reports = [
  {
    id: 1,
    name: 'MacBook Pro 14"',
    category: "Electronics",
    status: "Lost",
    location: "MR301",
    campus: "Downtown Campus",
    date: "Oct 24, 2026",
    image: "/images/lost-macbook.jpg"
  },
  {
    id: 2,
    name: "USC Card & Leather Wallet",
    category: "Personal IDs",
    status: "Found",
    location: "Basketball Court",
    campus: "Talamban Campus",
    date: "Oct 24, 2026",
    image: "/images/found-wallet.jpg"
  },
  {
    id: 3,
    name: "Sony WH-1000XM4",
    category: "Audio",
    status: "Lost",
    location: "Bunzel Lobby",
    campus: "Downtown Campus",
    date: "Oct 23, 2026",
    image: "/images/lost-headphones.jpg"
  },
  {
    id: 4,
    name: "Hydro Flask (Yellow)",
    category: "Daily Essentials",
    status: "Found",
    location: "Basketball Court",
    campus: "Talamban Campus",
    date: "Oct 23, 2026",
    image: "/images/found-flask.jpg"
  },
  {
    id: 5,
    name: "Car Keys (Tesla)",
    category: "Keys & Access",
    status: "Lost",
    location: "Bunzel Canteen",
    campus: "Downtown Campus",
    date: "Oct 22, 2026",
    image: "/images/lost-keys.jpg"
  },
  {
    id: 6,
    name: "AirPods Pro Gen 2",
    category: "Audio",
    status: "Found",
    location: "RH102",
    campus: "Talamban Campus",
    date: "Oct 22, 2026",
    image: "/images/found-airpods.jpg"
  },
  {
    id: 7,
    name: "Gold Rimmed Glasses",
    category: "Accessories",
    status: "Lost",
    location: "Soccer Field",
    campus: "Talamban Campus",
    date: "Oct 21, 2026",
    image: "/images/lost-glasses.jpg"
  },
  {
    id: 8,
    name: "Red Cap",
    category: "Apparel",
    status: "Found",
    location: "Bunzel Parking Area",
    campus: "Downtown Campus",
    date: "Oct 21, 2026",
    image: "/images/found-cap.jpg"
  }
];

const filters = ["All Items", "Lost Only", "Found Only"];

function ReportCard({ report }) {
  return (
    <article className="lostfound-card">
      <div className="lostfound-image">
        <img src={report.image} alt={report.name} />

        <span
          className={`lostfound-status ${report.status.toLowerCase()}`}
        >
          <span className="status-dot" />
          {report.status}
        </span>
      </div>

      <div className="lostfound-info">
        <span className="lostfound-category">
          {report.category}
        </span>

        <h3>{report.name}</h3>

        <p>
          <MapPin size={13} />
          {report.location}
        </p>

        <p>
          <CalendarDays size={13} />
          {report.status} {report.date}
        </p>
      </div>
    </article>
  );
}

export default function LostAndFound() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [campus, setCampus] = useState("All Campuses");
  const [activeFilter, setActiveFilter] = useState("All Items");

  const filteredReports = reports.filter((report) => {
    const searchTerm = search.toLowerCase().trim();

    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm) ||
      report.category.toLowerCase().includes(searchTerm) ||
      report.location.toLowerCase().includes(searchTerm);

    const matchesCampus =
      campus === "All Campuses" ||
      report.campus === campus;

    const matchesStatus =
      activeFilter === "All Items" ||
      report.status === activeFilter.replace(" Only", "");

    return matchesSearch && matchesCampus && matchesStatus;
  });

  function handleSearch(e) {
    e.preventDefault();
    setSearch(searchInput);
  }

  return (
    <main className="lostfound-page">
      <div className="lostfound-top-action">
        <Link to="/lost-and-found/post" className="lostfound-post-btn">
          + Post Item
        </Link>
      </div>

      <section className="lostfound-hero">
        <h1>
          Lost something on campus?{" "}
          <span>We'll help you find it.</span>
        </h1>

        <form
          className="lostfound-search"
          onSubmit={handleSearch}
        >
          <Search size={20} className="lostfound-search-icon" />

          <input
            type="text"
            placeholder="Search keys, wallets, phones, water bottles, classes..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <select
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
            aria-label="Filter by campus"
          >
            <option value="All Campuses">All Campuses</option>
            <option value="Talamban Campus">
              Talamban Campus
            </option>
            <option value="Downtown Campus">
              Downtown Campus
            </option>
          </select>

          <button type="submit">Search</button>
        </form>
      </section>

      <section className="lostfound-listings">
        <div className="lostfound-listings-header">
          <div className="lostfound-listing-title">
            <h2>Recent Reports</h2>
            <span>• {filteredReports.length} items displayed</span>
          </div>

          <div className="lostfound-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "selected" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="lostfound-grid">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="lostfound-empty">
            <Search size={28} />
            <h3>No reports found</h3>
            <p>Try another keyword, campus, or status filter.</p>
          </div>
        )}
      </section>
    </main>
  );
}
