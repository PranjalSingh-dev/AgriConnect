import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-2">
          What We Offer
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Empowering farmers and buyers through a simple digital marketplace.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card />
          <Card />
        </div>
      </section>

      {/* About */}
      <section className="bg-green-50 py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Building Better Agricultural Connections
          </h2>

          <p className="text-gray-700 leading-8">
            AgriConnect helps farmers reach a wider audience while making it
            easier for buyers to discover quality agricultural products. Our
            platform promotes transparency, accessibility, and efficient
            communication across the agricultural ecosystem.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Platform Impact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h3 className="text-4xl font-bold text-green-700">500+</h3>
            <p className="mt-2 text-gray-600">Farmers Connected</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h3 className="text-4xl font-bold text-green-700">1000+</h3>
            <p className="mt-2 text-gray-600">Products Listed</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h3 className="text-4xl font-bold text-green-700">50+</h3>
            <p className="mt-2 text-gray-600">Cities Reached</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-700 text-white py-12">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">
            Join the AgriConnect Community
          </h2>

          <p className="mb-6">
            Connect with trusted farmers, explore agricultural products,
            and become part of a growing digital farming network.
          </p>

          <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold">
            Get Started
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;