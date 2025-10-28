// Sidebar.jsx
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 p-3 w-25%">
      <h3 className="mb-4">My Dashboard</h3>
      <nav className="nav flex-column">
        <NavLink to="/user/profile" className="nav-link text-white mb-2">
          Profile
        </NavLink>
        <NavLink to="/user/settings" className="nav-link text-white mb-2">
          Settings
        </NavLink>
        <NavLink to="/user/calendar" className="nav-link text-white mb-2">
          Calendar
        </NavLink>
        <NavLink
          to="/user/book-appointment"
          className="btn btn-primary mt-4 w-100"
        >
          Book Appointment
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
