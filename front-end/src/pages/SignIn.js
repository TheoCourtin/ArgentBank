import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken } from "../feature/user.slice";
import callAPI from "../services/CallAPI";

/**
 * Returns a React component displays the signin page
 * @returns React Component
 */
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const validToken = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("rememberMe")) {
      setEmail(localStorage.getItem("username"));

      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async () => {
    const res = await callAPI.tokenLogin({ email, password });
    if (res) {
      dispatch(getToken({ token: res, email: email }));

      if (rememberMe) {
        localStorage.setItem("rememberMe", true);
        localStorage.setItem("token", res);
        console.log(res);
        console.log(
          "Information d'authentification stockées dans le localStorage"
        );
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("token", res);
        console.log(
          "Informations d'authentification supprimées du localStorage"
        );
      }
    }
  };

  useEffect(() => {
    if (validToken) {
      navigate("/user");
    }
  });

  return (
    <main className="sign-in main bg-dark">
      <section className="sign-in-content">
        <span className="fa fa-user-circle sign-in-icon"></span>

        <h1>Sign In</h1>

        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setEmail(e.target.value)}
              value={email || ""}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password || ""}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              checked={rememberMe}
              id="rememberMe"
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            type="button"
            className="sign-in-button"
            onClick={() => handleSubmit()}
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
