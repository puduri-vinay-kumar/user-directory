
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./components/Home";
import UserDetails from "./components/UserDetails";
import "./App.css";

class App extends Component {
  render() {
    return (
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<UserDetails />} />
          </Routes>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
