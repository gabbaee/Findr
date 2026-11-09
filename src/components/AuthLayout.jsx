import { Link } from "react-router-dom";
import { ShoppingBag, Search, DoorOpen, MapPin } from "lucide-react";
import { imagePath } from "../utils/imagePath";

function AuthLayout({ children }) {
  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-promo">
          <div className="auth-promo-content">
            <span className="auth-eyebrow">
              YOUR CAMPUS CONNECTION
            </span>

            <h1>
              A familiar campus.
              <br />
              <span>A better way to find.</span>
            </h1>

            <p>
              From your next textbook to your favorite tambayan,
              stay connected to the Carolinian community.
            </p>

            <div className="auth-features">
              <span>
                <ShoppingBag size={14} />
                Buy & sell
              </span>
              <span>
                <Search size={14} />
                Lost & found
              </span>
              <span>
                <DoorOpen size={14} />
                Find a room
              </span>
            </div>
          </div>

          <div className="auth-campus-image">
            <img
              src={imagePath("lawrence-bunzel.jpg")}
              alt="University of San Carlos campus"
              onError={(e) => {
                e.currentTarget.style.visibility = "hidden";
              }}
            />

            <div className="auth-campus-label">
              <MapPin size={14} />
              University of San Carlos · Talamban Campus
            </div>
          </div>
        </div>

        <div className="auth-form-section">
          {children}
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;
