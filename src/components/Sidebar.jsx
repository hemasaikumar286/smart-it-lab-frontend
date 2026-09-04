import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  Bell,
  User,
  LogOut,
  Monitor,
  X,
} from "lucide-react";

function Sidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Issues",
      path: "/issues",
      icon: ClipboardList,
    },
    {
      name: "Create Issue",
      path: "/create-issue",
      icon: PlusCircle,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: Bell,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>

        <div className="sidebar-header">
          <div className="brand-icon">
            <Monitor size={23} />
          </div>

          <div>
            <h2>LabCare</h2>
            <span>IT Lab Management</span>
          </div>

          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-section-title">
          MAIN MENU
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-bottom">

          <div className="lab-status">
            <span className="status-dot"></span>
            <div>
              <strong>System Online</strong>
              <small>All services operational</small>
            </div>
          </div>

          <button className="logout-button" onClick={logout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>

        </div>
      </aside>
    </>
  );
}

export default Sidebar;