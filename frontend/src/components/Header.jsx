import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { X, Menu } from "lucide-react";
import { useAuth } from "../context/auth";
import Account from "./Account";
import Home from "../assets/home.svg";
import HomeBlack from "../assets/home_blue.svg";
import account from "../assets/account.svg";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const [openAccount, setOpenAccount] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = useLocation().pathname === "/";

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <header
      className={`w-full p-6 mb-10 ${
        isHome ? "" : "bg-gray-100"
      }`}
    >
      {/* TOP BAR */}
      <div className="flex justify-between items-center">
        {/* LOGO */}
        <div className="flex gap-2 items-end">
          <h2
            className={`font-bold text-3xl ${
              isHome ? "text-white" : "text-[#096da7]"
            }`}
          >
            Emirnest
          </h2>
          <img src={isHome ? Home : HomeBlack} className="h-10" />
        </div>

        {/* DESKTOP NAV */}
        <nav
          className={`hidden md:flex gap-12 items-center text-[18px] ${
            isHome ? "text-white" : ""
          }`}
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/properties">Properties</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        {/* DESKTOP AUTH */}
        <div className="hidden md:flex items-center gap-6 text-[18px]">
          {isLoggedIn ? (
            <>
              <NavLink
                to="/list_property"
                className="bg-[#096da7] text-white px-4 py-2 rounded-md"
              >
                List your property
              </NavLink>
              <button onClick={() => setOpenAccount(!openAccount)}>
                <img src={account} className="h-12" />
              </button>
              {openAccount && <Account />}
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={isHome ? "text-white" : "text-[#096da7]"}
              >
                Login
              </NavLink>
              <NavLink
                to="/signin"
                className="bg-[#096da7] text-white px-4 py-2 rounded-md"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* HAMBURGER ICON */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? isHome ?
            <X size={28} color="white" /> : <X size={28} />
          : isHome ?
            <Menu size={28} color="white"/> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden fixed right-0 mt-6 w-[300px] bg-white rounded-lg shadow-lg p-6 space-y-4 text-[18px]">
          <div className="flex flex-col items-center gap-10">
            <NavLink onClick={() => setMenuOpen(false)} to="/">Home</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/properties">Properties</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/about">About</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/contact">Contact</NavLink>
          </div>

          <hr />

          {isLoggedIn ? (
            <>
              <NavLink
                to="/list_property"
                onClick={() => setMenuOpen(false)}
                className="block bg-[#096da7] text-white text-center py-2 rounded-md"
              >
                List your property
              </NavLink>
              <button
                onClick={handleLogout}
                className="block text-center text-red-400 hover:text-red-600 duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink 
                onClick={() => setMenuOpen(false)} 
                to="/login"
                className='block text-center'
              >
                Login
              </NavLink>
              <NavLink
                onClick={() => setMenuOpen(false)}
                to="/signin"
                className="block bg-[#096da7] text-white text-center py-2 rounded-md"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
