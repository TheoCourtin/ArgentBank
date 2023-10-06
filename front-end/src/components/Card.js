import React from "react";

/**
 * Returns a React component displays card on the home page
 * @param {string}, Params of icon, title, text
 * @returns React Component
 */

const Card = ({ icon, title, text }) => {
  return (
    <div className="card">
      <img src={icon} alt="icône" className="icon" />
      <h3 className="title">{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default Card;