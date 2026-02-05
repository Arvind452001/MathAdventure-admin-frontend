import { Link } from "react-router-dom";
import { useSidebar } from "../App";

function Header({ title }) {
  const { toggleSidebar } = useSidebar();

  return (
    <header
      style={{
        width: "100%",
        marginBottom:"20px",
        background: "#fff",
        borderBottom: "1px solid rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "0 16px",
          height: "72px",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={toggleSidebar}
            style={{ display: "flex", alignItems: "center" }}
          >
            <i className="bi bi-list"></i>
          </button>

          <span
            style={{
              fontSize: "18px",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </span>
        </div>

        {/* RIGHT */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div className="dropdown">
            <a
              href="#"
              className="text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="avatar">A</div>
            </a>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <Link className="dropdown-item" to="/login">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
