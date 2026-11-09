import { useEffect } from "react";
import { X, Clock3, CircleCheck } from "lucide-react";

function RoomModal({ room, onClose }) {
  useEffect(() => {
    if (!room) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [room, onClose]);

  if (!room) return null;

  const building = room.building || room.buildingName || "Campus building";
  const roomNumber = room.room || room.roomNumber || room.name || "Room";
  const image = room.image || `${import.meta.env.BASE_URL}images/room-placeholder.jpg`;
  const availableTime = room.time || room.vacantTime || room.schedule || "Time not specified";
  const date = room.date || "Date not specified";
  const asOf = room.asOf || "Status update unavailable";

  return (
    <div
      className="room-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="room-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="room-modal-title"
      >
        <div className="room-modal-header">
          <h2 id="room-modal-title">Room details</h2>

          <button
            type="button"
            className="room-modal-close"
            onClick={onClose}
            aria-label="Close room details"
          >
            <X size={18} />
          </button>
        </div>

        <div className="room-modal-image">
          <img src={image} alt={`${building} ${roomNumber}`} />
        </div>

        <div className="room-modal-body">
          <div className="room-modal-room-heading">
            <div>
              <span className="room-modal-building">
                {building}
              </span>
              <h3>{roomNumber}</h3>
            </div>

            <span className="room-modal-status">
              <CircleCheck size={14} />
              Vacant now
            </span>
          </div>

          <div className="room-modal-availability">
            <div className="room-modal-availability-label">
              <Clock3 size={17} />
              <span>Available room time</span>
            </div>

            <strong>{availableTime}</strong>

            <p>{date} · {asOf}</p>
          </div>

          <p className="room-modal-note">
            Please check the room before settling in and leave before the
            vacancy interval ends. This listing is not a room reservation.
          </p>

          <div className="room-modal-footer">
            <button
              type="button"
              className="room-modal-back"
              onClick={onClose}
            >
              Back to rooms
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RoomModal;
