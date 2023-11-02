import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getToken, logOut } from "./feature/user.slice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Error from "./pages/Error";
import SignIn from "./pages/SignIn";
import User from "./pages/User";

// Composant de protection de route
const ProtectedRoute = () => {
  const validToken = useSelector((state) => state.user.token);

  if (validToken) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" />;
  }
};

const App = () => {
  const dispatch = useDispatch();
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getToken({ token }));
    }else
    {
      dispatch(logOut()); // Déconnecter l'utilisateur si aucun token n'est présent
    }
  }, [dispatch]);
  
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
          <Route path="/user" element={<User />} />
        </Route>
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  };

export default App;