import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const team = [
  { name: "Pranjal Singh", role: "Founder & CEO", emoji: "👨‍💻", desc: "Building AgriConnect to bridge the gap between farmers and modern markets." },
  { name: "Tech Team",     role: "Engineering",   emoji: "⚙️",  desc: "Crafting scalable, reliable infrastructure for India's agricultural ecosystem." },
  { name: "Field Ops",     role: "Outreach",       emoji: "🌾",  desc: "On-ground support helping farmers onboard and get the most from the platform." },
];

const values = [
  { icon: "🌱", title: "Farmer First",     desc: "Every decision we make is guided by the well-being and empowerment of India's farming community." },
  { icon: "🔍", title: "Transparency",     desc: "Open, honest transactions. No hidden fees, no middlemen manipulation. Just fair trade." },
  { icon: "⚡", title: "Accessibility",    desc: "Designed to work for everyone — simple enough for first-time smartphone users, powerful enough for pros." },
  { icon: "🤝", title: "Trust & Integrity", desc: "Verified profiles, authentic reviews, and secure communications you can rely on." },
];

function About() {
  return (
    <>
      <Navbar />

      {/* ─── Hero ───────────────────────────────────────────── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #052e16 0%, #14532d 40%, #15803d 100%)",
          paddingTop: "130px",
          paddingBottom: "80px",
          paddingLeft: "24px",
          paddingRight: "24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden style={{ position:"absolute", top:"-80px", right:"-80px", width:"320px", height:"320px", borderRadius:"50%", background:"radial-gradient(circle,rgba(74,222,128,.12) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div aria-hidden style={{ position:"absolute", bottom:"-60px", left:"-60px", width:"240px", height:"240px", borderRadius:"50%", background:"radial-gradient(circle,rgba(250,204,21,.08) 0%,transparent 70%)", pointerEvents:"none" }} />

        <span style={{ display:"inline-block", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:"99px", padding:"6px 18px", fontSize:"0.8rem", fontWeight:600, color:"rgba(255,255,255,0.85)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"16px" }}>
          Our Story
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 900,
            color: "#fff",
            marginBottom: "16px",
            letterSpacing: "-0.02em",
          }}
        >
          About AgriConnect
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "1.1rem",
            maxWidth: "560px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          We're on a mission to digitize agricultural trade in India — making
          it fairer, faster, and more accessible for every farmer.
        </p>
      </div>

      {/* ─── Mission ────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
          }}
          className="about-grid"
        >
          <div>
            <span style={{ display:"inline-block", background:"#f0fdf4", color:"#16a34a", border:"1px solid #bbf7d0", borderRadius:"99px", padding:"6px 18px", fontSize:"0.8rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"16px" }}>
              Our Mission
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                fontWeight: 800,
                color: "var(--gray-900)",
                marginBottom: "20px",
                lineHeight: 1.2,
              }}
            >
              Empowering Farmers with Digital Tools
            </h2>
            <p style={{ color: "var(--gray-500)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "16px" }}>
              AgriConnect was built out of a simple frustration: farmers growing
              quality produce but unable to reach the right buyers at fair prices.
              Middlemen took large cuts, information was scattered, and
              opportunities were lost.
            </p>
            <p style={{ color: "var(--gray-500)", fontSize: "1rem", lineHeight: 1.8 }}>
              We set out to change that. AgriConnect is a transparent, accessible
              digital marketplace that empowers farmers to reach wider markets
              while giving buyers confidence in the quality and origin of what
              they purchase.
            </p>
          </div>

          {/* Visual */}
          <div
            style={{
              background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
              borderRadius: "var(--radius-xl)",
              padding: "48px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              border: "1px solid #bbf7d0",
            }}
          >
            {[
              { label: "Farmers Empowered",  value: "500+",  color: "#16a34a" },
              { label: "Products Available", value: "1,000+", color: "#0284c7" },
              { label: "Cities Covered",     value: "50+",   color: "#7c3aed" },
              { label: "Satisfaction Rate",  value: "98%",   color: "#d97706" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#fff",
                  borderRadius: "var(--radius-md)",
                  padding: "16px 20px",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <span style={{ color: "var(--gray-600)", fontWeight: 500, fontSize: "0.9rem" }}>
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "1.3rem",
                    color: item.color,
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values ─────────────────────────────────────────── */}
      <section className="pattern-bg" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ display:"inline-block", background:"#f0fdf4", color:"#16a34a", border:"1px solid #bbf7d0", borderRadius:"99px", padding:"6px 18px", fontSize:"0.8rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"16px" }}>
              Our Values
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                fontWeight: 800,
                color: "var(--gray-900)",
              }}
            >
              What We Stand For
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {values.map((v) => (
              <div
                key={v.title}
                style={{
                  background: "#fff",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px 24px",
                  boxShadow: "var(--shadow-sm)",
                  border: "1px solid rgba(22,163,74,0.08)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "14px" }}>{v.icon}</div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--gray-800)",
                    marginBottom: "10px",
                  }}
                >
                  {v.title}
                </h3>
                <p style={{ color: "var(--gray-500)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team ───────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ display:"inline-block", background:"#f0fdf4", color:"#16a34a", border:"1px solid #bbf7d0", borderRadius:"99px", padding:"6px 18px", fontSize:"0.8rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"16px" }}>
              The Team
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                fontWeight: 800,
                color: "var(--gray-900)",
              }}
            >
              The People Behind AgriConnect
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {team.map((member) => (
              <div
                key={member.name}
                style={{
                  background: "#fff",
                  border: "1px solid var(--gray-100)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px 24px",
                  textAlign: "center",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "20px",
                    background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                    border: "2px solid #bbf7d0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    margin: "0 auto 16px",
                  }}
                >
                  {member.emoji}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--gray-800)",
                    marginBottom: "4px",
                  }}
                >
                  {member.name}
                </h3>
                <span
                  style={{
                    display: "inline-block",
                    background: "#f0fdf4",
                    color: "#16a34a",
                    borderRadius: "99px",
                    padding: "3px 12px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    marginBottom: "12px",
                  }}
                >
                  {member.role}
                </span>
                <p style={{ color: "var(--gray-500)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>

      <Footer />
    </>
  );
}

export default About;