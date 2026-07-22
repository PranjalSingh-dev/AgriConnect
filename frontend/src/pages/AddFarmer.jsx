import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Toast from "../components/ui/Toast";
import Loader from "../components/ui/Loader";

function AddFarmer() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    crop: "",
    village: "",
    phone: "",
    rating: "5.0",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [toast, setToast] = useState(null);

  const token = localStorage.getItem("token");

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (isEditMode) {
      const fetchFarmerDetails = async () => {
        try {
          setFetching(true);
          const res = await fetch(`http://localhost:5000/api/farmers/${id}`);
          const data = await res.json();
          if (data.success) {
            setForm({
              name: data.data?.name || "",
              crop: data.data?.crop || "",
              village: data.data?.village || "",
              phone: data.data?.phone || "",
              rating: data.data?.rating ? String(data.data.rating) : "5.0",
            });
          } else {
            showToast("Failed to fetch farmer details", "error");
          }
        } catch {
          showToast("Error connecting to server", "error");
        } finally {
          setFetching(false);
        }
      };

      fetchFarmerDetails();
    }
  }, [id, isEditMode, token, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name.trim().length < 3) {
      showToast("Name must be at least 3 characters", "error");
      return;
    }
    if (form.crop.trim().length < 2) {
      showToast("Crop must be at least 2 characters", "error");
      return;
    }
    if (form.village.trim().length < 2) {
      showToast("Village must be at least 2 characters", "error");
      return;
    }

    try {
      setLoading(true);

      const url = isEditMode
        ? `http://localhost:5000/api/farmers/${id}`
        : "http://localhost:5000/api/farmers";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          crop: form.crop,
          village: form.village,
          phone: form.phone,
          rating: parseFloat(form.rating) || 4.5,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(
          isEditMode ? "Farmer updated successfully!" : "Farmer added successfully!"
        );
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        showToast(data.message || "Operation failed", "error");
      }
    } catch {
      showToast("Connection error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes afFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes afFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33%       { transform: translateY(-18px) rotate(3deg); }
          66%       { transform: translateY(-8px) rotate(-2deg); }
        }
        @keyframes afPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.08); opacity: 0.9; }
        }
        .af-input {
          width: 100%;
          padding: 13px 16px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          color: #1e293b;
          background: #f8fafc;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          box-sizing: border-box;
        }
        .af-input:focus {
          border-color: #16a34a;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(22,163,74,0.12);
        }
        .af-input::placeholder { color: #94a3b8; }
        .af-label {
          display: block;
          font-size: 0.82rem;
          font-weight: 700;
          color: #374151;
          margin-bottom: 7px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .af-submit-btn {
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          background: linear-gradient(135deg, #15803d, #16a34a, #22c55e);
          background-size: 200% 200%;
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(22,163,74,0.32);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.25s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: 0.01em;
        }
        .af-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(22,163,74,0.42);
          background-position: right center;
        }
        .af-submit-btn:active:not(:disabled) { transform: translateY(0); }
        .af-submit-btn:disabled {
          opacity: 0.72;
          cursor: not-allowed;
        }
        .af-cancel-btn {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          background: transparent;
          border: 1.5px solid #e2e8f0;
          color: #64748b;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .af-cancel-btn:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
          color: #334155;
        }
        .af-form-card {
          animation: afFadeUp 0.6s ease-out forwards;
          width: 100%;
          max-width: 520px;
          position: relative;
          z-index: 1;
        }
        .af-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }
      `}</style>

      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #f0fdf4 0%, #ffffff 45%, #ecfdf5 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="af-blob"
          style={{
            width: 380,
            height: 380,
            background:
              "radial-gradient(circle, rgba(74,222,128,0.22) 0%, transparent 70%)",
            top: "5%",
            left: "-10%",
            animation: "afFloat 7s ease-in-out infinite",
          }}
        />
        <div
          className="af-blob"
          style={{
            width: 320,
            height: 320,
            background:
              "radial-gradient(circle, rgba(22,163,74,0.14) 0%, transparent 70%)",
            bottom: "10%",
            right: "-8%",
            animation: "afPulse 5s ease-in-out infinite",
          }}
        />
        <div
          className="af-blob"
          style={{
            width: 200,
            height: 200,
            background:
              "radial-gradient(circle, rgba(234,211,7,0.12) 0%, transparent 70%)",
            top: "30%",
            right: "15%",
            animation: "afFloat 9s ease-in-out infinite reverse",
          }}
        />

        <div className="af-form-card">
          <div
            style={{
              background: "#fff",
              borderRadius: 24,
              boxShadow:
                "0 20px 60px -10px rgba(0,0,0,0.1), 0 8px 20px -8px rgba(0,0,0,0.06)",
              border: "1px solid rgba(226,232,240,0.8)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 6,
                background:
                  "linear-gradient(90deg, #4f46e5, #7c3aed, #38bdf8, #7c3aed, #4f46e5)",
                backgroundSize: "300% 100%",
                animation: "heroShift 6s linear infinite",
              }}
            />

            {fetching ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "80px 24px",
                  gap: 18,
                }}
              >
                <Loader size="52px" />
                <p style={{ color: "#64748b", fontWeight: 500, margin: 0 }}>
                  Loading farmer details…
                </p>
              </div>
            ) : (
              <div style={{ padding: "44px 40px" }}>
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 18,
                      background:
                        "linear-gradient(135deg, #15803d, #22c55e)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.8rem",
                      margin: "0 auto 20px",
                      boxShadow: "0 10px 28px rgba(22,163,74,0.3)",
                    }}
                  >
                    🚜
                  </div>
                  <h1
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "1.7rem",
                      fontWeight: 800,
                      color: "#0f172a",
                      margin: "0 0 8px",
                    }}
                  >
                    {isEditMode ? "Edit Farmer Listing" : "Register a Farmer"}
                  </h1>
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "0.9rem",
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {isEditMode
                      ? "Update the details for this agricultural listing"
                      : "Create a new profile to list on the AgriConnect marketplace"}
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 22 }}
                >
                  <div>
                    <label className="af-label" htmlFor="name">
                      👤 Farmer Full Name
                    </label>
                    <input
                      id="name"
                      className="af-input"
                      name="name"
                      type="text"
                      placeholder="e.g. Rajesh Kumar"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="af-label" htmlFor="crop">
                      🌱 Primary Crop Grown
                    </label>
                    <input
                      id="crop"
                      className="af-input"
                      name="crop"
                      type="text"
                      placeholder="e.g. Wheat, Rice, Sugarcane"
                      value={form.crop}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="af-label" htmlFor="village">
                      📍 Village / District Location
                    </label>
                    <input
                      id="village"
                      className="af-input"
                      name="village"
                      type="text"
                      placeholder="e.g. Nainital, Uttarakhand"
                      value={form.village}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label className="af-label" htmlFor="phone">
                        📞 Phone Number
                      </label>
                      <input
                        id="phone"
                        className="af-input"
                        name="phone"
                        type="text"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="af-label" htmlFor="rating">
                        ⭐ Rating (1–5)
                      </label>
                      <input
                        id="rating"
                        className="af-input"
                        name="rating"
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={form.rating}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div style={{ height: 1, background: "#f1f5f9", margin: "4px 0" }} />

                  <button
                    type="submit"
                    className="af-submit-btn"
                    disabled={loading}
                  >
                    {loading && <Loader size="20px" />}
                    {loading
                      ? "Saving…"
                      : isEditMode
                      ? "✅ Update Farmer Listing"
                      : "🌾 Register Farmer"}
                  </button>

                  <button
                    type="button"
                    className="af-cancel-btn"
                    onClick={() => navigate("/dashboard")}
                  >
                    ← Back to Dashboard
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
      <Footer />
    </>
  );
}

export default AddFarmer;

