import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import Login from "./components/login";

const App = () => {
  const appStyle = {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    color: "#3b00ba",
  };
  return (
    <div className="App">
      <h1 style={appStyle}>Students Management System</h1>

      <BrowserRouter>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
