import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const MostVotes = (props) => {
  
  let mostPoints = 0
  let indexOfMost = 0

  for (let index = 0; index < props.points.length; index++) {   
         
    if (props.points[index] > mostPoints) {
      mostPoints = props.points[index]
      indexOfMost = index
    }    
  }
  
  return (
    <div>
      <h1>Anecdote with the most votes</h1>
      <p>{props.anecdotes[indexOfMost]}</p>
      <p>has {props.points[indexOfMost]} points</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))

  const handleNext = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    console.log({random})
    setSelected(random)
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day!</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} points</p>
      <Button text="Vote" onClick={handleVote} />
      <Button text="Next Anecdote" onClick={handleNext} />
      <MostVotes anecdotes={anecdotes} points={points} />   
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
