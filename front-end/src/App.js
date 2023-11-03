import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Error from "./pages/Error";
import SignIn from "./pages/SignIn";
import User from "./pages/User";



const App = () => {
 
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />      
          <Route path="/user" element={<User />} />   
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  };

export default App;