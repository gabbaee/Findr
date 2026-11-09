import { NavLink } from "react-router-dom";
import { LayoutGrid, PlusCircle, Inbox } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LostFoundTabs() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="lf-tabs">
      <NavLink
        to="/lost-and-found"
        end
        className={({ isActive }) => isActive ? "active" : ""}
      >
        <LayoutGrid size={15} />
        View Items
      </NavLink>

      {isLoggedIn && (
        <>
          <NavLink
            to="/lost-and-found/create"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            <PlusCircle size={15} />
            Make Post
          </NavLink>

          <NavLink
            to="/lost-and-found/requests"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            <Inbox size={15} />
            View Requests
          </NavLink>
        </>
      )}
    </div>
  );
}
