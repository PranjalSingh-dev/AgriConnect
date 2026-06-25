import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

const features = [
  {
    icon: "🛒",
    title: "Direct Marketplace",
    desc: "Browse and purchase fresh produce directly from farmers, cutting out middlemen and ensuring fair prices for everyone.",
    color: "#16a34a",
  },
  {
    icon: "🤝",
    title: "Trusted Connections",
    desc: "Every farmer is verified. Build lasting relationships with reliable agricultural producers across India.",
    color: "#0284c7",
  },
  {
    icon: "📊",
    title: "Market Insights",
    desc: "Stay informed with real-time price trends, seasonal forecasts, and demand analytics to make smarter decisions.",
    color: "#7c3aed",
  },
  {
    icon: "🚚",
    title: "Seamless Logistics",
    desc: "Integrated delivery coordination ensures your products reach buyers fresh, fast, and on time.",
    color: "#d97706",
  },
];

const sampleFarmers = [
  { name: "Ramesh Kumar", crop: "Wheat", village: "Amritsar, Punjab", rating: 5 },
  { name: "Suresh Patel", crop: "Cotton", village: "Surat, Gujarat", rating: 4 },
  { name: "Priya Devi",   crop: "Rice",  village: "Patna, Bihar",   rating: 5 },
];

const steps = [
  { num: "01", title: "Create Your Profile", desc: "Sign up as a farmer or buyer in under 2 minutes. Verify your identity for trusted access." },
  { num: "02", title: "List or Browse",       desc: "Farmers list their products with photos and prices. Buyers discover quality produce." },
  { num: "03", title: "Connect & Transact",   desc: "Communicate directly, negotiate fair prices, and finalize secure transactions." },
];

function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      {/* ─── Features Section ─────────────────────────────────── */}
      <section
        style={{
          padding: "100px 24px",
          background: "#fff",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Section label */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "64px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: "#f0fdf4",
                color: "#16a34a",
                border: "1px solid #bbf7d0",
                borderRadius: "99px",
                padding: "6px 18px",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              What We Offer
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "var(--gray-900)",
                marginBottom: "16px",
                lineHeight: 1.2,
              }}
            >
              Everything You Need to{" "}
              <span className="gradient-text">Grow & Sell</span>
            </h2>
            <p
              style={{
                color: "var(--gray-500)",
                fontSize: "1.05rem",
                maxWidth: "520px",
                margin: "0 auto",
              }}
            >
              A complete ecosystem for modern agricultural commerce, built with
              farmers and buyers in mind.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {features.map((f, i) => (
              <div
                key={f.title}
                style={{
                  background: "#fff",
                  border: "1px solid var(--gray-100)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px 28px",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all 0.3s ease",
                  cursor: "default",
                  animationDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                  e.currentTarget.style.borderColor = `${f.color}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                  e.currentTarget.style.borderColor = "var(--gray-100)";
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: `${f.color}14`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    marginBottom: "20px",
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "var(--gray-800)",
                    marginBottom: "10px",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    color: "var(--gray-500)",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────── */}
      <section
        className="pattern-bg"
        style={{ padding: "100px 24px" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span
              style={{
                display: "inline-block",
                background: "#f0fdf4",
                color: "#16a34a",
                border: "1px solid #bbf7d0",
                borderRadius: "99px",
                padding: "6px 18px",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              How It Works
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "var(--gray-900)",
                lineHeight: 1.2,
              }}
            >
              Simple. Fast. Reliable.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "32px",
            }}
          >
            {steps.map((step, i) => (
              <div
                key={step.num}
                style={{
                  background: "#fff",
                  borderRadius: "var(--radius-lg)",
                  padding: "36px 28px",
                  boxShadow: "var(--shadow-sm)",
                  border: "1px solid rgba(22,163,74,0.1)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    right: "-12px",
                    fontFamily: "var(--font-display)",
                    fontSize: "5rem",
                    fontWeight: 900,
                    color: "var(--green-50)",
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #16a34a, #22c55e)",
                    color: "#fff",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    marginBottom: "20px",
                    boxShadow: "0 4px 12px rgba(22,163,74,0.3)",
                  }}
                >
                  {i + 1}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "var(--gray-800)",
                    marginBottom: "10px",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "var(--gray-500)",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Farmers ─────────────────────────────────── */}
      <section style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "48px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  background: "#f0fdf4",
                  color: "#16a34a",
                  border: "1px solid #bbf7d0",
                  borderRadius: "99px",
                  padding: "6px 18px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                Featured Farmers
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  fontWeight: 800,
                  color: "var(--gray-900)",
                  lineHeight: 1.2,
                }}
              >
                Top Sellers This Season
              </h2>
            </div>
            <Link
              to="/marketplace"
              id="home-view-all-btn"
              style={{
                padding: "12px 24px",
                borderRadius: "99px",
                background: "transparent",
                color: "#16a34a",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                border: "2px solid #16a34a",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#16a34a";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#16a34a";
              }}
            >
              View All →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {sampleFarmers.map((farmer) => (
              <Card key={farmer.name} {...farmer} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats ────────────────────────────────────────────── */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #052e16 0%, #14532d 50%, #15803d 100%)",
          padding: "80px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "48px",
            textAlign: "center",
          }}
        >
          {[
            { num: "500+", label: "Farmers Connected", icon: "👨‍🌾" },
            { num: "1,000+", label: "Products Listed", icon: "🥬" },
            { num: "50+", label: "Cities Reached", icon: "🗺️" },
            { num: "98%", label: "Satisfaction Rate", icon: "⭐" },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: "2.2rem", marginBottom: "8px" }}>
                {stat.icon}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  color: "#86efac",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section style={{ padding: "100px 24px", background: "#fff" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
            background:
              "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)",
            borderRadius: "var(--radius-2xl)",
            padding: "72px 48px",
            border: "1px solid #bbf7d0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative blobs */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "-40px",
              right: "-40px",
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              background: "rgba(22,163,74,0.08)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "-30px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "rgba(250,204,21,0.08)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              fontSize: "3rem",
              marginBottom: "20px",
            }}
          >
            🌱
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "var(--gray-900)",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            Ready to Join AgriConnect?
          </h2>
          <p
            style={{
              color: "var(--gray-500)",
              fontSize: "1.05rem",
              maxWidth: "440px",
              margin: "0 auto 36px",
              lineHeight: 1.7,
            }}
          >
            Connect with trusted farmers, explore quality produce, and become
            part of India's growing digital farming network.
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/login"
              id="cta-signup-btn"
              style={{
                padding: "14px 32px",
                borderRadius: "99px",
                background: "linear-gradient(135deg, #16a34a, #22c55e)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "var(--shadow-green)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 12px 36px rgba(22,163,74,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "var(--shadow-green)";
              }}
            >
              Start for Free
            </Link>
            <Link
              to="/marketplace"
              id="cta-browse-btn"
              style={{
                padding: "14px 32px",
                borderRadius: "99px",
                background: "transparent",
                color: "#15803d",
                fontWeight: 600,
                fontSize: "1rem",
                textDecoration: "none",
                border: "2px solid #16a34a",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#16a34a";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#15803d";
              }}
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;