import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-success mb-3">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <i className="fas fa-laptop" /> Math App
          </Link>

          <div className="dropdown ml-auto">
            <i className="fas fa-stream text-white" />
            <button
              className="btn btn-success dropdown-toggle"
              data-toggle="dropdown"
              type="button"
            >
              Select your operator
            </button>
            <div className="dropdown-menu bg-success">
              <ul>
                <Link to="/add" className="navbar-nav">
                  <li className="nav-item text-white dropdown-item">
                    <i className="fas fa-plus" /> Addition
                  </li>
                </Link>
                <div className="dropdown-divider" />
                <Link to="/sub" className="navbar-nav">
                  <li className="nav-item text-white dropdown-item">
                    <i className="fas fa-minus" /> Subtract
                  </li>
                </Link>
                <div className="dropdown-divider" />
                <Link to="/mult" className="navbar-nav">
                  <li className="nav-item text-white  dropdown-item">
                    <i className="fas fa-star-of-life" /> Multiplication
                  </li>
                </Link>
                <div className="dropdown-divider" />
                <Link to="/div" className="navbar-nav">
                  <li className="nav-item text-white dropdown-item">
                    <i className="fas fa-divide" /> Division
                  </li>
                </Link>
                <div className="dropdown-divider" />
                <Link to="/rand" className="navbar-nav">
                  <li className="nav-item text-white dropdown-item">
                    <i className="fas fa-random" /> Random
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
