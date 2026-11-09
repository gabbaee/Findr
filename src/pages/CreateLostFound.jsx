import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, MapPin, Mail, X, Plus } from "lucide-react";
import LostFoundHeader from "../components/LostFoundHeader";
import { useAuth } from "../context/AuthContext";
import "../styles/lost-found-pages.css";

export default function CreateLostFound() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const inputRef = useRef(null);
  const photosRef = useRef([]);

  const [form, setForm] = useState({
    type: "Found",
    title: "",
    category: "",
    date: "",
    campus: "Talamban Campus",
    location: "",
    description: "",
    name: user?.name || "",
    email: user?.email || "",
    agree: false
  });

  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  useEffect(() => {
    return () => {
      photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.preview));
    };
  }, []);

  const update = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const addPhotos = (files) => {
    const remaining = 5 - photos.length;
    const valid = Array.from(files)
      .filter((file) => ["image/jpeg", "image/png"].includes(file.type))
      .filter((file) => file.size <= 5 * 1024 * 1024)
      .slice(0, remaining);

    setPhotos((previous) => [
      ...previous,
      ...valid.map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file)
      }))
    ]);
  };

  const removePhoto = (id) => {
    setPhotos((previous) => {
      const target = previous.find((photo) => photo.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return previous.filter((photo) => photo.id !== id);
    });
  };

  const publish = (event) => {
    event.preventDefault();
    setError("");

    if (!form.title.trim() || !form.category || !form.date ||
        !form.location.trim() || !form.description.trim() ||
        !form.name.trim() || !form.email.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    if (!form.agree) {
      setError("Please confirm that the information is accurate.");
      return;
    }

    setError("Post publishing will be available after the database is connected.");
  };

  return (
    <main className="lf-page">
      <LostFoundHeader />

      <div className="lf-section-heading">
        <div>
          <h2>Make Post</h2>
          <p>Lost it or found it? Help a fellow Carolinian bring it home.</p>
        </div>
        <span>* Required fields</span>
      </div>

      <form onSubmit={publish}>
        <div className="lf-create-layout">
          <div className="lf-panel">
            <h3>Tell us about the item</h3>
            <p className="lf-panel-subtitle">
              Share enough to help, but keep unique identifying details private.
            </p>

            <label className="lf-label">Report type *</label>
            <div className="lf-type-grid">
              {["Lost", "Found"].map((type) => (
                <button
                  type="button"
                  key={type}
                  className={`lf-type-option ${form.type === type ? "selected" : ""}`}
                  onClick={() => update("type", type)}
                >
                  <span className="lf-radio-indicator" />
                  <span>
                    <strong>{type}</strong>
                    <small>
                      {type === "Lost"
                        ? "I'm looking for my item"
                        : "I found someone's item"}
                    </small>
                  </span>
                </button>
              ))}
            </div>

            <div className="lf-field">
              <label htmlFor="lf-title">Item name *</label>
              <input
                id="lf-title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. Hydro Flask (Yellow)"
                required
              />
            </div>

            <div className="lf-field-grid">
              <div className="lf-field">
                <label htmlFor="lf-category">Category *</label>
                <select
                  id="lf-category"
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  <option>Daily Essentials</option>
                  <option>Personal IDs</option>
                  <option>Electronics</option>
                  <option>Accessories</option>
                  <option>Keys & Access</option>
                  <option>Apparel</option>
                  <option>Others</option>
                </select>
              </div>

              <div className="lf-field">
                <label htmlFor="lf-date">
                  Date {form.type === "Found" ? "found" : "lost"} *
                </label>
                <input
                  id="lf-date"
                  type="date"
                  max={new Date().toLocaleDateString("en-CA")}
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  required
                />
              </div>

              <div className="lf-field">
                <label htmlFor="lf-campus">Campus *</label>
                <select
                  id="lf-campus"
                  value={form.campus}
                  onChange={(e) => update("campus", e.target.value)}
                >
                  <option>Talamban Campus</option>
                  <option>Downtown Campus</option>
                </select>
              </div>

              <div className="lf-field">
                <label htmlFor="lf-location">
                  Location {form.type === "Found" ? "found" : "last seen"} *
                </label>
                <div className="lf-input-icon">
                  <input
                    id="lf-location"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="e.g. Basketball Court"
                    required
                  />
                  <MapPin size={15} />
                </div>
              </div>
            </div>

            <div className="lf-field">
              <label htmlFor="lf-description">Description *</label>
              <textarea
                id="lf-description"
                rows={4}
                maxLength={1000}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Describe the item and where it was lost or found..."
                required
              />
            </div>

            <div className="lf-form-divider" />

            <h3>Contact & recovery</h3>
            <p className="lf-panel-subtitle">
              Your contact details are shared privately to help arrange a safe return.
            </p>

            <div className="lf-field-grid">
              <div className="lf-field">
                <label htmlFor="lf-name">Your name *</label>
                <input
                  id="lf-name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="lf-field">
                <label htmlFor="lf-email">USC email *</label>
                <div className="lf-input-icon">
                  <input
                    id="lf-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="name@usc.edu.ph"
                    required
                  />
                  <Mail size={15} />
                </div>
              </div>
            </div>
          </div>

          <aside className="lf-panel lf-photo-panel">
            <h3>Add photos</h3>
            <p className="lf-panel-subtitle">A clear photo makes a match easier.</p>

            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg"
              multiple
              hidden
              onChange={(event) => {
                addPhotos(event.target.files);
                event.target.value = "";
              }}
            />

            <button
              type="button"
              className="lf-upload-area"
              onClick={() => inputRef.current?.click()}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                addPhotos(event.dataTransfer.files);
              }}
            >
              <ImagePlus size={23} />
              <strong>Drag photos here or browse files</strong>
              <span>JPG or PNG · Up to 5 MB each</span>
            </button>

            <div className="lf-photo-list">
              {photos.map((photo, index) => (
                <div className="lf-photo-entry" key={photo.id}>
                  <img src={photo.preview} alt={photo.file.name} />
                  <div>
                    <strong>{photo.file.name}</strong>
                    <span>{index === 0 ? "Cover photo" : "Additional photo"}</span>
                    <button type="button" onClick={() => removePhoto(photo.id)}>
                      Remove
                    </button>
                  </div>
                  <button
                    type="button"
                    className="lf-remove-photo"
                    onClick={() => removePhoto(photo.id)}
                    aria-label="Remove photo"
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>

            <p className="lf-photo-count">
              {photos.length}/5 photos added · Photos are optional
            </p>
          </aside>
        </div>

        <div className="lf-publish-bar">
          <label>
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) => update("agree", e.target.checked)}
            />
            I confirm these details are accurate and respect the owner's privacy.
          </label>

          <div className="lf-publish-actions">
            <button type="button" className="lf-cancel" onClick={() => navigate("/lost-and-found")}>
              Cancel
            </button>
            <button type="submit" className="lf-primary-button">
              <Plus size={16} />
              Publish Post
            </button>
          </div>
        </div>

        {error && <p className="lf-form-error" role="alert">{error}</p>}
      </form>
    </main>
  );
}
