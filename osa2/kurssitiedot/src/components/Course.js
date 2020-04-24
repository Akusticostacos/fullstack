import React from 'react'

const Header = ({ course }) => {
  console.log(course)
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Content = ({ course }) => {
  console.log(course)
  return (
    <div>
      {course.parts.map(part => <Part part={part} key={part.id}/>)}
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p> {props.part.name} {props.part.exercises} </p>
    </div>
  )
}

const Total = ({ course }) => {

  let initialValue = 0
  const sum = course.parts.reduce((accumulator, currentvalue) => accumulator + currentvalue.exercises, initialValue)
  return (
    <div>
      <p>Number of exercises {sum} </p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course