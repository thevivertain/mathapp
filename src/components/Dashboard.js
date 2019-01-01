import React, { Component } from "react";
import "./Table.css";

export default class Dashboard extends Component {
  state = {
    addScore: "",
    subScore: "",
    multScore: "",
    divScore: "",
    randScore: ""
  };

  componentDidMount() {

    if (localStorage.getItem("addScore") === null) {
      this.setState({
        addScore: "0"
      })
    } else {
      this.setState({
        addScore: JSON.parse(localStorage.getItem("addScore"))
      })
    }

    if (localStorage.getItem("subScore") === null) {
      this.setState({
        subScore: "0"
      })
    } else {
      this.setState({
        subScore: JSON.parse(localStorage.getItem("subScore"))
      })
    }

    if (localStorage.getItem("multScore") === null) {
      this.setState({
        multScore: "0"
      })
    } else {
      this.setState({
        multScore: JSON.parse(localStorage.getItem("multScore"))
      })
    }
    if (localStorage.getItem("divScore") === null) {
      this.setState({
        divScore: "0"
      })
    } else {
      this.setState({
        divScore: JSON.parse(localStorage.getItem("divScore"))
      })
    }

    if (localStorage.getItem("randScore") === null) {
      this.setState({
        randScore: "0"
      })
    } else {
      this.setState({
        randScore: JSON.parse(localStorage.getItem("randScore"))
      })
    }
 
  }

  onClick = e => {
    e.preventDefault();

    localStorage.clear();
    this.setState({
      addScore: "0",
      subScore: "0",
      multScore: "0",
      divScore: "0",
      randScore: "0"
    });
  };

  render() {
    return (
      <div className="text-center">
        <h5>
          Welcome to my Math App. This is just a fun project that I started to
          learn React.
        </h5>
        <p>
          You are currently in your dashboard. To start, go select an operator
          and play the game.
        </p>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center table-success" colSpan="5">
                Scores
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="col" className="text-center table-secondary">
                Addition
              </th>
              <th scope="col" className="text-center table-secondary">
                Subtraction
              </th>
              <th scope="col" className="text-center table-secondary">
                Multiplication
              </th>
              <th scope="col" className="text-center table-secondary">
                Division
              </th>
              <th scope="col" className="text-center table-secondary">
                Random
              </th>
            </tr>
            <tr>
              <td className="text-center table-info">{this.state.addScore}</td>
              <td className="text-center table-info">{this.state.subScore}</td>
              <td className="text-center table-info">{this.state.multScore}</td>
              <td className="text-center table-info">{this.state.divScore}</td>
              <td className="text-center table-info">{this.state.randScore}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={this.onClick}>
          Reset your scores
        </button>
      </div>
    );
  }
}
