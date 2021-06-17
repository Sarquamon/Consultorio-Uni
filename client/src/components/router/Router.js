import React from "react";
import { Switch, Route } from "react-router-dom";

import { Navbar } from "../navbar/Navbar";

import { Dashboard } from "../../pages/Dashboard";
import { Register } from "../../pages/Register";
import { Login } from "../../pages/Login";
import { Dates } from "../../pages/Dates";

export const Router = () => {
  const token = "s"; //Move to redux
  return (
    <>
      <header>
        <Navbar token={token} />
      </header>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/signin" component={Login} />
        <Route exact path="/dates" component={Dates} />
      </Switch>
    </>
  );
};
