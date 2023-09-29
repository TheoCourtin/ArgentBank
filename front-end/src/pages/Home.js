import React from "react";
import Card from "../components/Card";
import Chat from "../assets/icon-chat.png";
import Money from "../assets/icon-money.png";
import Security from "../assets/icon-security.png";

const Home = () => {
  return (
  <main className="home">
    <div className="hero">
      <section className="content">
        <h2 className="sr-only">Promoted Content</h2>
        <p className="subtitle">No fees.</p>
        <p className="subtitle">No minimum deposit.</p>
        <p className="subtitle">High interest rates.</p>
        <p className="text">Open a savings account with Argent Bank today!</p>
      </section>
    </div>
    <section className="cards">
      <h2 className="sr-only">Cards</h2>
      <Card
        icon={Chat}
        title="You are our #1 priority"
        text="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
      />
      <Card
        icon={Money}
        title="More savings means higher rates"
        text="The more you save with us, the higher your interest rate will be!"
      />
      <Card
        icon={Security}
        title="Security you can trust"
        text="We use top of the line encryption to make sure your data and money is always safe."
      />
    </section>
  </main>
);
};

export default Home;