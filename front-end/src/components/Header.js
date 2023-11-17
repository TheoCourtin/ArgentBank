import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/argentBankLogo.png";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../feature/user.slice";

/**
 * Returns a React component displays the header
 * @returns React Component
 */
const Header = () => {
  const [connected, setConnected] = useState(false);
  const {firstName, isConnected} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDisconnect = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div className="main-nav-container">
          {connected || localStorage.getItem("rememberMe") ? (
            <>
              <Link className="main-nav-item" to={"/user"}>
                <FaUserCircle />
                {firstName ? firstName : localStorage.getItem("firstName")}
              </Link>
              <Link
                className="main-nav-item"
                onClick={handleDisconnect}
                to={"/"}
              >
                <FaSignOutAlt />
                Sign Out
              </Link>
            </>
          ) : (
            <Link className="main-nav-item" to={"/signin"}>
              <FaUserCircle />
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
