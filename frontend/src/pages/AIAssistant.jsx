import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/ui/Loader";
import Toast from "../components/ui/Toast";
import API_BASE_URL from "../config/api";

function AIAssistant() {
  const [crop, setCrop] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [advice, setAdvice] = useState(null);
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("agri_ai_history");
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleGetAdvice = async (e) => {
    e.preventDefault();
    if (!crop.trim() || !symptoms.trim()) {
      setError("Please fill out both the Crop Name and Symptoms.");
      return;
    }

    setLoading(true);
    setError("");
    setAdvice(null);
    setCopied(false);

    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/crop-advice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crop: crop.trim(),
          symptoms: symptoms.trim(),
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to generate AI advice.");
      }

      setAdvice(result.data);

      const newItem = {
        crop: crop.trim(),
        symptoms: symptoms.trim(),
        advice: result.data,
        date: new Date().toLocaleDateString(),
      };
      const updated = [newItem, ...history.slice(0, 4)];
      setHistory(updated);
      localStorage.setItem("agri_ai_history", JSON.stringify(updated));

      showToast("Diagnosis generated successfully!");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (c, s) => {
    setCrop(c);
    setSymptoms(s);
    setError("");
    setAdvice(null);
  };

  const handleCopyAdvice = () => {
    if (!advice) return;
    const text = `🌱 AgriConnect Crop Diagnosis for ${crop}:
• Disease: ${advice.disease}
• Cause: ${advice.cause}
• Treatment: ${advice.treatment}
• Prevention: ${advice.prevention}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast("Diagnosis report copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          paddingTop: "120px",
          paddingBottom: "80px",
          background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 40%, #f8fafc 100%)",
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div style={{ marginBottom: "40px", textAlign: "center" }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(79, 70, 229, 0.1)",
                color: "#4f46e5",
                border: "1px solid rgba(79, 70, 229, 0.25)",
                borderRadius: "99px",
                padding: "6px 20px",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              🤖 Smart Farming Advisor
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                color: "var(--gray-900)",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                marginBottom: "12px",
                letterSpacing: "-0.02em",
              }}
            >
              AI-Powered Crop Advisor
            </h1>
            <p style={{ color: "var(--gray-500)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
              Diagnose crop diseases instantly and receive expert recommendations on growth and prevention.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "32px",
              alignItems: "start",
            }}
          >
            {/* Left: Input Form Card */}
            <div
              style={{
                background: "#ffffff",
                border: "1px solid rgba(79, 70, 229, 0.15)",
                borderRadius: "24px",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.04)",
                padding: "32px",
                position: "relative",
              }}
            >
              <h2
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: "var(--gray-800)",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                🔬 Plant Diagnosis Form
              </h2>

              <form onSubmit={handleGetAdvice}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="advisor-crop"
                    style={{
                      display: "block",
                      fontWeight: 700,
                      color: "var(--gray-700)",
                      marginBottom: "8px",
                      fontSize: "0.95rem",
                    }}
                  >
                    Crop Name
                  </label>
                  <input
                    type="text"
                    id="advisor-crop"
                    placeholder="e.g., Tomato, Wheat, Cotton, Rice"
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1.5px solid var(--gray-200)",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--gray-200)")}
                  />
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label
                    htmlFor="advisor-symptoms"
                    style={{
                      display: "block",
                      fontWeight: 700,
                      color: "var(--gray-700)",
                      marginBottom: "8px",
                      fontSize: "0.95rem",
                    }}
                  >
                    Symptoms
                  </label>
                  <textarea
                    id="advisor-symptoms"
                    placeholder="Describe leaves, stem, or growth issues (e.g. Leaves turning yellow with brown spots, slow growth, white powdery residue)"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1.5px solid var(--gray-200)",
                      fontSize: "1rem",
                      outline: "none",
                      resize: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--gray-200)")}
                  />
                </div>

                {error && (
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "rgba(239, 68, 68, 0.08)",
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                      borderRadius: "12px",
                      color: "#dc2626",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      marginBottom: "20px",
                    }}
                  >
                    ⚠️ {error}
                  </div>
                )}

                <button
                  type="submit"
                  id="advisor-submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "14px 24px",
                    borderRadius: "12px",
                    border: "none",
                    background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
                    color: "#ffffff",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: "0 6px 20px rgba(79, 70, 229, 0.3)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(22, 163, 74, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(22, 163, 74, 0.2)";
                    }
                  }}
                >
                  {loading ? "Analyzing Crop Symptoms..." : "Get AI Advice"}
                </button>
              </form>

              {/* Quick Fill suggestions */}
              <div style={{ marginTop: "28px", borderTop: "1px solid var(--gray-100)", paddingTop: "20px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase" }}>
                  Quick Sample Prompts
                </span>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "10px" }}>
                  <button
                    onClick={() => handleQuickFill("Tomato", "Leaves turning yellow with dark brown spots")}
                    style={{
                      background: "var(--gray-50)",
                      border: "1px solid var(--gray-200)",
                      borderRadius: "8px",
                      padding: "6px 12px",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--gray-200)")}
                  >
                    🍅 Tomato Blight
                  </button>
                  <button
                    onClick={() => handleQuickFill("Wheat", "Brown leaf rust lesions and dry tips")}
                    style={{
                      background: "var(--gray-50)",
                      border: "1px solid var(--gray-200)",
                      borderRadius: "8px",
                      padding: "6px 12px",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--gray-200)")}
                  >
                    🌾 Wheat Rust
                  </button>
                  <button
                    onClick={() => handleQuickFill("Rice", "Spindle shaped lesions on leaves with pale green centers")}
                    style={{
                      background: "var(--gray-50)",
                      border: "1px solid var(--gray-200)",
                      borderRadius: "8px",
                      padding: "6px 12px",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--gray-200)")}
                  >
                    🍚 Rice Blast
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Results / Output Card */}
            <div
              style={{
                background: "#ffffff",
                border: "1px solid rgba(22, 163, 74, 0.12)",
                borderRadius: "24px",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.04)",
                padding: "32px",
                minHeight: "410px",
                display: "flex",
                flexDirection: "column",
                justifyContent: loading || advice ? "flex-start" : "center",
              }}
            >
              {/* State 1: Idle state */}
              {!loading && !advice && (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🌿</div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--gray-800)", marginBottom: "8px" }}>
                    Diagnosis Ready
                  </h3>
                  <p style={{ color: "var(--gray-400)", maxWidth: "280px", margin: "0 auto", fontSize: "0.95rem" }}>
                    Fill out the form and submit to receive instant AI crop treatment guidelines.
                  </p>
                </div>
              )}

              {/* State 2: Loading State */}
              {loading && (
                <div
                  id="advisor-loader"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    padding: "40px 0",
                  }}
                >
                  <Loader size="54px" color="#16a34a" />
                  <h3
                    style={{
                      marginTop: "20px",
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      color: "var(--gray-800)",
                    }}
                  >
                    Analyzing crop...
                  </h3>
                  <p style={{ color: "var(--gray-400)", fontSize: "0.9rem", marginTop: "6px" }}>
                    Gemini AI is examining crop symptoms...
                  </p>
                </div>
              )}

              {/* State 3: Output Card */}
              {advice && (
                <div id="advisor-output" style={{ animation: "scaleIn 0.3s ease-out" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        background: "rgba(22, 163, 74, 0.08)",
                        color: "#16a34a",
                        borderRadius: "8px",
                        padding: "4px 10px",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                      }}
                    >
                      Diagnosis Report
                    </span>
                    <button
                      onClick={handleCopyAdvice}
                      style={{
                        background: copied ? "#dcfce7" : "#f1f5f9",
                        color: copied ? "#15803d" : "#475569",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {copied ? "✓ Copied" : "📋 Copy Advice"}
                    </button>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase" }}>
                      Possible Issue
                    </span>
                    <h3 style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--gray-800)", marginTop: "4px" }}>
                      {advice.disease}
                    </h3>
                  </div>

                  <div style={{ gridTemplateColumns: "1fr", display: "grid", gap: "16px", marginTop: "24px" }}>
                    <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid var(--gray-100)" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase" }}>
                        Cause
                      </span>
                      <p style={{ color: "var(--gray-700)", fontSize: "0.95rem", marginTop: "4px", lineHeight: 1.6 }}>
                        {advice.cause}
                      </p>
                    </div>

                    <div style={{ background: "#f0fdf4", padding: "16px", borderRadius: "12px", border: "1px solid rgba(22, 163, 74, 0.15)" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#15803d", textTransform: "uppercase" }}>
                        Treatment & Solutions
                      </span>
                      <p style={{ color: "#166534", fontSize: "0.95rem", marginTop: "4px", lineHeight: 1.6, fontWeight: 500 }}>
                        {advice.treatment}
                      </p>
                    </div>

                    <div style={{ background: "#fffbeb", padding: "16px", borderRadius: "12px", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#b45309", textTransform: "uppercase" }}>
                        Prevention / Precautions
                      </span>
                      <p style={{ color: "#78350f", fontSize: "0.95rem", marginTop: "4px", lineHeight: 1.6 }}>
                        {advice.prevention}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent History Section */}
          {history.length > 0 && (
            <div style={{ marginTop: "60px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--gray-800)", marginBottom: "16px" }}>
                📜 Recent AI Diagnoses
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                {history.map((h, idx) => (
                  <div
                    key={idx}
                    onClick={() => { setCrop(h.crop); setSymptoms(h.symptoms); setAdvice(h.advice); }}
                    style={{
                      background: "#fff",
                      borderRadius: "16px",
                      padding: "16px",
                      border: "1px solid var(--gray-200)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--gray-200)")}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontWeight: 700, color: "#16a34a", fontSize: "0.9rem" }}>🌾 {h.crop}</span>
                      <span style={{ fontSize: "0.75rem", color: "var(--gray-400)" }}>{h.date}</span>
                    </div>
                    <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--gray-800)", margin: "4px 0" }}>
                      {h.advice?.disease}
                    </p>
                    <p style={{ fontSize: "0.78rem", color: "var(--gray-500)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {h.symptoms}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
      <Footer />
    </>
  );
}

export default AIAssistant;
