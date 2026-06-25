import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/about", label: "About" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(255,255,255,0.92)"
          : "rgba(255,255,255,0.0)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(22,163,74,0.12)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          id="nav-logo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #16a34a, #4ade80)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              boxShadow: "0 4px 12px rgba(22,163,74,0.3)",
            }}
          >
            🌿
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.3rem",
              background: "linear-gradient(135deg, #15803d, #16a34a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AgriConnect
          </span>
        </Link>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                id={`nav-${link.label.toLowerCase()}`}
                style={{
                  padding: "8px 18px",
                  borderRadius: "99px",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  background: isActive
                    ? "linear-gradient(135deg, #16a34a, #22c55e)"
                    : "transparent",
                  color: isActive ? "#fff" : scrolled ? "#374151" : "#fff",
                  boxShadow: isActive
                    ? "0 4px 14px rgba(22,163,74,0.35)"
                    : "none",
                  textShadow: !isActive && !scrolled
                    ? "0 1px 3px rgba(0,0,0,0.3)"
                    : "none",
                }}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            to="/login"
            id="nav-login"
            style={{
              marginLeft: "8px",
              padding: "9px 22px",
              borderRadius: "99px",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
              background: "linear-gradient(135deg, #16a34a, #22c55e)",
              color: "#fff",
              boxShadow: "0 4px 14px rgba(22,163,74,0.35)",
              transition: "all 0.25s ease",
              border: "2px solid transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(22,163,74,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(22,163,74,0.35)";
            }}
          >
            Get Started
          </Link>
        </div>

        {/* Hamburger */}
        <button
          id="nav-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
          }}
          className="hamburger-btn"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                borderRadius: "2px",
                background: scrolled ? "#374151" : "#fff",
                transition: "all 0.3s",
                transform:
                  menuOpen && i === 0
                    ? "rotate(45deg) translate(5px, 5px)"
                    : menuOpen && i === 1
                    ? "scaleX(0)"
                    : menuOpen && i === 2
                    ? "rotate(-45deg) translate(5px, -5px)"
                    : "none",
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(22,163,74,0.12)",
            padding: "16px 24px 24px",
            animation: "slideDown 0.25s ease",
          }}
        >
          {[...navLinks, { to: "/login", label: "Get Started" }].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                display: "block",
                padding: "14px 0",
                borderBottom: "1px solid #f3f4f6",
                fontWeight: 500,
                color: "#374151",
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

export default Navbar;