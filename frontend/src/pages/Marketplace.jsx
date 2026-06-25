import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Loader from "../components/ui/Loader";

const CROPS = ["All", "Wheat", "Rice", "Cotton", "Vegetables", "Maize", "Fruits"];

function Marketplace() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/farmers")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch farmers");
        return res.json();
      })
      .then((data) => {
        setFarmers(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = farmers.filter((f) => {
    const matchesSearch =
      !search ||
      f.name?.toLowerCase().includes(search.toLowerCase()) ||
      f.crop?.toLowerCase().includes(search.toLowerCase()) ||
      f.village?.toLowerCase().includes(search.toLowerCase());
    const matchesCrop =
      selectedCrop === "All" ||
      f.crop?.toLowerCase().includes(selectedCrop.toLowerCase());
    return matchesSearch && matchesCrop;
  });

  return (
    <>
      <Navbar />

      {/* ─── Page Header ────────────────────────────────────── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #052e16 0%, #14532d 40%, #15803d 100%)",
          paddingTop: "120px",
          paddingBottom: "60px",
          paddingLeft: "24px",
          paddingRight: "24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blobs */}
        <div
          aria-hidden
          style={{
            position: "absolute", top: "-60px", right: "-60px",
            width: "280px", height: "280px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute", bottom: "-40px", left: "-40px",
            width: "200px", height: "200px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(250,204,21,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <span
          style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "99px",
            padding: "6px 18px",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          🌾 Live Marketplace
        </span>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 900,
            color: "#fff",
            marginBottom: "12px",
            letterSpacing: "-0.02em",
          }}
        >
          Farmers Marketplace
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "1.05rem",
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          Discover verified farmers, explore fresh produce, and make direct
          connections across India.
        </p>
      </div>

      {/* ─── Filters & Search ───────────────────────────────── */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid var(--gray-100)",
          padding: "20px 24px",
          position: "sticky",
          top: "72px",
          zIndex: 100,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Search */}
          <div
            style={{
              flex: "1",
              minWidth: "220px",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "1rem",
                pointerEvents: "none",
              }}
            >
              🔍
            </span>
            <input
              id="marketplace-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, crop or location..."
              style={{
                width: "100%",
                padding: "11px 16px 11px 42px",
                borderRadius: "99px",
                border: "1.5px solid var(--gray-200)",
                fontSize: "0.9rem",
                color: "var(--gray-700)",
                outline: "none",
                transition: "border-color 0.2s",
                background: "var(--gray-50)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--gray-200)")}
            />
          </div>

          {/* Crop filter chips */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {CROPS.map((crop) => (
              <button
                key={crop}
                id={`filter-${crop.toLowerCase()}`}
                onClick={() => setSelectedCrop(crop)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "99px",
                  border: "1.5px solid",
                  borderColor: selectedCrop === crop ? "#16a34a" : "var(--gray-200)",
                  background: selectedCrop === crop
                    ? "linear-gradient(135deg, #16a34a, #22c55e)"
                    : "#fff",
                  color: selectedCrop === crop ? "#fff" : "var(--gray-600)",
                  fontWeight: selectedCrop === crop ? 600 : 400,
                  fontSize: "0.825rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: selectedCrop === crop
                    ? "0 4px 12px rgba(22,163,74,0.3)"
                    : "none",
                }}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Results ────────────────────────────────────────── */}
      <main
        style={{
          minHeight: "60vh",
          background: "var(--gray-50)",
          padding: "40px 24px 80px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Result count */}
          {!loading && !error && (
            <p
              style={{
                color: "var(--gray-400)",
                fontSize: "0.875rem",
                marginBottom: "24px",
                fontWeight: 500,
              }}
            >
              Showing{" "}
              <strong style={{ color: "var(--gray-700)" }}>
                {filtered.length}
              </strong>{" "}
              farmer{filtered.length !== 1 ? "s" : ""}
              {selectedCrop !== "All" ? ` growing ${selectedCrop}` : ""}
              {search ? ` matching "${search}"` : ""}
            </p>
          )}

          {/* Loader */}
          {loading && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "80px",
                gap: "16px",
              }}
            >
              <Loader size="56px" />
              <p style={{ color: "var(--gray-400)", fontSize: "0.9rem" }}>
                Loading farmers...
              </p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div
              style={{
                textAlign: "center",
                paddingTop: "80px",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>⚠️</div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--gray-700)",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                Couldn't Load Farmers
              </h2>
              <p style={{ color: "var(--gray-400)", fontSize: "0.9rem" }}>
                {error}. Please make sure the server is running.
              </p>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                paddingTop: "80px",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🌾</div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--gray-700)",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                No Farmers Found
              </h2>
              <p style={{ color: "var(--gray-400)", fontSize: "0.9rem" }}>
                Try a different search term or crop filter.
              </p>
              <button
                onClick={() => { setSearch(""); setSelectedCrop("All"); }}
                style={{
                  marginTop: "20px",
                  padding: "10px 24px",
                  borderRadius: "99px",
                  background: "linear-gradient(135deg, #16a34a, #22c55e)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Cards grid */}
          {!loading && !error && filtered.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {filtered.map((farmer, i) => (
                <div
                  key={farmer.id || farmer.name}
                  style={{
                    opacity: 0,
                    animation: "fadeInUp 0.5s ease forwards",
                    animationDelay: `${i * 0.06}s`,
                  }}
                >
                  <Card
                    name={farmer.name}
                    crop={farmer.crop}
                    village={farmer.village}
                    phone={farmer.phone}
                    rating={farmer.rating}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Marketplace;