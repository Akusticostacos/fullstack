import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const Statistics = (props) => {
  const {good, neutral, bad, all, value} = props
  
  if (all === 0) {
    return (
      <div>
        No feedback  given.
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
        <tr><StatisticsLine text="Good" numberValue={good}/></tr>
        <tr><StatisticsLine text="Neutral" numberValue={neutral}/></tr>      
        <tr><StatisticsLine text="Bad" numberValue={bad}/></tr>
        <tr><StatisticsLine text="All" numberValue={all}/></tr>
        <tr><StatisticsLine text="Average" numberValue={value/all}/></tr>
        <tr><StatisticsLine text="Positive" numberValue={good/all*100 + " %"}/></tr>
        </tbody>
      </table>    
    </div>
  )
}
 

const StatisticsLine = (props) => {
  const {text, numberValue} = props

  return (
    <>
      <td>{text}</td><td>{numberValue}</td>
    </>
  )
    
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [value, setValue] = useState(0)
   
  const handleGood = () => {
    setAll(all + 1)
    setValue(value + 1)
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setAll(all + 1)
    setValue(value)
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setAll(all + 1)
    setValue(value - 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback!</h1>
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} value={value} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
