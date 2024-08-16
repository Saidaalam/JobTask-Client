import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar py-4 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-sky-950 font-bold text-2xl">ProdHunt</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-lg text-sky-950 font-semibold">
          <Link to="/" className="hover:text-sky-300">Home</Link>
          <Link to="/category" className="hover:text-sky-300">Category</Link>
          <Link to="/product" className="hover:text-sky-300">Product</Link>
          <Link to="/addProduct" className="hover:text-sky-300">Add Product</Link>
        </div>

        {/* User Section */}
        <div className="relative">
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="btn btn-ghost btn-circle avatar flex items-center"
              >
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile"
                  src={user?.photoURL || "/default-profile-pic.jpg"}
                  className="h-12 w-12 rounded-full border-2 border-sky-950"
                />
              </button>
              {isOpen && (
                <ul className="absolute right-0 mt-2 p-2 z-20 shadow bg-gray-700 rounded-lg text-white w-48">
                  <li><Link to="/" className="hover:bg-gray-600 px-2 py-1 rounded">Home</Link></li>
                  <li><Link to="/category" className="hover:bg-gray-600 px-2 py-1 rounded">Category</Link></li>
                  <li><Link to="/product" className="hover:bg-gray-600 px-2 py-1 rounded">Product</Link></li>
                  <li><Link to="/addProduct" className="hover:bg-gray-600 px-2 py-1 rounded">Add Product</Link></li>
                  <li className="mt-2">
                    <button
                      onClick={logOut}
                      className="bg-gray-600 hover:bg-gray-500 block text-center w-full py-1 rounded"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-sky-950 text-white px-6 p-3 rounded-xl">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
