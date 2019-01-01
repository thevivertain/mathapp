import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Addition from "./layout/Addition";
import Subtract from "./layout/Subtract";
import Multiply from "./layout/Multiply";
import Division from "./layout/Division";
import Random from "./layout/Random";
import Navbar from "./components/Navbar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/add" component={Addition} />
            <Route exact path="/sub" component={Subtract} />
            <Route exact path="/mult" component={Multiply} />
            <Route exact path="/div" component={Division} />
            <Route exact path="/rand" component={Random} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
