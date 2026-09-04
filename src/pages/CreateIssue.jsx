import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { api } from "../services/api";

function CreateIssue() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    lab: "",
    pc: "",
    category: "Hardware",
    priority: "Medium",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await api.createIssue({
        title: form.title,
        description: form.description,
        lab: form.lab,
        pc: form.pc,
        category: form.category,
        priority: form.priority,
      });

      alert("Issue created successfully!");

      navigate("/issues");

    } catch (err) {
      setError(
        err.message || "Failed to create issue."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="main-area">

        <Topbar setMobileOpen={setMobileOpen} />

        <main className="page-content">

          <button
            className="back-button"
            onClick={() => navigate("/issues")}
          >
            <ArrowLeft size={18} />
            Back to Issues
          </button>

          <div className="page-header">
            <div>
              <span className="eyebrow">REPORT</span>
              <h1>Create Issue</h1>
              <p>
                Report a problem with a laboratory computer or equipment.
              </p>
            </div>
          </div>

          <section className="form-card">

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                <div className="form-group full">
                  <label>Issue Title</label>

                  <input
                    type="text"
                    name="title"
                    placeholder="Example: Monitor not displaying"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Lab</label>

                  <select
                    name="lab"
                    value={form.lab}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select laboratory
                    </option>

                    <option value="M301">
                      M301 — 66 Computers
                    </option>

                    <option value="M323">
                      M323 — 70 Computers
                    </option>

                    <option value="M332">
                      M332 — 65 Computers
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Computer Number</label>

                  <input
                    type="text"
                    name="pc"
                    placeholder="Example: PC-18"
                    value={form.pc}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="Hardware">
                      Hardware
                    </option>

                    <option value="Software">
                      Software
                    </option>

                    <option value="Network">
                      Network
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Priority</label>

                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">
                      Medium
                    </option>
                    <option value="High">High</option>
                    <option value="Critical">
                      Critical
                    </option>
                  </select>
                </div>

                <div className="form-group full">
                  <label>Description</label>

                  <textarea
                    name="description"
                    rows="6"
                    placeholder="Describe the issue clearly..."
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="form-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => navigate("/issues")}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={loading}
                >
                  <Send size={18} />

                  {loading
                    ? "Submitting..."
                    : "Submit Issue"}
                </button>

              </div>

            </form>

          </section>

        </main>
      </div>
    </div>
  );
}

export default CreateIssue;