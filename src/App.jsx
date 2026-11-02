import {
  HashRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Marketplace from "./pages/Marketplace";
import CreateListing from "./pages/CreateListing";
import LostAndFound from "./pages/LostAndFound";
import Tambayan from "./pages/Tambayan";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<Navigate to="/marketplace" replace />}
          />

          <Route
            path="/marketplace"
            element={<Marketplace />}
          />

          <Route
            path="/marketplace/create"
            element={<CreateListing />}
          />

          <Route
            path="/lost-and-found"
            element={<LostAndFound />}
          />
        
          <Route 
            path="/tambayan" 
            element={<Tambayan />} 
          />
        </Routes>

        <footer className="footer">
          <span>
            © 2026 Findr Platform. Built for the USC Community.
          </span>

          <span>
            How It Works　 Privacy Policy　 Help Support
          </span>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
