import { useState } from 'react'


const FilteredList = ({filteredPersons}) => {
  console.log("La lista de personas filtradas es ",filteredPersons);
  return (
    <div>
        {filteredPersons.map((person, index) => <PersonDetails key={index} person={person} />)}
    </div>
  )
}

const PersonDetails = ({person}) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
    </div>
  )
}

const Form = ({addPerson, newName, setNewName, newNumber, setNewNumber}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)


  //Event listener for form
  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    let newPerson = { name: newName, number: newNumber }
    setPersons([...persons, newPerson])
    setFilteredPersons([...filteredPersons, newPerson]) // Agrega la nueva persona al listado filtrado

    setNewName('') // Clear the input field after adding the person
    setNewNumber('')
  }

  const filterFunction = (event) => {
    setFilterInput(event.target.value)
    if(event.target.value === '') {
      setFilteredPersons(persons)
      return
    }
    else{
      const filtered = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
      setFilteredPersons(filtered);
    }

  }

  //console.log(persons);
  return (
    <div>
      <h2>Phonebook</h2>
      {/* Mi formulario */}
      <Form addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
  
      <h2>Numbers</h2>
      <div>
          filter shown with <input value={filterInput} onChange= {filterFunction}/>

          <FilteredList filteredPersons={filteredPersons} />
      </div>
    </div>
  )
}

export default App