import React, { Component } from "react";
import Canvas from "../components/Canvas";

export default class Division extends Component {
  state = {
    num1: "",
    num2: "",
    result: "",
    remainder: "",
    backresult: 0,
    backremainder: 0,
    turnedOn: false,
    divScore: 0,
    isCanvas: true
  };

  componentDidMount() {
    this.setState({
      divScore: JSON.parse(localStorage.getItem("divScore"))
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
    var numberResult = Math.floor(parseFloat(num1) / parseFloat(num2));
    var numberRemainder = parseFloat(num1) % parseFloat(num2);
    this.setState({
      backresult: numberResult,
      backremainder: numberRemainder
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

    const {
      num1,
      num2,
      result,
      remainder,
      backresult,
      backremainder
    } = this.state;

    var numberResult = Math.floor(parseFloat(num1) / parseFloat(num2));
    var numberRemainder = parseFloat(num1) % parseFloat(num2);
    this.setState({
      backresult: numberResult,
      backremainder: numberRemainder
    });

    if (
      parseFloat(result) === backresult &&
      parseFloat(remainder) === backremainder
    ) {
      alert("Good Job");
      var increment = this.state.divScore + 1;
      this.setState({
        turnedOn: false,
        num1: "",
        num2: "",
        result: "",
        remainder: "",
        backresult: 0,
        backremainder: 0
      });

      localStorage.setItem("divScore", increment);
    } else {
      if (
        window.confirm(
          "You are incorrect, try again. Press OK to try again, cancel to go on and get -1 points."
        )
      ) {
        increment = this.state.divScore - 1;
        this.setState({ turnedOn: true });
        localStorage.setItem("divScore", increment);
      } else {
        this.setState({
          turnedOn: false,
          num1: "",
          num2: "",
          result: "",
          remainder: "",
          backresult: 0,
          backremainder: 0
        });
        increment = this.state.divScore - 1;

        localStorage.setItem("divScore", increment);
      }
    }
    this.setState({
      divScore: JSON.parse(localStorage.getItem("divScore"))
    });
  };

  render() {
    return (
      <div className="text-center">
        <p>
          You have selected <span className="text-danger">division</span>. Click
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
          <p>Score: {this.state.divScore}</p>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="input-group d-inline-flex text-center w-75">
            <input
              type="number"
              className="form-control ml-4"
              name="num1"
              required
              value={this.state.num1}
              onChange={this.onChange}
              placeholder="0"
              disabled={this.state.turnedOn}
              pattern="[0-9]"
            />
            <i className="fas fa-divide mt-2 col-sm-1" />{" "}
            <input
              type="number"
              className="form-control"
              name="num2"
              required
              value={this.state.num2}
              onChange={this.onChange}
              placeholder="0"
              disabled={this.state.turnedOn}
              pattern="[0-9]"
            />
            <i className="fas fa-equals mt-2 col-sm-1" />
            <input
              type="number"
              className="form-control"
              name="result"
              required
              value={this.state.result}
              onChange={this.onChange}
              placeholder="Quotient"
              step="any"
            />
            <input
              type="number"
              className="form-control"
              name="remainder"
              required
              value={this.state.remainder}
              onChange={this.onChange}
              placeholder="Remainder"
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
