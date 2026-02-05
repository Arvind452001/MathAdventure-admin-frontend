import { Link, NavLink } from "react-router-dom";
import { useSidebar } from "../App";

function Sidebar() {
  const { sidebarCollapsed } = useSidebar();

  return (
    <aside
      id="sidebar"
      className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}
    >
      {/* LOGO */}
      <div className="p-3 sidebar-header d-flex align-items-center gap-2">
        <img src="/assets/images/logo.png" className="logo" alt="logo" />
        <div className="fw-bold ms-2">MathAdventure</div>
      </div>

      {/* NAV */}
      <nav className="p-3">

        <NavLink to="/dashboard" className="nav-link d-flex align-items-center">
          <i className="bi bi-speedometer2"></i>
          <span className="nav-text">Dashboard</span>
        </NavLink>

        <NavLink to="/students" className="nav-link d-flex align-items-center">
          <i className="bi bi-people"></i>
          <span className="nav-text">Students</span>
        </NavLink>

        <NavLink to="/teachers" className="nav-link d-flex align-items-center">
          <i className="bi bi-person-badge"></i>
          <span className="nav-text">Teachers</span>
        </NavLink>

        <NavLink to="/lessons" className="nav-link d-flex align-items-center">
          <i className="bi bi-journal-bookmark"></i>
          <span className="nav-text">Lessons</span>
        </NavLink>

        <NavLink to="/chapters" className="nav-link d-flex align-items-center">
          <i className="bi bi-book"></i>
          <span className="nav-text">Chapters</span>
        </NavLink>

        <NavLink to="/plans" className="nav-link d-flex align-items-center">
          <i className="bi bi-journal-text"></i>
          <span className="nav-text">Plans</span>
        </NavLink>

        <NavLink to="/quests" className="nav-link d-flex align-items-center">
          <i className="bi bi-flag"></i>
          <span className="nav-text">Quests</span>
        </NavLink>

        <NavLink to="/problems" className="nav-link d-flex align-items-center">
          <i className="bi bi-puzzle"></i>
          <span className="nav-text">Problems</span>
        </NavLink>

        <NavLink to="/leaderboard" className="nav-link d-flex align-items-center">
          <i className="bi bi-trophy"></i>
          <span className="nav-text">Leaderboard</span>
        </NavLink>

        <NavLink
          to="/billingHistory"
          className="nav-link d-flex align-items-center"
        >
          <i className="bi bi-receipt"></i>
          <span className="nav-text">Billing History</span>
        </NavLink>

        {/* ================= CONTACT DROPDOWN ================= */}
        <div className="nav-item">
          <a
            href="#contactMenu"
            data-bs-toggle="collapse"
            className="nav-link d-flex align-items-center"
          >
            <i className="bi bi-envelope"></i>
            <span className="nav-text">Contact</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>

          <div className="collapse ps-4" id="contactMenu">
            <NavLink
              to="/contact/update"
              className="nav-link d-flex align-items-center"
            >
              <i className="bi bi-pencil-square"></i>
              <span className="nav-text">Contact Update</span>
            </NavLink>

            <NavLink
              to="/contact/messages"
              className="nav-link d-flex align-items-center"
            >
              <i className="bi bi-chat-dots"></i>
              <span className="nav-text">Contact Messages</span>
            </NavLink>
          </div>
        </div>

        <NavLink to="/rewards" className="nav-link d-flex align-items-center">
          <i className="bi bi-gift"></i>
          <span className="nav-text">Rewards</span>
        </NavLink>

      </nav>
    </aside>
  );
}

export default Sidebar;
