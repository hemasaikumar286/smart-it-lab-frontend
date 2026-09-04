import { useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Topbar({ setMobileOpen }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const userName =
    user.name ||
    user.full_name ||
    user.username ||
    "User";

  const initials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/issues?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="topbar">

      <button
        className="mobile-menu-button"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={22} />
      </button>

      <form className="search-box" onSubmit={handleSearch}>
        <Search size={18} />

        <input
          type="text"
          placeholder="Search issues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="topbar-right">

        <button
          className="notification-button"
          onClick={() => navigate("/notifications")}
        >
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <button
          className="user-menu"
          onClick={() => navigate("/profile")}
        >
          <div className="avatar">
            {initials}
          </div>

          <div className="user-info">
            <strong>{userName}</strong>
            <span>{user.role || "User"}</span>
          </div>
        </button>

      </div>
    </header>
  );
}

export default Topbar;