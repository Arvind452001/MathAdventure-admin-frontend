import { Link } from 'react-router-dom'
import { useSidebar } from '../App'

function Sidebar() {
  const { sidebarCollapsed } = useSidebar()

  return (
    <aside id="sidebar" className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="p-3 sidebar-header d-flex align-items-center gap-2">
        <img src="/assets/images/logo.png" className="logo" alt="logo" />
        <div className="fw-bold ms-2">MathAdventure</div>
      </div>
      <nav className="p-3">
        <Link to="/dashboard" className="nav-link d-flex align-items-center">
          <i className="bi bi-speedometer2"></i>
          <span className="nav-text">Dashboard</span>
        </Link>
        <Link to="/students" className="nav-link d-flex align-items-center">
          <i className="bi bi-people"></i>
          <span className="nav-text">Students</span>
        </Link>
        <Link to="/teachers" className="nav-link d-flex align-items-center">
          <i className="bi bi-person-badge"></i>
          <span className="nav-text">Teachers</span>
        </Link>
        <Link to="/plans" className="nav-link d-flex align-items-center">
          <i className="bi bi-journal-text"></i>
          <span className="nav-text">Plans</span>
        </Link>
        <Link to="/quests" className="nav-link d-flex align-items-center">
          <i className="bi bi-flag"></i>
          <span className="nav-text">Quests</span>
        </Link>
        <Link to="/problems" className="nav-link d-flex align-items-center">
          <i className="bi bi-puzzle"></i>
          <span className="nav-text">Problems</span>
        </Link>
        <Link to="/leaderboard" className="nav-link d-flex align-items-center">
          <i className="bi bi-trophy"></i>
          <span className="nav-text">Leaderboard</span>
        </Link>
        <Link to="/rewards" className="nav-link d-flex align-items-center">
          <i className="bi bi-gift"></i>
          <span className="nav-text">Rewards</span>
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar
