import { NavLink } from "react-router-dom";
import { LayoutGrid, PlusCircle, Inbox } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function MarketplaceTabs() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="marketplace-switch">
      <NavLink
        to="/marketplace"
        end
        className={({ isActive }) => isActive ? "selected" : ""}
      >
        <LayoutGrid size={15} />
        View Listings
      </NavLink>

      {isLoggedIn && (
        <>
          <NavLink
            to="/marketplace/create"
            className={({ isActive }) => isActive ? "selected" : ""}
          >
            <PlusCircle size={15} />
            Create Listing
          </NavLink>

          <NavLink
            to="/marketplace/requests"
            className={({ isActive }) => isActive ? "selected" : ""}
          >
            <Inbox size={15} />
            View Requests
          </NavLink>
        </>
      )}
    </div>
  );
}
