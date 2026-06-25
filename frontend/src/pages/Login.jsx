import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const [tab, setTab] = useState("login"); // "login" | "register"
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder — connect to API
    alert(`${tab === "login" ? "Login" : "Registration"} submitted!`);
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f0fdf4 0%, #fff 40%, #f0fdf4 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 24px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorations */}
        <div aria-hidden style={{ position:"absolute", top:"-100px", right:"-100px", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle,rgba(22,163,74,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div aria-hidden style={{ position:"absolute", bottom:"-60px", left:"-60px", width:"280px", height:"280px", borderRadius:"50%", background:"radial-gradient(circle,rgba(250,204,21,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />

        <div
          style={{
            width: "100%",
            maxWidth: "440px",
            position: "relative",
          }}
        >
          {/* Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-xl)",
              border: "1px solid var(--gray-100)",
              overflow: "hidden",
            }}
          >
            {/* Top accent */}
            <div
              style={{
                height: "5px",
                background: "linear-gradient(90deg, #052e16, #16a34a, #4ade80)",
              }}
            />

            <div style={{ padding: "40px 36px" }}>
              {/* Logo */}
              <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, #16a34a, #4ade80)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    margin: "0 auto 12px",
                    boxShadow: "0 8px 24px rgba(22,163,74,0.28)",
                  }}
                >
                  🌿
                </div>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "1.6rem",
                    color: "var(--gray-900)",
                    marginBottom: "4px",
                  }}
                >
                  {tab === "login" ? "Welcome Back" : "Join AgriConnect"}
                </h1>
                <p style={{ color: "var(--gray-400)", fontSize: "0.875rem" }}>
                  {tab === "login"
                    ? "Sign in to your AgriConnect account"
                    : "Create your free account today"}
                </p>
              </div>

              {/* Tab switcher */}
              <div
                style={{
                  display: "flex",
                  background: "var(--gray-100)",
                  borderRadius: "10px",
                  padding: "4px",
                  marginBottom: "28px",
                }}
              >
                {["login", "register"].map((t) => (
                  <button
                    key={t}
                    id={`auth-tab-${t}`}
                    onClick={() => setTab(t)}
                    style={{
                      flex: 1,
                      padding: "9px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      transition: "all 0.2s ease",
                      background: tab === t ? "#fff" : "transparent",
                      color: tab === t ? "var(--gray-900)" : "var(--gray-500)",
                      boxShadow: tab === t ? "var(--shadow-sm)" : "none",
                    }}
                  >
                    {t === "login" ? "Sign In" : "Register"}
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Name — only for register */}
                {tab === "register" && (
                  <div>
                    <label
                      htmlFor="auth-name"
                      style={{ display: "block", fontSize: "0.825rem", fontWeight: 600, color: "var(--gray-700)", marginBottom: "6px" }}
                    >
                      Full Name
                    </label>
                    <input
                      id="auth-name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "10px",
                        border: "1.5px solid var(--gray-200)",
                        fontSize: "0.9rem",
                        color: "var(--gray-800)",
                        outline: "none",
                        transition: "border-color 0.2s",
                        background: "#fafafa",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--gray-200)")}
                    />
                  </div>
                )}

                {/* Email */}
                <div>
                  <label
                    htmlFor="auth-email"
                    style={{ display: "block", fontSize: "0.825rem", fontWeight: 600, color: "var(--gray-700)", marginBottom: "6px" }}
                  >
                    Email Address
                  </label>
                  <input
                    id="auth-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1.5px solid var(--gray-200)",
                      fontSize: "0.9rem",
                      color: "var(--gray-800)",
                      outline: "none",
                      transition: "border-color 0.2s",
                      background: "#fafafa",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--gray-200)")}
                  />
                </div>

                {/* Password */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label
                      htmlFor="auth-password"
                      style={{ fontSize: "0.825rem", fontWeight: 600, color: "var(--gray-700)" }}
                    >
                      Password
                    </label>
                    {tab === "login" && (
                      <a href="#" style={{ fontSize: "0.8rem", color: "#16a34a", textDecoration: "none", fontWeight: 500 }}>
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div style={{ position: "relative" }}>
                    <input
                      id="auth-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 44px 12px 14px",
                        borderRadius: "10px",
                        border: "1.5px solid var(--gray-200)",
                        fontSize: "0.9rem",
                        color: "var(--gray-800)",
                        outline: "none",
                        transition: "border-color 0.2s",
                        background: "#fafafa",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--gray-200)")}
                    />
                    <button
                      type="button"
                      id="auth-toggle-password"
                      onClick={() => setShowPassword((v) => !v)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1rem",
                        color: "var(--gray-400)",
                        padding: "0",
                      }}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  id="auth-submit-btn"
                  type="submit"
                  style={{
                    marginTop: "8px",
                    width: "100%",
                    padding: "14px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #16a34a, #22c55e)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(22,163,74,0.35)",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 8px 28px rgba(22,163,74,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(22,163,74,0.35)";
                  }}
                >
                  {tab === "login" ? "Sign In →" : "Create Account →"}
                </button>
              </form>

              {/* Divider */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  margin: "24px 0",
                }}
              >
                <div style={{ flex: 1, height: "1px", background: "var(--gray-200)" }} />
                <span style={{ color: "var(--gray-400)", fontSize: "0.8rem" }}>or continue with</span>
                <div style={{ flex: 1, height: "1px", background: "var(--gray-200)" }} />
              </div>

              {/* Social buttons (placeholder) */}
              <div style={{ display: "flex", gap: "12px" }}>
                {[
                  { icon: "G", label: "Google", color: "#db4437" },
                  { icon: "f", label: "Facebook", color: "#1877f2" },
                ].map((s) => (
                  <button
                    key={s.label}
                    id={`auth-${s.label.toLowerCase()}-btn`}
                    style={{
                      flex: 1,
                      padding: "11px",
                      borderRadius: "10px",
                      border: "1.5px solid var(--gray-200)",
                      background: "#fff",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: s.color,
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f9fafb";
                      e.currentTarget.style.borderColor = s.color + "55";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.style.borderColor = "var(--gray-200)";
                    }}
                  >
                    {s.icon}
                    <span style={{ fontSize: "0.8rem", color: "var(--gray-600)" }}>{s.label}</span>
                  </button>
                ))}
              </div>

              <p style={{ textAlign: "center", marginTop: "24px", color: "var(--gray-400)", fontSize: "0.825rem" }}>
                {tab === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                  id={`auth-switch-to-${tab === "login" ? "register" : "login"}`}
                  onClick={() => setTab(tab === "login" ? "register" : "login")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#16a34a",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "0.825rem",
                    padding: 0,
                  }}
                >
                  {tab === "login" ? "Create account" : "Sign in"}
                </button>
              </p>
            </div>
          </div>

          {/* Back to home */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link
              to="/"
              style={{
                color: "var(--gray-400)",
                fontSize: "0.825rem",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#16a34a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray-400)")}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;