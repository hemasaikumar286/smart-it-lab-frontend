import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Shield,
  Save,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { api } from "../services/api";

function Profile() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await api.getProfile();

      const user =
        response.user ||
        response.data ||
        response;

      setForm({
        name:
          user.name ||
          user.full_name ||
          "",
        email:
          user.email ||
          "",
      });

    } catch (error) {
      const storedUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      setForm({
        name:
          storedUser.name ||
          storedUser.full_name ||
          "",
        email:
          storedUser.email ||
          "",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const response = await api.updateProfile(form);

      const updatedUser =
        response.user ||
        response.data ||
        form;

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setMessage("Profile updated successfully.");

    } catch (error) {
      setMessage(
        error.message || "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const initials = form.name
    ? form.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "U";

  return (
    <div className="app-layout">

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="main-area">

        <Topbar setMobileOpen={setMobileOpen} />

        <main className="page-content">

          <div className="page-header">
            <div>
              <span className="eyebrow">ACCOUNT</span>
              <h1>Profile</h1>
              <p>
                Manage your account information.
              </p>
            </div>
          </div>

          <section className="profile-layout">

            <div className="profile-card">

              <div className="large-avatar">
                {initials}
              </div>

              <h2>
                {form.name || "User"}
              </h2>

              <p>
                {form.email || "No email"}
              </p>

              <div className="profile-role">
                <Shield size={16} />
                Account User
              </div>

            </div>

            <div className="form-card">

              <h2>Personal Information</h2>

              <p className="form-description">
                Update your personal account information.
              </p>

              {message && (
                <div className="success-message">
                  {message}
                </div>
              )}

              {loading ? (
                <div className="empty-state">
                  Loading profile...
                </div>
              ) : (
                <form onSubmit={handleSubmit}>

                  <div className="form-group">
                    <label>Full Name</label>

                    <div className="input-wrapper">
                      <User size={18} />

                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>

                    <div className="input-wrapper">
                      <Mail size={18} />

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <button
                    className="primary-button"
                    type="submit"
                    disabled={saving}
                  >
                    <Save size={18} />

                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                </form>
              )}

            </div>

          </section>

        </main>
      </div>
    </div>
  );
}

export default Profile;