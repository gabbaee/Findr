import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import CreateListing from "./pages/CreateListing";
import MarketplaceRequests from "./pages/MarketplaceRequests";
import LostAndFound from "./pages/LostAndFound";
import CreateLostFound from "./pages/CreateLostFound";
import LostFoundRequests from "./pages/LostFoundRequests";
import Tambayan from "./pages/Tambayan";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <div className="app-container">
          <Navbar />

          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />

            <Route path="/marketplace" element={<Marketplace />} />

            <Route
              path="/marketplace/create"
              element={
                <ProtectedRoute>
                  <CreateListing />
                </ProtectedRoute>
              }
            />

            <Route
              path="/marketplace/requests"
              element={
                <ProtectedRoute>
                  <MarketplaceRequests />
                </ProtectedRoute>
              }
            />

            <Route path="/lost-and-found" element={<LostAndFound />} />

            <Route
              path="/lost-and-found/create"
              element={
                <ProtectedRoute>
                  <CreateLostFound />
                </ProtectedRoute>
              }
            />

            <Route
              path="/lost-and-found/requests"
              element={
                <ProtectedRoute>
                  <LostFoundRequests />
                </ProtectedRoute>
              }
            />

            <Route path="/tambayan" element={<Tambayan />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>

          <footer className="footer">
            <span>© 2026 Findr Platform. Built for the USC Community.</span>
            <span>How It Works　 Privacy Policy　 Help Support</span>
          </footer>
        </div>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
