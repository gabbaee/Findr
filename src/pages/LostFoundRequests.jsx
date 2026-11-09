import { useMemo, useState } from "react";
import {
  Clock3,
  CircleCheck,
  PackageCheck,
  CircleX,
  Search,
  ExternalLink
} from "lucide-react";
import LostFoundHeader from "../components/LostFoundHeader";
import "../styles/lost-found-pages.css";

const initialRequests = [
  {
    id: 1,
    claimant: "Maria Santos",
    email: "maria.santos@usc.edu.ph",
    item: "USC Card & Leather Wallet",
    category: "Personal IDs",
    location: "Basketball Court",
    foundDate: "Oct 24, 2026",
    time: "10m ago",
    status: "Pending",
    note: "Ownership claim",
    image: "wallet.jpg"
  },
  {
    id: 2,
    claimant: "Daniel Lim",
    email: "daniel.lim@usc.edu.ph",
    item: "Hydro Flask (Yellow)",
    category: "Daily Essentials",
    location: "Basketball Court",
    foundDate: "Oct 23, 2026",
    time: "45m ago",
    status: "Pending",
    note: "Ownership claim",
    image: "yellow-flask.jpg"
  },
  {
    id: 3,
    claimant: "Andrea Cruz",
    email: "andrea.cruz@usc.edu.ph",
    item: "AirPods Pro Gen 2",
    category: "Electronics",
    location: "Library",
    foundDate: "Oct 25, 2026",
    time: "2h ago",
    status: "Ready for return",
    note: "Ownership verified",
    image: "airpods.jpg"
  },
  {
    id: 4,
    claimant: "Joshua Tan",
    email: "joshua.tan@usc.edu.ph",
    item: "Red Cap",
    category: "Accessories",
    location: "Main Entrance",
    foundDate: "Oct 26, 2026",
    time: "Yesterday",
    status: "Returned",
    note: "Handover confirmed",
    image: "red-cap.jpg"
  },
  {
    id: 5,
    claimant: "Sofia Reyes",
    email: "sofia.reyes@usc.edu.ph",
    item: "USC Card & Leather Wallet",
    category: "Personal IDs",
    location: "Basketball Court",
    foundDate: "Oct 24, 2026",
    time: "Yesterday",
    status: "Declined",
    note: "Details did not match",
    image: "wallet.jpg"
  }
];

const statuses = ["All requests", "Pending", "Ready for return", "Returned", "Declined"];

