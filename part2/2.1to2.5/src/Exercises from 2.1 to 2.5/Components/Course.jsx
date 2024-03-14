const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  
  const Header = ({ course }) => {
    return (
        <h1>{course}</h1>
    )
  }
  
  const Content = ({parts}) => {
  
    const partTags = [];
    for (let i = 0; i < parts.length; i++) {
      partTags.push(<Part key={i} part={parts[i].name} exercises={parts[i].exercises} />);
    }
  
  
    return (
      <div>
          {partTags}
      </div>
    )
  }
  
  const Part = ({ part, exercises }) => {
    return (
      <div>
        <p>
          {part} {exercises}
        </p>
      </div>
    )
  }
  
  const Total = ({ parts }) => {
  
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  
    return (
      <div>
        <p>
          Total of {total} exercises
        </p>
      </div>
    )
  }


  export default Course;