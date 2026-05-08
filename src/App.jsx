import React from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import StoryCard from "./components/StoryCard.jsx";
import Story from "./components/Story.jsx";
import Login from "./components/Login.jsx";

import { Navigate, BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import GlobalProvider from "./context/globalProvider.jsx";
const App = () => {
  return (
    <Router>
      <GlobalProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/api/stories?page=1&limit=10" replace />}
          />

          <Route path="/api/stories" element={<Story />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </GlobalProvider>
    </Router>
  );
};

export default App;
