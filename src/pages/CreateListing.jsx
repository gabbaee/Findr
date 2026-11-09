
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, X, Plus } from "lucide-react";
import MarketplaceHeader from "../components/MarketplaceHeader";

const categories = [
  "Textbooks",
  "Electronics",
  "Supplies",
  "Clothing",
  "Accessories",
  "Others"
];

const conditions = [
  "New",
  "Like New",
  "Good",
  "Fair",
  "Used"
];

export default function CreateListing() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const photosRef = useRef([]);

  const [form, setForm] = useState({
    title: "",
    category: "",
    condition: "",
    price: "",
    description: "",
    campus: "",
    agree: false
  });

  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  useEffect(() => {
    return () => {
      photosRef.current.forEach((photo) => {
        URL.revokeObjectURL(photo.preview);
      });
    };
  }, []);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  const addPhotos = (files) => {
    const remaining = 5 - photos.length;

    if (remaining <= 0) {
      setError("You can only upload up to 5 photos.");
      return;
    }

    const validFiles = Array.from(files)
      .filter((file) => {
        return (
          ["image/jpeg", "image/png"].includes(file.type) &&
          file.size <= 5 * 1024 * 1024
        );
      })
      .slice(0, remaining);

    if (validFiles.length === 0) {
      setError("Please upload JPG or PNG images under 5 MB.");
      return;
    }

    const newPhotos = validFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file)
    }));

    setPhotos((previous) => [...previous, ...newPhotos]);
    setError("");
  };

  const removePhoto = (id) => {
    const target = photos.find((photo) => photo.id === id);

    if (target) {
      URL.revokeObjectURL(target.preview);
    }

    setPhotos((previous) =>
      previous.filter((photo) => photo.id !== id)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (
      !form.title.trim() ||
      !form.category ||
      !form.condition ||
      !form.price ||
      !form.description.trim() ||
      !form.campus
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (Number(form.price) <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    if (!form.agree) {
      setError("Please confirm that your listing details are accurate.");
      return;
    }

    setError(
      "Listing publishing will be available after the database is connected."
    );
  };

  return (
    <main className="create-listing-page">
      <MarketplaceHeader />

      <div className="create-heading">
        <div>
          <h2>Create Listing</h2>
          <p>
            Turn what you no longer need into another Carolinian's
            next essential.
          </p>
        </div>

        <span>* Required fields</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="create-layout">
          <div className="create-main-card">
            <h3>Tell us about your item</h3>

            <p className="create-section-subtitle">
              A clear title and honest details help students find
              the right fit.
            </p>

            <div className="create-field">
              <label htmlFor="listing-title">
                Listing title *
              </label>

              <input
                id="listing-title"
                type="text"
                placeholder="e.g. Organic Chemistry (Wade, 8th Ed)"
                value={form.title}
                onChange={(event) =>
                  updateField("title", event.target.value)
                }
                required
              />
            </div>

            <div className="create-form-row">
              <div className="create-field">
                <label htmlFor="listing-category">
                  Category *
                </label>

                <select
                  id="listing-category"
                  value={form.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  required
                >
                  <option value="">Select a category</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="create-field">
                <label htmlFor="listing-condition">
                  Condition *
                </label>

                <select
                  id="listing-condition"
                  value={form.condition}
                  onChange={(event) =>
                    updateField("condition", event.target.value)
                  }
                  required
                >
                  <option value="">Select item condition</option>

                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="create-field">
              <label htmlFor="listing-price">
                Price (PHP) *
              </label>

              <input
                id="listing-price"
                type="number"
                min="1"
                step="0.01"
                placeholder="₱ 0.00"
                value={form.price}
                onChange={(event) =>
                  updateField("price", event.target.value)
                }
                required
              />
            </div>

            <div className="create-field">
              <label htmlFor="listing-description">
                Description *
              </label>

              <textarea
                id="listing-description"
                rows={5}
                maxLength={1000}
                placeholder="Describe the item's condition, edition or size, what's included, and any signs of wear."
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                required
              />

              <div className="create-character-count">
                {form.description.length} / 1000
              </div>
            </div>

            <div className="create-form-divider" />

            <h3>Meet-up & contact</h3>

            <p className="create-section-subtitle">
              Keep exchanges convenient and within the USC community.
            </p>

            <div className="create-field">
              <label htmlFor="listing-campus">
                Campus *
              </label>

              <select
                id="listing-campus"
                value={form.campus}
                onChange={(event) =>
                  updateField("campus", event.target.value)
                }
                required
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
          </div>

          <aside className="create-sidebar">
            <div className="create-photo-card">
              <h3>Add photos</h3>

              <p className="create-section-subtitle">
                Show your item from its best angles.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                multiple
                hidden
                onChange={(event) => {
                  addPhotos(event.target.files);
                  event.target.value = "";
                }}
              />

              <button
                type="button"
                className="upload-area"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  addPhotos(event.dataTransfer.files);
                }}
              >
                <ImagePlus size={24} />

                <strong>
                  Drag photos here or browse files
                </strong>

                <span>
                  JPG or PNG · Up to 5 MB each
                </span>
              </button>

              {photos.length > 0 && (
                <div className="create-photo-preview-list">
                  {photos.map((photo, index) => (
                    <div
                      className="create-photo-preview"
                      key={photo.id}
                    >
                      <img
                        src={photo.preview}
                        alt={photo.file.name}
                      />

                      <div className="create-photo-details">
                        <strong>{photo.file.name}</strong>

                        <span>
                          {index === 0
                            ? "Cover photo"
                            : "Additional photo"}
                        </span>
                      </div>

                      <button
                        type="button"
                        className="create-remove-photo"
                        onClick={() => removePhoto(photo.id)}
                        aria-label="Remove photo"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="create-photo-footer">
                <span>{photos.length} / 5 photos added</span>
                <span>First photo is the cover</span>
              </div>
            </div>
          </aside>
        </div>

        <div className="create-bottom-bar">
          <label className="create-agreement">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(event) =>
                updateField("agree", event.target.checked)
              }
            />

            <span>
              I confirm my item details are accurate and agree
              to the marketplace guidelines.
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

            <button
              type="submit"
              className="publish-listing-btn"
            >
              <Plus size={16} />
              Publish Listing
            </button>
          </div>
        </div>

        {error && (
          <p className="create-error" role="alert">
            {error}
          </p>
        )}
      </form>
    </main>
  );
}
