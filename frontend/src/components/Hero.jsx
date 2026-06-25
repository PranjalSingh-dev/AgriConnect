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
          "linear-gradient(135deg, #052e16 0%, #14532d 25%, #15803d 55%, #16a34a 80%, #22c55e 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,222,128,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(250,204,21,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "40%",
          left: "5%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
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
          opacity: 0.25,
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
          opacity: 0.2,
          animationDelay: "1.2s",
        }}
      >
        🥦
      </div>
      <div
        aria-hidden
        className="animate-float"
        style={{
          position: "absolute",
          bottom: "20%",
          right: "20%",
          fontSize: "2rem",
          opacity: 0.2,
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
          maxWidth: "900px",
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
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "99px",
            padding: "8px 20px",
            marginBottom: "28px",
            color: "rgba(255,255,255,0.9)",
            fontSize: "0.875rem",
            fontWeight: 500,
            backdropFilter: "blur(8px)",
          }}
        >
          <span style={{ fontSize: "1rem" }}>🚀</span>
          India's Digital Agricultural Marketplace
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up delay-100"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#fff",
            marginBottom: "24px",
            letterSpacing: "-0.02em",
          }}
        >
          Where Farmers Meet{" "}
          <span
            style={{
              display: "inline-block",
              background:
                "linear-gradient(90deg, #86efac, #facc15, #86efac)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientShift 3s ease infinite",
            }}
          >
            Opportunity
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up delay-200"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "rgba(255,255,255,0.78)",
            maxWidth: "600px",
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Connecting farmers, buyers, and agricultural businesses through a
          transparent, accessible, and powerful digital platform.
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
              background: "linear-gradient(135deg, #ffffff, #f0fdf4)",
              color: "#15803d",
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.28)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)";
            }}
          >
            Explore Marketplace →
          </Link>
          <Link
            to="/about"
            id="hero-learn-btn"
            style={{
              padding: "16px 36px",
              borderRadius: "99px",
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1rem",
              textDecoration: "none",
              border: "2px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(8px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Learn More
          </Link>
        </div>

        {/* Trust indicators */}
        <div
          className="animate-fade-in-up delay-400"
          style={{
            display: "flex",
            gap: "32px",
            justifyContent: "center",
            marginTop: "56px",
            flexWrap: "wrap",
          }}
        >
          {[
            { num: "500+", label: "Farmers" },
            { num: "1,000+", label: "Products" },
            { num: "50+", label: "Cities" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  color: "#86efac",
                  lineHeight: 1,
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.6)",
                  marginTop: "4px",
                  fontWeight: 500,
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