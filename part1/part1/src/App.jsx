import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}> {props.text}</button>
    </div>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  let average = (props.good - props.bad) / all;
  let positive = (props.good / all) * 100;

  return (
    <div>
      <h1>Statistics</h1>
      {all === 0 ? (
        <div>No feedback given</div>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" value ={props.good} />
            <StatisticLine text="neutral" value ={props.neutral} />
            <StatisticLine text="bad" value ={props.bad} />
            <StatisticLine text="all" value ={all} />
            <StatisticLine text="average" value ={average} />
            <StatisticLine text="positive" value ={positive} />
          </tbody>
        </table>
      )}
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1> Give feedback </h1>

      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />

      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App