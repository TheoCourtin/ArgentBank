import React from "react";
import { Link } from "react-router-dom";

/**
 * Returns a React component displays the Error page
 * @returns React Component
 */

const Error = () => {
return (
  <main className="main bg-dark">
    <div className="error">
      <span>404</span>
      <p className="error-text">
        Oups !<br></br>La page que vous demandez n'existe pas.
      </p>
      <Link to="/">Retournez à la page d'accueil</Link>
    </div>
  </main>
);
};
export default Error;