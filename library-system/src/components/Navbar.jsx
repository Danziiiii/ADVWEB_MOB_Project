// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tight">
          LibrarySys
        </Link>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-indigo-200 transition-colors font-medium">Dashboard</Link>
          <Link to="/inventory" className="hover:text-indigo-200 transition-colors font-medium">Inventory</Link>
          <Link to="/add-book" className="hover:text-indigo-200 transition-colors font-medium">Add Book</Link>
        </div>
      </div>
    </nav>
  );
}