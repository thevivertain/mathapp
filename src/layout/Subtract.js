import React, { Component } from "react";
import Canvas from "../components/Canvas";

export default class Subtract extends Component {
  state = {
    num1: "",
    num2: "",
    result: "",
    backresult: 0,
    turnedOn: false,
    subScore: 0,
    isCanvas: true
  };

  componentDidMount() {
    this.setState({
      subScore: JSON.parse(localStorage.getItem("subScore"))
    });
  }

  onCanvasErase = e => {
    e.preventDefault();
    this.setState(
      {
        isCanvas: false
      },
      () =>
        this.setState({
          isCanvas: true
        })
    );
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });

    const { num1, num2 } = this.state;
    var numberResult = parseFloat(num1) - parseFloat(num2);
    this.setState({
      backresult: numberResult
    });
  };

  randomNum = e => {
    e.preventDefault();

    this.setState({
      num1: Math.floor(Math.random() * 100),
      num2: Math.floor(Math.random() * 100),
      turnedOn: true
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { num1, num2, result, backresult } = this.state;

    var numberResult = parseFloat(num1) - parseFloat(num2);

    this.setState({
      backresult: numberResult
    });

    if (parseFloat(result) === backresult) {
      alert("Good Job");
      var increment = this.state.subScore + 1;
      this.setState({
        turnedOn: false,
        num1: "",
        num2: "",
        result: "",
        backresult: 0
      });

      localStorage.setItem("subScore", increment);
    } else {
      if (
        window.confirm(
          "You are incorrect, try again. Press OK to try again, cancel to go on and get -1 points."
        )
      ) {
        increment = this.state.subScore - 1;
        this.setState({ turnedOn: true });
        localStorage.setItem("subScore", increment);
      } else {
        this.setState({
          turnedOn: false,
          num1: "",
          num2: "",
          result: "",
          backresult: 0
        });
        increment = this.state.subScore - 1;

        localStorage.setItem("subScore", increment);
      }
    }
    this.setState({
      subScore: JSON.parse(localStorage.getItem("subScore"))
    });
  };

  render() {
    return (
      <div className="text-center">
        <p>
          You have selected <span className="text-danger">subtract</span>. Click
          the button to get a random set of numbers or put your own in. If you
          are logged in, your score will be kept. Every right answer will get
          you a point, every wrong will net you -1 points.
        </p>
        <button
          className="btn btn-success mb-3"
          disabled={this.state.turnedOn}
          onClick={this.randomNum}
        >
          Get Your Random Numbers
        </button>
        <div>
          <p>Score: {this.state.subScore}</p>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="input-group d-inline-flex text-center w-50">
            <input
              type="number"
              className="form-control col-sm-6 ml-4"
              name="num1"
              required
              value={this.state.num1}
              onChange={this.onChange}
              placeholder="Enter a number..."
              disabled={this.state.turnedOn}
              pattern="[0-9]"
            />
            <i className="fas fa-minus mt-2 col-sm-1" />{" "}
            <input
              type="number"
              className="form-control col-sm-6"
              name="num2"
              required
              value={this.state.num2}
              onChange={this.onChange}
              placeholder="Enter a number..."
              disabled={this.state.turnedOn}
              pattern="[0-9]"
            />
            <i className="fas fa-equals mt-2 col-sm-1" />
            <input
              type="number"
              className="form-control col-sm-6"
              name="result"
              required
              value={this.state.result}
              onChange={this.onChange}
              placeholder="Answer"
              step="any"
            />
          </div>

          <div className="d-flex justify-content-center mt-3">
            <input
              type="submit"
              value="Check your answer"
              className="btn btn-success btn-block w-25 mb-5"
            />
          </div>
          <div>
            <button
              className="btn btn-danger mb-1"
              onClick={this.onCanvasErase}
            >
              Clear the Sketchpad
            </button>
          </div>
          {this.state.isCanvas ? <Canvas /> : null}
        </form>
      </div>
    );
  }
}