export default function LostFoundRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedId, setSelectedId] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All requests");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const counts = useMemo(() => {
    return statuses.reduce((result, status) => {
      result[status] = status === "All requests"
        ? requests.length
        : requests.filter((request) => request.status === status).length;
      return result;
    }, {});
  }, [requests]);

  const filtered = requests
    .filter((request) => {
      const matchesStatus = statusFilter === "All requests" ||
        request.status === statusFilter;
      const matchesSearch = `${request.claimant} ${request.item}`
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => sort === "newest" ? a.id - b.id : b.id - a.id);

  const selected = filtered.find((request) => request.id === selectedId) || filtered[0];

  const updateStatus = (status) => {
    if (!selected) return;

    setRequests((previous) =>
      previous.map((request) =>
        request.id === selected.id ? { ...request, status } : request
      )
    );
  };

  const summary = [
    { status: "Pending", subtitle: "Check ownership details", icon: Clock3 },
    { status: "Ready for return", subtitle: "Arrange a safe handover", icon: CircleCheck },
    { status: "Returned", subtitle: "Back with their owner", icon: PackageCheck },
    { status: "Declined", subtitle: "Details did not match", icon: CircleX }
  ];

  return (
    <main className="lf-page">
      <LostFoundHeader />

      <div className="lf-section-heading">
        <div>
          <h2>View Requests</h2>
          <p>Review claims on your found-item posts and help belongings get back to their owners.</p>
        </div>
      </div>

      <div className="lf-summary-grid">
        {summary.map(({ status, subtitle, icon: Icon }) => (
          <div className="lf-summary-card" key={status}>
            <span className="lf-summary-icon"><Icon size={19} /></span>
            <div>
              <strong>{counts[status]}</strong>
              <span>{status}</span>
              <small>{subtitle}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="lf-requests-toolbar">
        <div className="lf-request-filters">
          {statuses.map((status) => (
            <button
              type="button"
              key={status}
              className={statusFilter === status ? "active" : ""}
              onClick={() => setStatusFilter(status)}
            >
              {status} ({counts[status]})
            </button>
          ))}
        </div>

        <div className="lf-request-search-tools">
          <div className="lf-search">
            <Search size={15} />
            <input
              type="search"
              placeholder="Search names or items..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      <div className="lf-requests-layout">
        <div className="lf-request-list">
          {filtered.map((request) => (
            <button
              type="button"
              key={request.id}
              className={`lf-request-card ${selected?.id === request.id ? "selected" : ""}`}
              onClick={() => setSelectedId(request.id)}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/${request.image}`}
                alt={request.item}
              />

              <div className="lf-request-card-content">
                <div className="lf-request-card-top">
                  <strong>{request.claimant}</strong>
                  <span className={`lf-status ${request.status.toLowerCase().replaceAll(" ", "-")}`}>
                    {request.status}
                  </span>
                </div>

                <h3>{request.item}</h3>
                <p>{request.time} · {request.note}</p>
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="lf-empty">No matching requests.</div>
          )}

          <div className="lf-request-list-footer">
            Showing {filtered.length} of {requests.length} requests
            <span>For your found-item posts only</span>
          </div>
        </div>

        <section className="lf-request-details">
          <div className="lf-request-details-header">
            <h3>Request details</h3>
            {selected && (
              <span className={`lf-status ${selected.status.toLowerCase().replaceAll(" ", "-")}`}>
                {selected.status}
              </span>
            )}
          </div>

          {selected ? (
            <div className="lf-request-details-body">
              <div className="lf-request-item">
                <img
                  src={`${import.meta.env.BASE_URL}images/${selected.image}`}
                  alt={selected.item}
                />

                <div>
                  <span className="lf-item-category">
                    FOUND · {selected.category}
                  </span>
                  <h3>{selected.item}</h3>
                  <p>{selected.location} · Found {selected.foundDate}</p>
                  <span className="lf-view-post">
                    View post <ExternalLink size={12} />
                  </span>
                </div>
              </div>

              <div className="lf-request-claimant">
                <span className="lf-detail-label">ABOUT THE CLAIMANT</span>

                <div className="lf-claimant-row">
                  <span className="lf-avatar">
                    {selected.claimant.split(" ").map((part) => part[0]).join("")}
                  </span>

                  <div>
                    <strong>{selected.claimant}</strong>
                    <p>{selected.email}</p>
                  </div>

                  <span className="lf-student-label">USC student</span>
                </div>
              </div>

              {selected.status === "Pending" && (
                <div className="lf-request-actions">
                  <button
                    type="button"
                    className="lf-decline"
                    onClick={() => updateStatus("Declined")}
                  >
                    Decline
                  </button>

                  <button
                    type="button"
                    className="lf-primary-button"
                    onClick={() => updateStatus("Ready for return")}
                  >
                    <CircleCheck size={16} />
                    Approve return
                  </button>
                </div>
              )}

              {selected.status === "Ready for return" && (
                <div className="lf-request-actions">
                  <button
                    type="button"
                    className="lf-primary-button"
                    onClick={() => updateStatus("Returned")}
                  >
                    <PackageCheck size={16} />
                    Mark as returned
                  </button>
                </div>
              )}

              <p className="lf-request-help">
                Approve only when the details match. Then arrange a public campus
                handover and mark the item Returned after it reaches its owner.
              </p>
            </div>
          ) : (
            <p className="lf-empty">Select a request to view its details.</p>
          )}
        </section>
      </div>
    </main>
  );
}
