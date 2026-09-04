import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  ClipboardList,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { api } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const total = issues.length;

  const open = issues.filter(
    (issue) =>
      ["Open", "OPEN", "open"].includes(issue.status)
  ).length;

  const inProgress = issues.filter(
    (issue) =>
      ["In Progress", "IN_PROGRESS", "in_progress"].includes(
        issue.status
      )
  ).length;

  const resolved = issues.filter(
    (issue) =>
      ["Resolved", "RESOLVED", "resolved", "Closed", "CLOSED"].includes(
        issue.status
      )
  ).length;

  const stats = [
    {
      title: "Total Issues",
      value: total,
      icon: ClipboardList,
    },
    {
      title: "Open",
      value: open,
      icon: AlertCircle,
    },
    {
      title: "In Progress",
      value: inProgress,
      icon: Clock,
    },
    {
      title: "Resolved",
      value: resolved,
      icon: CheckCircle,
    },
  ];

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
              <span className="eyebrow">OVERVIEW</span>
              <h1>Dashboard</h1>
              <p>
                Monitor and manage your IT laboratory issues.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => navigate("/create-issue")}
            >
              <Plus size={18} />
              Report Issue
            </button>
          </div>

          <div className="stats-grid">

            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div className="stat-card" key={stat.title}>
                  <div className="stat-top">
                    <div className="stat-icon">
                      <Icon size={20} />
                    </div>
                  </div>

                  <div className="stat-value">
                    {loading ? "—" : stat.value}
                  </div>

                  <div className="stat-title">
                    {stat.title}
                  </div>
                </div>
              );
            })}

          </div>

          <section className="content-card">

            <div className="card-header">
              <div>
                <h2>Recent Issues</h2>
                <p>Latest reported laboratory problems.</p>
              </div>

              <button
                className="text-button"
                onClick={() => navigate("/issues")}
              >
                View all
                <ArrowRight size={16} />
              </button>
            </div>

            {loading ? (
              <div className="empty-state">
                Loading issues...
              </div>
            ) : issues.length === 0 ? (
              <div className="empty-state">
                <ClipboardList size={36} />
                <h3>No issues reported</h3>
                <p>
                  Your laboratory currently has no reported issues.
                </p>

                <button
                  className="secondary-button"
                  onClick={() => navigate("/create-issue")}
                >
                  Report first issue
                </button>
              </div>
            ) : (
              <div className="issue-list">

                {issues.slice(0, 5).map((issue, index) => (
                  <div className="issue-row" key={issue.issue_id || issue.id || index}>

                    <div className="issue-main">
                      <div className="issue-number">
                        {issue.issue_id || issue.id || `IT-${index + 1}`}
                      </div>

                      <div>
                        <h3>
                          {issue.title || "Untitled Issue"}
                        </h3>

                        <p>
                          {issue.lab_name ||
                            issue.lab ||
                            "Laboratory"}{" "}
                          •{" "}
                          {issue.pc_number ||
                            issue.pc ||
                            "Computer"}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`status-badge status-${String(
                        issue.status || "Open"
                      )
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {issue.status || "Open"}
                    </span>

                  </div>
                ))}

              </div>
            )}

          </section>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;