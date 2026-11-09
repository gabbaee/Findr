import { useMemo, useState } from "react";
import {
  Clock3,
  CircleCheck,
  PackageCheck,
  CircleX,
  Search,
  Mail,
  MapPin,
  ExternalLink
} from "lucide-react";
import MarketplaceHeader from "../components/MarketplaceHeader";
import "../styles/marketplace-requests.css";

const initialRequests = [
  {
    id: 1,
    buyer: "Maria Santos",
    email: "maria.santos@usc.edu.ph",
    item: "Organic Chemistry (Wade, 8th Ed)",
    category: "Textbooks",
    condition: "Like New",
    price: 350,
    campus: "Talamban Campus",
    time: "10m ago",
    status: "Pending",
    image: "chemistry.jpg"
  },
  {
    id: 2,
    buyer: "Daniel Lim",
    email: "daniel.lim@usc.edu.ph",
    item: "USC Chemistry Lab Coat (Medium)",
    category: "Supplies",
    condition: "Used",
    price: 120,
    campus: "Talamban Campus",
    time: "45m ago",
    status: "Pending",
    image: "labcoat.jpg"
  },
  {
    id: 3,
    buyer: "Andrea Cruz",
    email: "andrea.cruz@usc.edu.ph",
    item: "TI-84 Plus CE Calculator",
    category: "Electronics",
    condition: "Used",
    price: 750,
    campus: "Downtown Campus",
    time: "2h ago",
    status: "Accepted",
    image: "calculator.jpg"
  },
  {
    id: 4,
    buyer: "Joshua Tan",
    email: "joshua.tan@usc.edu.ph",
    item: "USC Hayden-McNeil Lab Notebook",
    category: "Textbooks",
    condition: "Very Good",
    price: 180,
    campus: "Talamban Campus",
    time: "Yesterday",
    status: "Completed",
    image: "notebook.jpg"
  },
  {
    id: 5,
    buyer: "Sofia Reyes",
    email: "sofia.reyes@usc.edu.ph",
    item: "iPad Air 4 (64GB, Green)",
    category: "Electronics",
    condition: "Used",
    price: 2900,
    campus: "Downtown Campus",
    time: "Yesterday",
    status: "Declined",
    image: "ipad.jpg"
  }
];

const statuses = [
  "All requests",
  "Pending",
  "Accepted",
  "Completed",
  "Declined"
];

const formatPrice = (price) =>
  `₱${price.toLocaleString("en-PH")}`;

