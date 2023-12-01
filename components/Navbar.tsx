import styles from "../styles/Navbar.module.css";
import Link from "next/link";

import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { logout } = useLogout();
  const context = useAuthContext();

  // State for mobile navigation menu
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Function to toggle mobile navigation menu
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`bg-gray-900 ${styles.navbar}`}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Brand Logo */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            <Link href={"/"}>3D App</Link>
          </span>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isNavOpen ? "true" : "false"}
            onClick={toggleNav}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <div className={`w-full md:flex md:w-auto ${isNavOpen ? "block" : "hidden"}`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-900">
              {!context.user && (
                <>
                  <li>
                    <Link href="/login" className="block py-2 px-3 text-white rounded hover:bg-gray-700">
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="block py-2 px-3 text-white rounded hover:bg-gray-700">
                      Register
                    </Link>
                  </li>
                </>
              )}

              {/* User is logged in */}
              {context.user && (
                <>
                  <li>
                    <button onClick={logout} className="block py-2 px-3 text-white rounded hover:bg-gray-700">
                      Log out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;