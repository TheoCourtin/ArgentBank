import React, { useEffect, useState  } from "react";
import { Link, useNavigate,  } from "react-router-dom";
import { useDispatch } from "react-redux";
import Account from "../components/Account";
import { updateUser } from "../feature/user.slice";
import callAPI from "../services/CallAPI";

/**
 * Returns a React component displays the user page
 * @returns React Component
 */
const User = () => {
  const [editContent, setEditContent] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const user = useState("");
  const validToken = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {           
     setUser(storedToken);
     setFirstName(user.firstName);
     setLastName(user.lastName);     
    } else {   
        navigate("/signin");     
    }    
  }, []);

  const setUser = async (token) => {
    try {
      const data = await callAPI.getUserInfo(token);
      console.log("Data from CallAPI.getUserInfo:", data);
      dispatch(updateUser({ firstName: data.firstName, lastName: data.lastName }));
    } catch (error) {
      console.error("Error while fetching user data:", error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await callAPI.setUserInfo(validToken, { firstName, lastName });
    dispatch(updateUser({ firstName: firstName,  lastName: lastName }));
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