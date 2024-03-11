import { useState } from 'react'

//This code is for the exercises 1.12* to 1.14*
// If i want to test this code, i need to go to main.jsx and use <App1 /> instead of <App />, that is defined in the other App.jsx file


const Button = ({onSmash, text}) => {
    return (
        <div>
            <button onClick={onSmash}> {text}</button>
        </div>
    )
}

const App1 = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
      ]
    
      const [selected, setSelected] = useState(0)
      // Initialize vote counts
      const [dicc, setDicc] = useState(() => {
        const initialDicc = {};
        for (let i = 0; i < anecdotes.length; i++) {
          initialDicc[i] = 0;
        }
        return initialDicc;
      });

       // New state for most voted anecdote index
      const [mostVotedIndex, setMostVotedIndex] = useState(0);
    
      const nextAnecdote = () => {
        //Acá se re-renderiza el componente
        setSelected(Math.floor(Math.random()*anecdotes.length))
      }

      const voteAnecdote = () => {
        const newDicc = { ...dicc }; // Create a copy to avoid mutation
        newDicc[selected] += 1;
        setDicc(newDicc);

         // Find the new most voted index after update
        let max = newDicc[mostVotedIndex];
        let index = mostVotedIndex;
        for (let i = 0; i < Object.keys(newDicc).length; i++) {
          if (newDicc[i] > max) {
            max = newDicc[i];
            index = i;
          }
        }
        setMostVotedIndex(index);
      };


      return (
        <div>
          <h1>Anecdote of the day</h1>
          {anecdotes[selected]} <br />
          <p>Has {dicc[selected]} votes</p>
          <Button onSmash={voteAnecdote} text="vote" />
          <Button onSmash={nextAnecdote} text="next anecdote" />

          <h1>Anecdote with most votes</h1>
          {anecdotes[mostVotedIndex]}

          
        </div>
      )
}

export default App1;