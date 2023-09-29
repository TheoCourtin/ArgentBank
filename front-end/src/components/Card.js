import React from "react";

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