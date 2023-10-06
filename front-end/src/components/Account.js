import React from "react";

/**
 * Returns a React component displays account on user page
 * @param {string}, Params of title, amount, description
 * @returns a React Components
 */

const Account = ({ title, amount, description }) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
};

export default Account;