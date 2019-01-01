import React, { Component } from "react";
import Canvas from "../components/Canvas";

var plus = <i className="fas fa-plus mt-2 col-sm-1" />;
var minus = <i className="fas fa-minus mt-2 col-sm-1" />;
var mult = <i className="fas fa-star-of-life mt-2 col-sm-1" />;
var div = <i className="fas fa-divide mt-2 col-sm-1" />;
var question = <i className="fas fa-question mt-2 col-sm-1" />;
export default class Random extends Component {
  state = {
    num1: "",
    num2: "",
    result: "",
    backresult: 0,
    backremainder: 0,
    turnedOn: false,
    randScore: 0,
    isCanvas: true,
    randOperator: question,
    isOperator: "",
    placeHolder: "Answer..."
  };

  componentDidMount() {
    this.setState({
      randScore: JSON.parse(localStorage.getItem("randScore"))
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
    var numberResult = 0;
    switch (this.state.randOperator) {
      case plus:
        numberResult = parseFloat(num1) + parseFloat(num2);
        break;
      case minus:
        numberResult = parseFloat(num1) - parseFloat(num2);
        break;
      case mult:
        numberResult = parseFloat(num1) * parseFloat(num2);
        break;
      case div:
        numberResult = Math.floor(parseFloat(num1) / parseFloat(num2));
        var numberRemainder = parseFloat(num1) % parseFloat(num2);

        break;
      default:
        return;
    }
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

    var operator = Math.floor(Math.random() * 4 + 1);

    switch (operator) {
      case 1:
        this.setState({
          randOperator: plus
        });
        break;
      case 2:
        this.setState({
          randOperator: minus
        });
        break;
      case 3:
        this.setState({
          randOperator: mult
        });
        break;
      case 4:
        this.setState({
          randOperator: div
        });
        break;
      default:
        this.setState({
          randOperator: question
        });
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const { num1, num2, result, backresult } = this.state;

    var numberResult = parseFloat(num1) + parseFloat(num2);

    this.setState({
      backresult: numberResult
    });

    if (parseFloat(result) === backresult) {
      alert("Good Job");
      var increment = this.state.randScore + 1;
      this.setState({
        turnedOn: false,
        num1: "",
        num2: "",
        result: "",
        backresult: 0,
        randScore: increment
      });

      localStorage.setItem("randScore", increment);
    } else {
      if (
        window.confirm(
          "You are incorrect, try again. Press OK to try again, cancel to go on and get -1 points."
        )
      ) {
        increment = this.state.randScore - 1;
        this.setState({ turnedOn: true, randScore: increment });
        localStorage.setItem("randScore", increment);
      } else {
        increment = this.state.randScore - 1;
        this.setState({
          turnedOn: false,
          num1: "",
          num2: "",
          result: "",
          backresult: 0,
          randScore: increment
        });

        localStorage.setItem("randScore", increment);
      }
    }
  };

  render() {
    return (
      <div className="text-center">
        <p>
          You have selected <span className="text-danger">random</span>. Click
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
          <p>Score: {this.state.randScore}</p>
        </div>
        {this.state.randOperator !== div ? (
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
              {this.state.randOperator}{" "}
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
                placeholder={this.state.placeHolder}
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
              <button className="btn btn-danger" onClick={this.onCanvasErase}>
                Clear the Sketchpad
              </button>
            </div>
            {this.state.isCanvas ? <Canvas /> : null}
          </form>
        ) : (
          <form onSubmit={this.onSubmit}>
            <div className="input-group d-inline-flex text-center w-75">
              <input
                type="number"
                className="form-control ml-4"
                name="num1"
                required
                value={this.state.num1}
                onChange={this.onChange}
                placeholder="Enter a number..."
                disabled={this.state.turnedOn}
                pattern="[0-9]"
              />
              {this.state.randOperator}{" "}
              <input
                type="number"
                className="form-control"
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
              <button className="btn btn-danger" onClick={this.onCanvasErase}>
                Clear the Sketchpad
              </button>
            </div>
            {this.state.isCanvas ? <Canvas /> : null}
          </form>
        )}
      </div>
    );
  }
}
