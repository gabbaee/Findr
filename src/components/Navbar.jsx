import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <header className="navbar">
      <Link to="/home" className="logo">
        <img
          className="logo-icon"
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt=""
        />
        <div>
          <strong>Findr.</strong>
          <small>USC DCISM</small>
        </div>
      </Link>

      <nav className="nav-links">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/marketplace">Marketplace</NavLink>
        <NavLink to="/lost-and-found">Lost & Found</NavLink>
        <NavLink to="/tambayan">Tambayan</NavLink>
      </nav>

      <div className="nav-actions">
        {isLoggedIn ? (
          <>
            <span className="lf-nav-user">{user.name}</span>
            <button type="button" className="login-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
}
