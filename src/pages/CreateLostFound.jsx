
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  PlusCircle,
  ImagePlus,
  X
} from "lucide-react";

export default function CreateLostFound() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    type: "Lost",
    title: "",
    category: "",
    description: "",
    campus: "",
    location: "",
    date: "",
    contact: "",
    agreed: false
  });

  const [photos, setPhotos] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.preview));
    };
  }, [photos]);

  function updateForm(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function addPhotos(files) {
    const selected = Array.from(files);
    const remaining = 5 - photos.length;

    if (selected.length > remaining) {
      setError("You can upload a maximum of 5 photos.");
      return;
    }

    if (
      selected.some(
        (file) =>
          !["image/jpeg", "image/png"].includes(file.type) ||
          file.size > 5 * 1024 * 1024
      )
    ) {
      setError("Only JPG or PNG images up to 5 MB are allowed.");
      return;
    }

    setError("");

    const newPhotos = selected.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file)
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
  }

  function removePhoto(id) {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    addPhotos(e.dataTransfer.files);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.agreed) {
      setError("Please confirm that your report details are accurate.");
      return;
    }

    alert("Report validated! Backend submission is not yet connected.");
  }

  return (
    <main className="create-listing-page">
      <div className="create-hero">
        <h1>
          Lost something on campus? <span>We'll help you find it.</span>
        </h1>

        <div className="marketplace-switch">
          <Link to="/lost-and-found">
            <LayoutGrid size={15} />
            View Reports
          </Link>

          <Link to="/lost-and-found/create" className="selected">
            <PlusCircle size={15} />
            Create Post
          </Link>
        </div>
      </div>

      <div className="create-heading">
        <div>
          <h2>Create Lost & Found Post</h2>
          <p>
            Report a lost item or help reunite someone with their belongings.
          </p>
        </div>
        <span>* Required fields</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="create-layout">
          <div className="create-main-card">
            <h3>Tell us about the item</h3>
            <p className="section-description">
              Provide clear details to help others recognize the item.
            </p>

            <div className="form-field">
              <label htmlFor="type">Report type *</label>
              <select
                id="type"
                name="type"
                value={form.type}
                onChange={updateForm}
                required
              >
                <option value="Lost">Lost Item</option>
                <option value="Found">Found Item</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="title">Item name *</label>
              <input
                id="title"
                name="title"
                required
                maxLength={120}
                placeholder="e.g. Black Leather Wallet"
                value={form.title}
                onChange={updateForm}
              />
            </div>

            <div className="form-field">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                required
                value={form.category}
                onChange={updateForm}
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Personal IDs">Personal IDs</option>
                <option value="Audio">Audio</option>
                <option value="Daily Essentials">Daily Essentials</option>
                <option value="Keys & Access">Keys & Access</option>
                <option value="Accessories">Accessories</option>
                <option value="Apparel">Apparel</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                required
                maxLength={1000}
                placeholder="Describe the item's appearance, color, brand, and any identifying features."
                value={form.description}
                onChange={updateForm}
              />
              <span className="character-count">
                {form.description.length} / 1000
              </span>
            </div>

            <div className="form-divider" />

            <h3>
              {form.type === "Lost" ? "Last seen details" : "Found item details"}
            </h3>
            <p className="section-description">
              {form.type === "Lost"
                ? "Help others know where and when you last saw the item."
                : "Let others know where and when the item was found."}
            </p>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="campus">Campus *</label>
                <select
                  id="campus"
                  name="campus"
                  required
                  value={form.campus}
                  onChange={updateForm}
                >
                  <option value="">Select campus</option>
                  <option value="Talamban Campus">Talamban Campus</option>
                  <option value="Downtown Campus">Downtown Campus</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="location">
                  {form.type === "Lost"
                    ? "Last seen location *"
                    : "Found location *"}
                </label>
                <input
                  id="location"
                  name="location"
                  required
                  placeholder="e.g. Bunzel Lobby"
                  value={form.location}
                  onChange={updateForm}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="date">
                  {form.type === "Lost" ? "Date lost *" : "Date found *"}
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  max={new Date().toLocaleDateString("en-CA")}
                  value={form.date}
                  onChange={updateForm}
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact">Contact details *</label>
                <input
                  id="contact"
                  name="contact"
                  required
                  placeholder="USC email or preferred contact method"
                  value={form.contact}
                  onChange={updateForm}
                />
              </div>
            </div>
          </div>

          <aside className="create-sidebar">
            <div className="create-photo-card">
              <h3>Add photos</h3>
              <p className="section-description">
                Upload photos that can help identify the item.
              </p>

              <div
                className={`upload-area ${dragging ? "dragging" : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
              >
                <div className="upload-icon">
                  <ImagePlus size={23} />
                </div>
                <strong>Drag photos here or browse files</strong>
                <span>JPG or PNG · Up to 5 MB each</span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                multiple
                hidden
                onChange={(e) => {
                  addPhotos(e.target.files);
                  e.target.value = "";
                }}
              />

              {photos.length > 0 && (
                <div className="photo-preview-grid">
                  {photos.map((photo, index) => (
                    <div className="photo-preview" key={photo.id}>
                      <img
                        src={photo.preview}
                        alt={`Upload ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        aria-label="Remove photo"
                      >
                        <X size={13} />
                      </button>
                      {index === 0 && (
                        <span className="cover-label">Cover</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="photo-footer">
                <span>{photos.length} / 5 photos added</span>
                <span>First photo is the cover</span>
              </div>
            </div>
          </aside>
        </div>

        <div className="create-bottom-bar">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agreed"
              checked={form.agreed}
              onChange={updateForm}
            />
            <span>
              I confirm that the information in this report is accurate.
            </span>
          </label>

          <div className="create-actions">
            <button
              type="button"
              className="cancel-listing-btn"
              onClick={() => navigate("/lost-and-found")}
            >
              Cancel
            </button>

            <button type="submit" className="publish-listing-btn">
              <PlusCircle size={16} />
              Publish Post
            </button>
          </div>
        </div>

        {error && (
          <p className="create-form-error" role="alert">
            {error}
          </p>
        )}
      </form>
    </main>
  );
}
