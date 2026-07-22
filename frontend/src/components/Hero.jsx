import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="hero-noise"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 35%, #1e293b 70%, #0f172a 100%)",
      }}
    >
      {/* Decorative Blobs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.22) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating decorative elements */}
      <div
        aria-hidden
        className="animate-float"
        style={{
          position: "absolute",
          top: "15%",
          right: "12%",
          fontSize: "3rem",
          opacity: 0.3,
          animationDelay: "0.5s",
        }}
      >
        🌾
      </div>
      <div
        aria-hidden
        className="animate-float"
        style={{
          position: "absolute",
          top: "60%",
          left: "8%",
          fontSize: "2.5rem",
          opacity: 0.3,
          animationDelay: "1.2s",
        }}
      >
        ✨
      </div>
      <div
        aria-hidden
        className="animate-float"
        style={{
          position: "absolute",
          bottom: "20%",
          right: "20%",
          fontSize: "2rem",
          opacity: 0.3,
          animationDelay: "0.8s",
        }}
      >
        🌽
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "920px",
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <div
          className="animate-fade-in-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(245, 158, 11, 0.15)",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            borderRadius: "99px",
            padding: "8px 22px",
            marginBottom: "28px",
            color: "#fbbf24",
            fontSize: "0.875rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            backdropFilter: "blur(12px)",
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>🌟</span>
          India's Premier Multi-Crop Agricultural Network
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up delay-100"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#ffffff",
            marginBottom: "24px",
            letterSpacing: "-0.02em",
          }}
        >
          Connecting Fields to{" "}
          <span
            style={{
              display: "inline-block",
              background:
                "linear-gradient(90deg, #facc15 0%, #38bdf8 50%, #34d399 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientShift 3s ease infinite",
            }}
          >
            Future Prosperity
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up delay-200"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "rgba(241, 245, 249, 0.82)",
            maxWidth: "640px",
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Empowering farmers, buyers, and agricultural leaders with direct trade, verified listings, and AI crop diagnostics.
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-fade-in-up delay-300"
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/marketplace"
            id="hero-explore-btn"
            style={{
              padding: "16px 36px",
              borderRadius: "99px",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(245, 158, 11, 0.35)",
              transition: "all 0.3s ease",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 14px 40px rgba(245, 158, 11, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(245, 158, 11, 0.35)";
            }}
          >
            Explore Marketplace →
          </Link>
          <Link
            to="/ai"
            id="hero-ai-btn"
            style={{
              padding: "16px 36px",
              borderRadius: "99px",
              background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(79, 70, 229, 0.35)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 14px 40px rgba(79, 70, 229, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(79, 70, 229, 0.35)";
            }}
          >
            🌿 Try AI Advisor
          </Link>
        </div>

        {/* Trust indicators */}
        <div
          className="animate-fade-in-up delay-400"
          style={{
            display: "flex",
            gap: "36px",
            justifyContent: "center",
            marginTop: "56px",
            flexWrap: "wrap",
          }}
        >
          {[
            { num: "500+", label: "Verified Farmers", color: "#facc15" },
            { num: "1,000+", label: "Fresh Crops", color: "#34d399" },
            { num: "50+", label: "Trade Regions", color: "#38bdf8" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  color: stat.color,
                  lineHeight: 1,
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.65)",
                  marginTop: "4px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          color: "rgba(255,255,255,0.5)",
          fontSize: "0.75rem",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          animation: "float 2s ease-in-out infinite",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "36px",
            border: "2px solid rgba(255,255,255,0.3)",
            borderRadius: "99px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6px",
          }}
        >
          <div
            style={{
              width: "3px",
              height: "8px",
              background: "rgba(255,255,255,0.6)",
              borderRadius: "99px",
              animation: "float 1.5s ease-in-out infinite",
            }}
          />
        </div>
        Scroll
      </div>
    </section>
  );
}

export default Hero;