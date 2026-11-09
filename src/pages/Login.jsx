import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight
} from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";
import { imagePath } from "../utils/imagePath";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!trimmedEmail.endsWith("@usc.edu.ph")) {
      setError("Please use your USC email address.");
      return;
    }

    login(trimmedEmail, trimmedEmail.split("@")[0]);

    const destination = location.state?.from || "/home";

    navigate(destination, { replace: true });
  };

  return (
    <AuthLayout>
      <div className="auth-form-header">
        <span className="auth-welcome">
          <GraduationCap size={17} />
          WELCOME BACK, CAROLINIAN
        </span>

        <h2>
          Login to Findr<span>.</span>
        </h2>

      </div>

      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="login-email">
            USC email address
          </label>

          <div className="auth-input-wrapper">
            <Mail size={18} />

            <input
              id="login-email"
              type="email"
              placeholder="Enter your USC email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="auth-field">
          <label htmlFor="login-password">
            Password
          </label>

          <div className="auth-input-wrapper">
            <LockKeyhole size={18} />

            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="auth-eye-button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
            >
              {showPassword ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>
        </div>

        <div className="auth-form-options">
          <label className="auth-checkbox">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>

          <Link to="/forgot-password">
            Forgot password?
          </Link>
        </div>

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="auth-submit">
          Login
          <ArrowRight size={17} />
        </button>

        <p className="auth-bottom-text">
          New to Findr?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;
