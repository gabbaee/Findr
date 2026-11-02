import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <div className="logo-icon">⌕</div>
        <div>
          <strong>Findr.</strong>
          <small>USC DCISM</small>
        </div>
      </div>

        <nav className="nav-links">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/marketplace">Marketplace</NavLink>
            <NavLink to="/lost-and-found">Lost & Found</NavLink>
            <NavLink to="/tambayan">Tambayan</NavLink>
        </nav>

      <div className="nav-actions">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </header>
  );
}
