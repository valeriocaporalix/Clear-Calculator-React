import './App.css';
import React from "react"

let defaultValue = "0";
const operators = /[-+x/]/;

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    displayNum : defaultValue,
    formula : ""
  };
    this.clearInput = this.clearInput.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleDot = this.handleDot.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
}
  /* ------------------ Clear Button Setup ------------------ */  
  clearInput = () => {
    this.setState({
      displayNum : defaultValue,
      formula : ""
    })
  };

  /* ------------------ Number Buttons Setup ------------------ */
  handleNumber(e) {
    const eventTargetValN = e.target.value;

    if (operators.test(this.state.displayNum)) {
      this.setState({
        displayNum: eventTargetValN,
        formula: this.state.formula + eventTargetValN
      });
    } else if (this.state.displayNum === "0") {
      if (eventTargetValN !== "0") {
        this.setState({
          displayNum: eventTargetValN,
          formula: this.state.formula + eventTargetValN
        });
      }
    } else {
      this.setState({
        displayNum: this.state.displayNum + eventTargetValN,
        formula: this.state.formula + eventTargetValN
      });
    }
  }
  
  /* ------------------ Operators Button Setup ------------------ */  
  handleOperator(e) {
    let eventTargetValO = e.target.value;

    if (this.state.formula === "") {
      this.setState({formula: "0"});
    } else if (this.state.formula[this.state.formula.length - 1] === ".") {
      this.setState({formula: this.state.formula.slice(0, this.state.formula.length - 1)})
    } else if (operators.test(this.state.displayNum) && eventTargetValO !== "-") {
      if (this.state.displayNum === "-" 
         && this.state.formula[this.state.formula.length - 2] !== "1"
         && this.state.formula[this.state.formula.length - 2] !== "2"
         && this.state.formula[this.state.formula.length - 2] !== "3"
         && this.state.formula[this.state.formula.length - 2] !== "4"
         && this.state.formula[this.state.formula.length - 2] !== "5"
         && this.state.formula[this.state.formula.length - 2] !== "6"
         && this.state.formula[this.state.formula.length - 2] !== "7"
         && this.state.formula[this.state.formula.length - 2] !== "8"
         && this.state.formula[this.state.formula.length - 2] !== "9"
         && this.state.formula[this.state.formula.length - 2] !== "0") {
        this.setState({formula: this.state.formula.slice(0, this.state.formula.length - 2)});
      } else {
        this.setState({formula: this.state.formula.slice(0, this.state.formula.length - 1)});
      }
    }
    
    if (eventTargetValO === "-" && this.state.displayNum === "-"){
      this.setState({formula: this.state.formula.slice(0, this.state.formula.length - 1)});
    }
      
    this.setState({
      displayNum: eventTargetValO,
      formula: this.state.formula + eventTargetValO
    });
  }
  
  /* ------------------ Dot Button Setup ------------------ */
  handleDot() {
    const displayState = this.state.displayNum;
    if (!operators.test(displayState) && !displayState.includes(".")) {
      this.setState({
        displayNum: displayState + ".",
        formula: this.state.formula + (this.state.formula === "" ? "0." : ".")
      });
    }
  }
  /* ------------------ Equal Button Setup ------------------ */
  handleEqual() {
    let formulaState = this.state.formula;
    if (operators.test(formulaState[formulaState.length - 1])) {
      formulaState = formulaState.slice(0, formulaState.length - 1);
    }
    let result = eval(formulaState.replace(/x/, "*"));
    
    if (this.state.displayNum === "0" && this.state.formula === "") {
      this.setState({
      displayNum: this.state.displayNum,
      formula: this.state.formula
    });
    } else {
    this.setState({
      displayNum: result,
      formula: result
    });
    }
  }
  render() {
    return(
      <div id="app">
        <br></br>
        <h1 id="title">Cyndoriil's Javascript Calculator</h1>
        <h1 id="formula">Formula: {this.state.formula}</h1>
      <div className="container">
        <div className="display" id="display">
          <p>{this.state.displayNum}</p>
        </div>
        
      <button id="one" value="1" onClick={this.handleNumber}>1</button>
      <button id="two" value="2" onClick={this.handleNumber}>2</button>
      <button id="three" value="3" onClick={this.handleNumber}>3</button>
      <button id="clear" onClick={this.clearInput}>C</button>
      <button id="four" value="4" onClick={this.handleNumber}>4</button>
      <button id="five"value="5" onClick={this.handleNumber}>5</button>
      <button id="six" value="6" onClick={this.handleNumber}>6</button>
      <button id="add" value="+" onClick={this.handleOperator}>+</button>
      <button id="seven" value="7" onClick={this.handleNumber}>7</button>
      <button id="eight" value="8" onClick={this.handleNumber}>8</button>
      <button id="nine" value="9" onClick={this.handleNumber}>9</button>
      <button id="subtract" value="-" onClick={this.handleOperator}>-</button>
      <button id="decimal" onClick={this.handleDot}>.</button>
      <button id="zero" value="0" onClick={this.handleNumber}>0</button>
      <button id="divide" value="/" onClick={this.handleOperator}>/</button>
      <button id="multiply" value="x" onClick={this.handleOperator}>X</button>
      <button id="equals" onClick={this.handleEqual}>=</button>
      </div>
        <br></br>
      </div>
    )
  }
}
