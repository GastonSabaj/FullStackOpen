
// const Header = ({ course }) => {
//   return (
//       <h1>{course}</h1>
//   )
// }

// const Content = ({parts}) => {
//   return (
//     <div>
//         <Part part={parts[0].name} exercises={parts[0].exercises} />
//         <Part part={parts[1].name} exercises={parts[1].exercises} />
//         <Part part={parts[2].name} exercises={parts[2].exercises} />
//     </div>
//   )
// }

// const Part = ({ part, exercises }) => {
//   return (
//     <div>
//       <p>
//         {part} {exercises}
//       </p>
//     </div>
//   )
// }

// const Total = ({ parts }) => {

//   let total = 0;
//   for (let i = 0; i < parts.length; i++) {
//     total += parts[i].exercises;
//   }
  

//   return (
//     <div>
//       <p>
//         Number of exercises {total}
//       </p>
//     </div>
//   )
// }
// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }

//   return (
//     <div>
//       <Header course={course.name} />
//       <Content parts={course.parts} />
//       <Total parts={course.parts} />
      
//     </div>
//   )
// }

// export default App

import Course from './Components/Course'

const Courses = ({courses}) => {
  const coursesArray = [];
  for (let i = 0; i < courses.length; i++) {
    coursesArray.push(<Course key={i} course={courses[i]} />);
  }

  return (
    <div>
        {coursesArray}
    </div>
  )
}



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}


export default App;