import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import { Navbar } from "../navbar/Navbar";

import { Dashboard } from "../../pages/Dashboard";
import { RegisterPatient } from "../../pages/RegisterPatient";
import { RegisterReceptionist } from "../../pages/RegisterReceptionist";
import { RegisterDoctor } from "../../pages/RegisterDoctor";
import { Login } from "../../pages/Login";
import { Dates } from "../../pages/Dates";

export const Router = () => {
  const [token, setToken] = useState(localStorage.getItem("currentToken"));
  return (
    <>
      <header>
        <Navbar token={token} />
      </header>
      <Switch>
        <Route exact path="/" component={token ? Dashboard : Dashboard} />
        <Route
          exact
          path="/signin"
          render={(props) => <Login {...props} setToken={setToken} />}
        />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/registerPatient" component={RegisterPatient} />
        <Route exact path="/registerDoctor" component={RegisterDoctor} />
        <Route exact path="/dates" component={Dates} />
        <Route exact path="/registerPayment" component={Dates} />
        <Route
          exact
          path="/registerReceptionist"
          component={RegisterReceptionist}
        />
      </Switch>
    </>
  );
};
