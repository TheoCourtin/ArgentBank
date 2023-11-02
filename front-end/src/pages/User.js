import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Account from "../components/Account";
import { getUser } from "../feature/user.slice";
import CallAPI from "../services/CallAPI";

/**
 * Returns a React component displays the user page
 * @returns React Component
 */
const User = () => {
  const [editContent, setEditContent] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const user = useSelector((state) => state.user);
  const validToken = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (validToken) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    } else {
      setTimeout(() => {
        navigate("/signin");
      }, 5000);
    }
    // eslint-disable-next-line
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await CallAPI.setUserInfo(validToken, { firstName, lastName });
    dispatch(getUser({ firstName: firstName, lastName: lastName }));
    setEditContent(false);
  };

  if (validToken) {
    return (
      <main className="user main bg-dark">
        <div className="header">
          {editContent ? (
            <>
              <h1>Welcome back</h1>
              <form className="profil-form">
                <div className="profil-inputs">
                  <input
                    type="text"
                    name="firstName"
                    className="profil-input"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                  <input
                    type="text"
                    name="lastName"
                    className="profil-input"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </div>
                <div className="profil-buttons">
                  <button
                    className="button-valid"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Save
                  </button>
                  <button
                    className="button-cancel"
                    onClick={() => setEditContent(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h1>
                Welcome back
                <br />
                {user.firstName} {user.lastName} !
              </h1>
              <button
                className="edit-button"
                onClick={() => setEditContent(true)}
              >
                Edit Name
              </button>
            </>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Account
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
    );
  } else {
    return (
      <main className="main bg-dark">
        <div className="error">
          <span>401</span>
          <p className="error-text">
            Vous devez être connecté pour accéder à cette page ! <br /> La
            redirection se fera automatiquement dans 5 secondes.
          </p>
          <Link to="/signin">Accéder à la page de connexion</Link>
        </div>
      </main>
    );
  }
};

export default User;