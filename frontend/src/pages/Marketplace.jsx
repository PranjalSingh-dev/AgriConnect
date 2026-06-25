import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Marketplace() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/farmers")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch farmers");
        }
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

  return (
    <>
      <Navbar />

      <main style={{ padding: "20px" }}>
        <h1>Marketplace</h1>

        {loading && <h2>Loading farmers...</h2>}

        {error && (
          <h2 style={{ color: "red" }}>
            {error}
          </h2>
        )}

        {!loading && !error && (
          <div>
            {farmers.map((farmer) => (
              <div
                key={farmer.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "16px",
                  marginBottom: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
              >
                <h3>{farmer.name}</h3>

                <p>
                  <strong>Crop:</strong> {farmer.crop}
                </p>

                <p>
                  <strong>Village:</strong> {farmer.village}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Marketplace;