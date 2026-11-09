import { Link } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  ShoppingBag,
  Search,
  DoorOpen
} from "lucide-react";
import "../styles/home.css";
import { imagePath } from "../utils/imagePath";

function Home() {
  const base = import.meta.env.BASE_URL;

  const features = [
    {
      title: "Marketplace",
      description:
        "Give your essentials a second life. Find textbooks, calculators, lab gear, and more from fellow students.",
      action: "Buy & sell essentials",
      detail: "148 items available today",
      path: "/marketplace",
      icon: ShoppingBag
    },
    {
      title: "Lost & Found",
      description:
        "Left something behind? Browse campus reports or post an item to help it find its way back home.",
      action: "Find or report an item",
      detail: "32 items recovered today",
      path: "/lost-and-found",
      icon: Search
    },
    {
      title: "Tambayan",
      description:
        "A break between classes? Find a vacant room to study, catch up with friends, or simply tambay.",
      action: "Find a vacant room",
      detail: "Explore rooms across campus",
      path: "/tambayan",
      icon: DoorOpen
    }
  ];

  return (
    <main className="home-page">
      <div className="home-container">
        <section className="home-hero">
          <div className="home-hero-content">
            <h1>
              Campus life, <span>found.</span>
            </h1>

            <p>
              Buy and sell academic essentials, reconnect with lost
              belongings, and find your next tambayan. All in one place.
            </p>

            <div className="home-hero-actions">
              <Link to="/marketplace" className="home-primary-btn">
                Explore Marketplace
                <ArrowRight size={17} />
              </Link>

              <Link to="/signup" className="home-secondary-btn">
                Join the Community
              </Link>
            </div>

            <div className="home-campus-location">
              <MapPin size={14} />
              Talamban & Downtown Campus
            </div>
          </div>

          <div className="home-hero-image">
            <img
              src={imagePath("lawrence-bunzel.jpg")}
              alt="University of San Carlos campus"
            />
          </div>
        </section>

        <section className="home-features-section">
          <h2>What are you looking for?</h2>

          <div className="home-features-grid">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Link
                  to={feature.path}
                  className="home-feature-card"
                  key={feature.title}
                >
                  <div className="home-feature-heading">
                    <div className="home-feature-icon">
                      <Icon size={22} />
                    </div>

                    <h3>{feature.title}</h3>
                  </div>

                  <p className="home-feature-description">
                    {feature.description}
                  </p>

                  <div className="home-feature-action">
                    <span>{feature.action}</span>
                    <ArrowRight size={17} />
                  </div>

                  <span className="home-feature-detail">
                    {feature.detail}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="home-community-banner">
          <div>
            <h2>Good finds start with our community.</h2>
            <p>
              Make your next campus connection. Create your Findr account
              today.
            </p>
          </div>

          <Link to="/signup" className="home-primary-btn">
            Sign Up for Findr
            <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </main>
  );
}

export default Home;
