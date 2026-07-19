import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Loader from "../components/ui/Loader";
import Toast from "../components/ui/Toast";

function Dashboard() {
  const [myFarmers, setMyFarmers] = useState([]);
  const [allFarmersCount, setAllFarmersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchFarmers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/farmers");
      const data = await res.json();
      if (data.success) {
        setAllFarmersCount(data.count);
        const mine = data.data.filter(
          (f) => f.owner === user.id || f.owner?._id === user.id
        );
        setMyFarmers(mine);
      }
    } catch (err) {
      showToast("Failed to fetch farmers list", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchFarmers();
  }, [token, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this farmer listing?")) return;
    try {
      setDeletingId(id);
      const res = await fetch(`http://localhost:5000/api/farmers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        showToast("Farmer deleted successfully!");
        fetchFarmers();
      } else {
        showToast(data.message || "Failed to delete farmer", "error");
      }
    } catch (err) {
      showToast("Error connecting to server", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const stats = [
    { label: "My Listings", value: myFarmers.length, icon: "🌾", color: "#16a34a", bg: "rgba(22,163,74,0.1)", desc: "Farmer profiles you manage" },
    { label: "Total Marketplace", value: allFarmersCount, icon: "🌍", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", desc: "All farmers on platform" },
    { label: "Account Status", value: "Active", icon: "✅", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", desc: "Your account is verified" },
  ];

  return (
    <>
      <style>{`
        @keyframes dashFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dashScale {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes dashFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes heroShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .dash-stat-card {
          background: #fff;
          border-radius: 20px;
          padding: 28px;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 4px 16px -4px rgba(0,0,0,0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          animation: dashFadeUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .dash-stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px -8px rgba(0,0,0,0.12);
          border-color: #bbf7d0;
        }
        .dash-farmer-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 16px -4px rgba(0,0,0,0.06);
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease, border-color 0.28s ease;
          animation: dashFadeUp 0.5s ease-out forwards;
          opacity: 0;
        }
        .dash-farmer-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 50px -10px rgba(0,0,0,0.14);
          border-color: #86efac;
        }
        .dash-btn-edit {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: 10px;
          border: 1.5px solid #cbd5e1;
          background: #fff;
          color: #334155;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }
        .dash-btn-edit:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
          transform: translateY(-1px);
        }
        .dash-btn-delete {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: #fff;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(239,68,68,0.22);
          font-family: inherit;
        }
        .dash-btn-delete:hover:not(:disabled) {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(239,68,68,0.32);
        }
        .dash-btn-delete:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
        .dash-empty-state {
          background: #fff;
          border-radius: 24px;
          border: 2px dashed #cbd5e1;
          padding: 80px 24px;
          text-align: center;
          transition: all 0.3s ease;
          animation: dashScale 0.4s ease-out forwards;
        }
        .dash-empty-state:hover {
          border-color: #86efac;
          background: #f0fdf4;
        }
        .dash-add-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 12px;
          background: #fff;
          color: #15803d;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          transition: all 0.25s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .dash-add-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.2);
          background: #f0fdf4;
        }
      `}</style>

      <Navbar />

      {/* ── Hero ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #14532d 0%, #15803d 40%, #166534 100%)",
          backgroundSize: "200% 200%",
          animation: "heroShift 10s ease infinite",
          padding: "130px 24px 90px",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 60% at 65% 40%, rgba(74,222,128,0.18) 0%, transparent 70%)",
        }} />
        {/* wave bottom */}
        <div style={{
          position: "absolute", bottom: -2, left: 0, right: 0, height: 56,
          background: "#f8fafc",
          clipPath: "ellipse(55% 100% at 50% 100%)",
        }} />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "28px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* User info */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* avatar */}
            <div style={{
              width: 68, height: 68, borderRadius: "50%",
              background: "linear-gradient(135deg, #4ade80, #16a34a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.7rem", fontWeight: 800, color: "#fff",
              border: "3px solid rgba(255,255,255,0.28)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
              flexShrink: 0,
            }}>
              {(user.name || "F")[0].toUpperCase()}
            </div>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "5px 14px", borderRadius: 99,
                fontSize: "0.75rem", fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: 10,
              }}>
                🔐 Verified Account
              </div>
              <h1 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 800, margin: "0 0 6px", lineHeight: 1.2,
              }}>
                Welcome back, {user.name || "Farmer"}! 👋
              </h1>
              <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.95rem", margin: 0 }}>
                📧 {user.email || "user@example.com"}
              </p>
            </div>
          </div>

          <Link to="/add-farmer" className="dash-add-cta">
            <span style={{ fontSize: "1.1rem" }}>➕</span>
            Register New Farmer
          </Link>
        </div>
      </div>

      {/* ── Main ── */}
      <main style={{ background: "#f8fafc", minHeight: "50vh", padding: "52px 24px 100px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px", marginBottom: "52px",
          }}>
            {stats.map((stat, i) => (
              <div key={i} className="dash-stat-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{
                  width: 62, height: 62, borderRadius: 18, flexShrink: 0,
                  background: stat.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.7rem",
                }}>
                  {stat.icon}
                </div>
                <div>
                  <p style={{ color: "#64748b", fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>
                    {stat.label}
                  </p>
                  <p style={{
                    color: stat.color,
                    fontSize: typeof stat.value === "string" ? "1.2rem" : "2rem",
                    fontWeight: 800, margin: "4px 0 2px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    {stat.value}
                  </p>
                  <p style={{ color: "#94a3b8", fontSize: "0.78rem", margin: 0 }}>{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section header */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            marginBottom: 28,
          }}>
            <span style={{ fontSize: "1.3rem" }}>🌾</span>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: 0,
            }}>
              My Managed Listings
            </h2>
            <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg,#dcfce7,transparent)", borderRadius: 99 }} />
            {!loading && myFarmers.length > 0 && (
              <span style={{
                background: "#dcfce7", color: "#15803d",
                fontSize: "0.75rem", fontWeight: 700,
                padding: "4px 12px", borderRadius: 99,
              }}>
                {myFarmers.length} listing{myFarmers.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Content */}
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 24px", gap: 20 }}>
              <Loader size="52px" />
              <p style={{ color: "#64748b", fontWeight: 500 }}>Loading your farmer listings…</p>
            </div>
          ) : myFarmers.length === 0 ? (
            <div className="dash-empty-state">
              <div style={{ fontSize: "4rem", marginBottom: 20, animation: "dashFloat 3s ease-in-out infinite" }}>🚜</div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "1.25rem", fontWeight: 700, color: "#1e293b", margin: "0 0 10px",
              }}>
                No listings registered yet
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.95rem", maxWidth: 380, margin: "0 auto 28px", lineHeight: 1.6 }}>
                Add your first farmer to list them on the live AgriConnect marketplace and reach more buyers.
              </p>
              <Link
                to="/add-farmer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "13px 30px", borderRadius: 12,
                  background: "linear-gradient(135deg,#15803d,#16a34a)",
                  color: "#fff", fontWeight: 700, textDecoration: "none",
                  fontSize: "0.95rem",
                  boxShadow: "0 8px 24px rgba(22,163,74,0.25)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(22,163,74,0.35)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 24px rgba(22,163,74,0.25)"; }}
              >
                ➕ Add Your First Farmer
              </Link>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 24,
            }}>
              {myFarmers.map((farmer, i) => (
                <div
                  key={farmer._id || farmer.id}
                  className="dash-farmer-card"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div style={{ padding: 24, flexGrow: 1 }}>
                    <Card
                      name={farmer.name}
                      crop={farmer.crop}
                      village={farmer.village}
                      phone={farmer.phone}
                      rating={farmer.rating}
                    />
                  </div>
                  <div style={{
                    borderTop: "1px solid #f1f5f9",
                    background: "linear-gradient(180deg,#f8fafc 0%,#fff 100%)",
                    padding: "16px 24px",
                    display: "flex", justifyContent: "flex-end", gap: 10,
                  }}>
                    <button
                      className="dash-btn-edit"
                      onClick={() => navigate(`/edit-farmer/${farmer._id || farmer.id}`)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="dash-btn-delete"
                      onClick={() => handleDelete(farmer._id || farmer.id)}
                      disabled={deletingId === (farmer._id || farmer.id)}
                    >
                      {deletingId === (farmer._id || farmer.id)
                        ? <Loader size="16px" />
                        : "🗑️"
                      }{" "}Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {toast && <Toast message={toast.message} type={toast.type} />}
      <Footer />
    </>
  );
}

export default Dashboard;
