import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <main className="p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">About AgriConnect</h1>

        <p className="text-gray-600 leading-7">
          AgriConnect is a digital platform designed to connect farmers,
          buyers, and agricultural businesses in one place. Our mission is
          to simplify the process of buying and selling agricultural products
          while creating better opportunities for farmers to reach a wider
          market.
        </p>

        <p className="text-gray-600 leading-7 mt-4">
          Through AgriConnect, users can explore products, connect with
          trusted sellers, and stay informed about agricultural resources
          and opportunities. We aim to support the farming community by
          leveraging technology to make agricultural trade more accessible,
          transparent, and efficient.
        </p>
      </main>

      <Footer />
    </>
  );
}

export default About;