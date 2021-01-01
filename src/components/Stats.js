import React from "react";
import "../styles.css";



const Stats = (props)=>{
  return <div className="stats-field">
    <h1>Results: </h1>
    
  <h2>Correct: {props.results.correct}</h2>

    <h2>
      Incorrect: {props.results.incorrect}
    
    <br/>
      <ul className="ol-center">
      { props.results.incorrectList.map((el,i) => (
        <li key={i * Math.random() * (37 * i + Math.random())} >{el}</li>
      ))
      }
      </ul>
    </h2>

    <h2>
      Skipped: {props.results.skip}
<br/>
      <ul className="ol-center">
      {props.results.skipList.map((el,i) => (
        <li key={i * Math.random() * (37 * i + Math.random())}>{el}</li>
      ))}
      </ul>
    </h2>
  </div>
}
export default Stats;