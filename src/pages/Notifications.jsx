import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  AlertCircle,
  ClipboardList,
  Info,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { api } from "../services/api";

function Notifications() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await api.getNotifications();

      const data =
        response.notifications ||
        response.data ||
        response ||
        [];

      setNotifications(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    try {
      await api.markNotificationRead(id);

      setNotifications((previous) =>
        previous.map((notification) =>
          (notification.notification_id ||
            notification.id) === id
            ? {
                ...notification,
                is_read: 1,
                read: true,
              }
            : notification
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "ISSUE_CREATED":
        return <ClipboardList size={20} />;

      case "STATUS_CHANGED":
        return <AlertCircle size={20} />;

      case "ISSUE_RESOLVED":
        return <Check size={20} />;

      default:
        return <Info size={20} />;
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

          <div className="page-header">
            <div>
              <span className="eyebrow">UPDATES</span>
              <h1>Notifications</h1>
              <p>
                Stay updated about your reported issues.
              </p>
            </div>
          </div>

          <section className="content-card">

            {loading ? (
              <div className="empty-state">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="empty-state">
                <Bell size={40} />
                <h3>No notifications</h3>
                <p>
                  You're all caught up.
                </p>
              </div>
            ) : (
              <div className="notification-list">

                {notifications.map(
                  (notification, index) => {

                    const id =
                      notification.notification_id ||
                      notification.id ||
                      index;

                    const unread =
                      !notification.is_read &&
                      !notification.read;

                    return (
                      <div
                        key={id}
                        className={`notification-item ${
                          unread ? "unread" : ""
                        }`}
                      >

                        <div className="notification-icon">
                          {getIcon(
                            notification.notification_type ||
                              notification.type
                          )}
                        </div>

                        <div className="notification-content">

                          <h3>
                            {notification.title ||
                              "Notification"}
                          </h3>

                          <p>
                            {notification.message ||
                              "You have a new notification."}
                          </p>

                          <small>
                            {notification.created_at
                              ? new Date(
                                  notification.created_at
                                ).toLocaleString()
                              : ""}
                          </small>

                        </div>

                        {unread && (
                          <button
                            className="notification-read"
                            onClick={() =>
                              markRead(id)
                            }
                          >
                            <Check size={17} />
                            Mark read
                          </button>
                        )}

                      </div>
                    );
                  }
                )}

              </div>
            )}

          </section>

        </main>
      </div>
    </div>
  );
}

export default Notifications;