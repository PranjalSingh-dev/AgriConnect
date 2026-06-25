import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-700 text-white p-4 flex gap-6">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/login">Login</Link>
      <Link to="/marketplace">Marketplace</Link>
    </nav>
  );
}

export default Navbar;