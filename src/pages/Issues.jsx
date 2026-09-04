import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Trash2,
  Eye,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { api } from "../services/api";

function Issues() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      const response = await api.getIssues();

      const data =
        response.issues ||
        response.data ||
        response ||
        [];

      setIssues(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteIssue = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this issue?"
    );

    if (!confirmed) return;

    try {
      await api.deleteIssue(id);

      setIssues((previous) =>
        previous.filter(
          (issue) =>
            (issue.issue_id || issue.id) !== id
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const text = `
        ${issue.title || ""}
        ${issue.description || ""}
        ${issue.lab_name || issue.lab || ""}
        ${issue.pc_number || issue.pc || ""}
        ${issue.category || ""}
      `.toLowerCase();

      const matchesSearch =
        text.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        issue.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        issue.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    issues,
    search,
    statusFilter,
    priorityFilter,
  ]);

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
              <span className="eyebrow">MANAGEMENT</span>
              <h1>Issues</h1>
              <p>
                View and manage all laboratory issues.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => navigate("/create-issue")}
            >
              <Plus size={18} />
              Create Issue
            </button>
          </div>

          <div className="filter-card">

            <div className="filter-search">
              <Search size={18} />

              <input
                placeholder="Search issues..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <div className="filter-select">
              <Filter size={17} />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">
                  In Progress
                </option>
                <option value="Resolved">
                  Resolved
                </option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="filter-select">
              <select
                value={priorityFilter}
                onChange={(e) =>
                  setPriorityFilter(e.target.value)
                }
              >
                <option value="All">All Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

          </div>

          <section className="content-card">

            {loading ? (
              <div className="empty-state">
                Loading issues...
              </div>
            ) : filteredIssues.length === 0 ? (
              <div className="empty-state">
                <Search size={36} />
                <h3>No issues found</h3>
                <p>
                  Try changing your search or filters.
                </p>
              </div>
            ) : (
              <div className="table-container">

                <table className="issues-table">

                  <thead>
                    <tr>
                      <th>Issue</th>
                      <th>Location</th>
                      <th>Category</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredIssues.map((issue, index) => {

                      const id =
                        issue.issue_id ||
                        issue.id;

                      return (
                        <tr key={id || index}>

                          <td>
                            <div className="table-issue">
                              <strong>
                                {issue.title ||
                                  "Untitled Issue"}
                              </strong>

                              <span>
                                {id || `IT-${index + 1}`}
                              </span>
                            </div>
                          </td>

                          <td>
                            {issue.lab_name ||
                              issue.lab ||
                              "—"}
                            <br />
                            <small>
                              {issue.pc_number ||
                                issue.pc ||
                                "—"}
                            </small>
                          </td>

                          <td>
                            {issue.category || "—"}
                          </td>

                          <td>
                            <span
                              className={`priority-badge priority-${String(
                                issue.priority || "Medium"
                              ).toLowerCase()}`}
                            >
                              {issue.priority || "Medium"}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`status-badge status-${String(
                                issue.status || "Open"
                              )
                                .toLowerCase()
                                .replaceAll(" ", "-")}`}
                            >
                              {issue.status || "Open"}
                            </span>
                          </td>

                          <td>
                            <div className="action-buttons">

                              <button
                                className="icon-button"
                                title="View"
                                onClick={() =>
                                  navigate(
                                    `/issues/${id}`
                                  )
                                }
                              >
                                <Eye size={17} />
                              </button>

                              <button
                                className="icon-button danger"
                                title="Delete"
                                onClick={() =>
                                  deleteIssue(id)
                                }
                              >
                                <Trash2 size={17} />
                              </button>

                            </div>
                          </td>

                        </tr>
                      );
                    })}

                  </tbody>
                </table>

              </div>
            )}

          </section>

        </main>
      </div>
    </div>
  );
}

export default Issues;