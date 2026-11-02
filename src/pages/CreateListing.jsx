
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  PlusCircle,
  ImagePlus,
  X
} from "lucide-react";

export default function CreateListing() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    condition: "",
    price: "",
    negotiable: false,
    description: "",
    campus: "",
    location: "",
    contact: "",
    agreed: false
  });

  const [photos, setPhotos] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      photos.forEach((photo) =>
        URL.revokeObjectURL(photo.preview)
      );
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
    setPhotos((prev) => prev.filter((p) => p.id !== id));
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
      setError("Please agree to the marketplace guidelines.");
      return;
    }

    if (photos.length === 0) {
      setError("Please add at least one item photo.");
      return;
    }

    alert("Listing form validated! Backend submission is not yet connected.");
  }

  return (
    <main className="create-listing-page">
      <div className="create-hero">
        <h1>
          Buy & Sell <span>Academic Essentials.</span>
        </h1>

        <div className="marketplace-switch">
          <Link to="/marketplace">
            <LayoutGrid size={15} />
            View Listings
          </Link>

          <Link to="/marketplace/create" className="selected">
            <PlusCircle size={15} />
            Create Listing
          </Link>
        </div>
      </div>

      <div className="create-heading">
        <div>
          <h2>Create Listing</h2>
          <p>
            Turn what you no longer need into another
            Carolinian's next essential.
          </p>
        </div>
        <span>* Required fields</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="create-layout">
          <div className="create-main-card">
            <h3>Tell us about your item</h3>
            <p className="section-description">
              A clear title and honest details help students find
              the right fit.
            </p>

            <div className="form-field">
              <label htmlFor="title">Listing title *</label>
              <input
                id="title"
                name="title"
                required
                maxLength={120}
                placeholder="e.g. Organic Chemistry (Wade, 8th Ed)"
                value={form.title}
                onChange={updateForm}
              />
            </div>

            <div className="form-row">
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
                  <option value="Textbooks">Textbooks</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Supplies">Supplies</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="condition">Condition *</label>
                <select
                  id="condition"
                  name="condition"
                  required
                  value={form.condition}
                  onChange={updateForm}
                >
                  <option value="">Select item condition</option>
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Used">Used</option>
                </select>
              </div>
            </div>

            <div className="form-row price-row">
              <div className="form-field">
                <label htmlFor="price">Price (PHP) *</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                  placeholder="₱ 0.00"
                  value={form.price}
                  onChange={updateForm}
                />
              </div>

              <label className="checkbox-label negotiable">
                <input
                  type="checkbox"
                  name="negotiable"
                  checked={form.negotiable}
                  onChange={updateForm}
                />
                Price is negotiable
              </label>
            </div>

            <div className="form-field">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                required
                maxLength={1000}
                placeholder="Describe the item's condition, edition or size, what's included, and any signs of wear."
                value={form.description}
                onChange={updateForm}
              />
              <span className="character-count">
                {form.description.length} / 1000
              </span>
            </div>

            <div className="form-divider" />

            <h3>Meet-up & contact</h3>
            <p className="section-description">
              Keep exchanges convenient and within the USC community.
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
                  <option value="Talamban Campus">
                    Talamban Campus
                  </option>
                  <option value="Downtown Campus">
                    Downtown Campus
                  </option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="location">Meet-up location *</label>
                <input
                  id="location"
                  name="location"
                  required
                  placeholder="e.g. Library entrance"
                  value={form.location}
                  onChange={updateForm}
                />
              </div>
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

            <aside className="create-sidebar">
            <div className="create-photo-card">
                <h3>Add photos</h3>
                <p className="section-description">
                Show your item from its best angles.
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
              I confirm my item details are accurate and agree to
              the <a href="#guidelines">marketplace guidelines</a>.
            </span>
          </label>

          <div className="create-actions">
            <button
              type="button"
              className="cancel-listing-btn"
              onClick={() => navigate("/marketplace")}
            >
              Cancel
            </button>
            <button type="submit" className="publish-listing-btn">
              <PlusCircle size={16} />
              Publish Listing
            </button>
          </div>
        </div>

        {error && (
          <p className="create-form-error" role="alert">{error}</p>
        )}
      </form>
    </main>
  );
}
