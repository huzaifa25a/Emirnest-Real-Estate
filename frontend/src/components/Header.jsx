import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import Account from "./Account";
import Home from "../assets/home.svg";
import HomeBlack from "../assets/home_blue.svg";
import account from "../assets/account.svg";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const [openAccount, setOpenAccount] = useState(false);

  const navigate = useNavigate();

  const isHome = useLocation().pathname === "/";

  return (
    <div
      className={`flex flex-row flex-wrap justify-between items-center p-6 w-full ${
        isHome ? "" : "bg-gray-100"
      } mb-10`}
    >
      <div className="flex flex-row gap-2 items-end">
        <h2
          className={`font-bold text-3xl ${
            isHome ? "text-white" : "text-[#096da7]"
          }`}
        >
          Emirnest
        </h2>
        {isHome ? (
          <img src={Home} className="h-10" />
        ) : (
          <img src={HomeBlack} className="h-10" />
        )}
      </div>
      <nav
        className={`flex flex-row justify-center gap-12 items-center w-auto ${
          isHome ? "text-white" : ""
        }`}
      >
        <NavLink
          to="/"
          className={
            "border-b-transparent border-b-2 active:border-b-[#096da7] focus:border-b-[#096da7] text-[18px] hover:border-b-[#096da7]"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/properties"
          className={
            "border-b-transparent border-b-2 active:border-b-[#096da7] focus:border-b-[#096da7] text-[18px] hover:border-b-[#096da7]"
          }
        >
          Properties
        </NavLink>
        <NavLink
          to="/about"
          className={
            "border-b-transparent border-b-2 active:border-b-[#096da7] focus:border-b-[#096da7] text-[18px] hover:border-b-[#096da7]"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={
            "border-b-transparent border-b-2 active:border-b-[#096da7] focus:border-b-[#096da7] text-[18px] hover:border-b-[#096da7]"
          }
        >
          Contact
        </NavLink>
      </nav>
      {isLoggedIn ? (
        <nav className=" flex flex-row justify-end gap-6 items-center">
          <NavLink
            to="/list_property"
            className={
              "flex items-center p-3 h-10 text-white rounded-md bg-[#096da7] hover:bg-[#204d67] transition-all duration-200 text-[18px] focus:outline-none"
            }
          >
            List your property
          </NavLink>
          <div className="flex flex-col">
            <button onClick={() => setOpenAccount(!openAccount)}>
              <img
                src={account}
                className="h-[50px] hover:opacity-85 transition-all duration-200"
              />
            </button>
            {openAccount ? <Account /> : null}
          </div>
        </nav>
      ) : (
        <nav className=" flex flex-row justify-end gap-6 items-center">
          <NavLink
            to="/login"
            className={`${
              isHome ? "text-white" : "text-[#096da7] hover:text-[#204d67] "
            } transition-all duration-100 text-[18px]`}
          >
            Login
          </NavLink>
          <NavLink
            to="/signin"
            className={
              "flex items-center p-3 h-10 border-[1px] text-white rounded-md bg-[#096da7] hover:bg-[#204d67] transition-all duration-200 "
            }
          >
            Register
          </NavLink>
        </nav>
      )}
    </div>
  );
};

export default Header;