export default function MarketplaceRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedId, setSelectedId] = useState(1);
  const [filter, setFilter] = useState("All requests");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const counts = useMemo(() => {
    return statuses.reduce((result, status) => {
      result[status] =
        status === "All requests"
          ? requests.length
          : requests.filter((request) => request.status === status).length;

      return result;
    }, {});
  }, [requests]);

  const filteredRequests = useMemo(() => {
    return requests
      .filter((request) => {
        const matchesStatus =
          filter === "All requests" || request.status === filter;

        const matchesSearch =
          `${request.buyer} ${request.item}`
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesStatus && matchesSearch;
      })
      .sort((a, b) =>
        sort === "newest" ? a.id - b.id : b.id - a.id
      );
  }, [requests, filter, search, sort]);

  const selectedRequest =
    filteredRequests.find((request) => request.id === selectedId) ||
    filteredRequests[0];

  const updateStatus = (status) => {
    if (!selectedRequest) return;

    setRequests((previous) =>
      previous.map((request) =>
        request.id === selectedRequest.id
          ? { ...request, status }
          : request
      )
    );
  };

  const summary = [
    {
      status: "Pending",
      subtitle: "Awaiting your response",
      icon: Clock3
    },
    {
      status: "Accepted",
      subtitle: "Ready for a meet-up",
      icon: CircleCheck
    },
    {
      status: "Completed",
      subtitle: "Successfully exchanged",
      icon: PackageCheck
    },
    {
      status: "Declined",
      subtitle: "No further action needed",
      icon: CircleX
    }
  ];

  return (
    <main className="marketplace marketplace-requests-page">
      <MarketplaceHeader />

      <div className="mpr-section-heading">
        <h2>View Requests</h2>
        <p>
          Your items, their next chapter. Review and respond to
          interested Carolinians.
        </p>
      </div>

      <div className="mpr-summary-grid">
        {summary.map(({ status, subtitle, icon: Icon }) => (
          <div className="mpr-summary-card" key={status}>
            <span className="mpr-summary-icon">
              <Icon size={19} />
            </span>

            <div>
              <div className="mpr-summary-title">
                <strong>{counts[status]}</strong>
                <span>{status}</span>
              </div>

              <small>{subtitle}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="mpr-toolbar">
        <div className="mpr-filters">
          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              className={filter === status ? "active" : ""}
              onClick={() => setFilter(status)}
            >
              {status} ({counts[status]})
            </button>
          ))}
        </div>

        <div className="mpr-search-tools">
          <div className="mpr-search">
            <Search size={15} />
            <input
              type="search"
              placeholder="Search buyers or items..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      <div className="mpr-layout">
        <div className="mpr-request-list">
          {filteredRequests.map((request) => (
            <button
              key={request.id}
              type="button"
              className={`mpr-request-card ${
                selectedRequest?.id === request.id ? "selected" : ""
              }`}
              onClick={() => setSelectedId(request.id)}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/${request.image}`}
                alt={request.item}
              />

              <div className="mpr-request-card-content">
                <div className="mpr-request-card-top">
                  <strong>{request.buyer}</strong>

                  <span
                    className={`mpr-status ${request.status.toLowerCase()}`}
                  >
                    {request.status}
                  </span>
                </div>

                <div className="mpr-request-item-row">
                  <h3>{request.item}</h3>
                  <strong>{formatPrice(request.price)}</strong>
                </div>

                <p>{request.time}</p>
              </div>
            </button>
          ))}

          {filteredRequests.length === 0 && (
            <div className="mpr-empty">
              No matching requests found.
            </div>
          )}

          <div className="mpr-list-footer">
            <span>
              Showing {filteredRequests.length} of {requests.length} requests
            </span>
            <span>For your listings only</span>
          </div>
        </div>

        <section className="mpr-details">
          <div className="mpr-details-header">
            <h3>Request details</h3>

            {selectedRequest && (
              <span
                className={`mpr-status ${selectedRequest.status.toLowerCase()}`}
              >
                {selectedRequest.status}
              </span>
            )}
          </div>

          {selectedRequest ? (
            <div className="mpr-details-body">
              <div className="mpr-item-info">
                <img
                  src={`${import.meta.env.BASE_URL}images/${selectedRequest.image}`}
                  alt={selectedRequest.item}
                />

                <div className="mpr-item-description">
                  <span className="mpr-item-category">
                    {selectedRequest.category} · {selectedRequest.condition}
                  </span>

                  <h3>{selectedRequest.item}</h3>

                  <strong className="mpr-item-price">
                    {formatPrice(selectedRequest.price)}
                  </strong>
                </div>

                <span className="mpr-view-listing">
                  View listing <ExternalLink size={12} />
                </span>
              </div>

              <div className="mpr-buyer-section">
                <span className="mpr-detail-label">
                  ABOUT THE BUYER
                </span>

                <div className="mpr-buyer-row">
                  <div className="mpr-avatar">
                    {selectedRequest.buyer
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>

                  <div className="mpr-buyer-name">
                    <strong>{selectedRequest.buyer}</strong>
                  </div>

                  <span className="mpr-student-label">
                    USC student
                  </span>
                </div>

                <div className="mpr-buyer-contact">
                  <Mail size={15} />
                  {selectedRequest.email}
                </div>

                <div className="mpr-buyer-contact">
                  <MapPin size={15} />
                  {selectedRequest.campus}
                </div>
              </div>

              {selectedRequest.status === "Pending" && (
                <div className="mpr-actions">
                  <button
                    type="button"
                    className="mpr-decline"
                    onClick={() => updateStatus("Declined")}
                  >
                    Decline
                  </button>

                  <button
                    type="button"
                    className="mpr-accept"
                    onClick={() => updateStatus("Accepted")}
                  >
                    <CircleCheck size={16} />
                    Accept request
                  </button>
                </div>
              )}

              {selectedRequest.status === "Accepted" && (
                <div className="mpr-actions">
                  <button
                    type="button"
                    className="mpr-accept"
                    onClick={() => updateStatus("Completed")}
                  >
                    <PackageCheck size={16} />
                    Mark as completed
                  </button>
                </div>
              )}

              <p className="mpr-help">
                Accept to reserve this item for the buyer, then confirm
                your meet-up in messages. Mark as sold only after the exchange.
              </p>
            </div>
          ) : (
            <div className="mpr-empty">
              Select a request to view its details.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
