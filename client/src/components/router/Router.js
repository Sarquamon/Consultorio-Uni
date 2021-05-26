import React from "react";
import { Switch, Route } from "react-router-dom";

import { Navbar } from "../navbar/Navbar";

import { Homepage } from "../../pages/Homepage";
import { Register } from "../../pages/Register";
import { Login } from "../../pages/Login";
import { Dates } from "../../pages/Dates";

export const Router = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/signin" component={Login} />
        <Route exact path="/dates" component={Dates} />
      </Switch>
    </>
  );
};
