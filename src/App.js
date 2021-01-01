import React, { useState } from "react";
import "./styles.css";
import Stats from "./components/Stats";

export default function App() {
  const [question, setQuestion] = useState([]);
  const [hide, setHide] = useState(true);
  const [hideStats, setHideStats] = useState(true);
  const [current, setCurrent] = useState(1);
  const [results, setResults] = useState({
    correct: 0,
    incorrect: 0,
    skip: 0,
    incorrectList: [],
    skipList: []
  });
  const [inp, setInp] = useState("");
  const [theme, setThem] = useState(true);
  const startQuiz = () => {
    setCurrent(1);
    setHide(!hide);
    setHideStats(true);
    generator();
    setResults({
      correct: 0,
      incorrect: 0,
      skip: 0,
      incorrectList: [],
      skipList: []
    });
  };
  const quit = () => {
    setHide(!hide);
    setHideStats(false);
  };

  const generator = () => {
    let a = Math.ceil(Math.random() * 10);
    let b = Math.ceil(Math.random() * 10);
    let sign = ["+", "-", "x"][Math.floor(Math.random() * 3)];
    let ans = 0;
    switch (sign) {
      case "+":
        ans = a + b;
        break;
      case "-":
        ans = a - b;
        break;
      case "x":
        ans = a * b;
        break;
      //case "÷":
      //ans = a / b;
      //break;
      default:
        break;
    }
    setQuestion([`${a} ${sign} ${b}`, ans]);
  };

  const skip = () => {
    setResults({
      ...results,
      skip: results.skip + 1,
      skipList: [...results.skipList, question[0]]
    });
    setInp("");
    generator();
    changeNumQuestion();
    if (current >= 10) {
      setHide(!hide);
      setHideStats(false);
    }
  };

  const changeNumQuestion = () => {
    setCurrent(current + 1);
  };
  const submit = () => {
    if (inp) {
      if (inp === String(question[1])) {
        setResults({ ...results, correct: results.correct + 1 });
        setInp("");
        generator();
        changeNumQuestion();
      } else {
        setResults({
          ...results,
          incorrect: results.incorrect + 1,
          incorrectList: [...results.incorrectList, question[0] + " = " + inp]
        });
      }
      setInp("");
      generator();
      changeNumQuestion();

      if (current >= 10) {
        setHide(!hide);
        setHideStats(false);
      }
    }
  };

  const inpEnter = (event) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  const changeInput = (e) => {
    setInp(e.target.value);
  };

  return (
    <div className="App-light">
      {hide ? (
        <div>
          <h1>Math quiz</h1>
          <button className="btn-blue" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      ) : (
        ""
      )}

      {hide ? (
        ""
      ) : (
        <div>
          <span>{current}/10</span>
          <br />
          <span>{question[0]} = </span>
          <input
            autoFocus
            className="input-green"
            type="number"
            onChange={(e) => changeInput(e)}
            value={inp}
            onKeyPress={inpEnter}
          />
          <button className="btn-green" onClick={submit}>
            Submit
          </button>
          <br />
          <button className="btn-yellow" onClick={skip}>
            Skip
          </button>
          <br />
          <button className="btn-red" onClick={quit}>
            Quit
          </button>
        </div>
      )}
      {hideStats ? "" : <Stats results={results} />}

      {/* <button>Light</button>
    <button >Dark</button> */}
    </div>
  );
}
