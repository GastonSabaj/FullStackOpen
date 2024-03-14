import { useState, useEffect } from 'react'
import personService from './services/persons'



const FilteredList = ({ filteredPersons, handleDelete }) => {
  return (
    <div>
      {filteredPersons.map((person, index) => {
        return <PersonDetails key={index} person={person} handleDelete={handleDelete} />;
      })}
    </div>
  );
};

const PersonDetails = ({ person, handleDelete }) => {
  //console.log("Person:", person); // Agrega esta línea para depurar
  return (
    <div>
      <p>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person.id)}>delete</button>
      </p>
    </div>
  );
};

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
  const [persons, setPersons] = useState([]) 
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)


  //Event listener for form
  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = {...person, number: newNumber}
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setFilteredPersons(filteredPersons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('') // Limpia el input de nombre
            setNewNumber('')
          })
      }
      return
    }

    let newPerson = { name: newName, number: newNumber }
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons([...persons, newPerson])
        setFilteredPersons([...filteredPersons, newPerson]) // Agrega la nueva persona al listado filtrado
        setNewName('') // Limpia el input de nombre
        setNewNumber('')
      })

  }
  const handleDelete = (id) => {
    const name = persons.find(person => person.id === id).name
    if(window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setFilteredPersons(filteredPersons.filter(person => person.id !== id))
        })
    }
  };

  const filterFunction = (event) => {
    setFilterInput(event.target.value)
    if(event.target.value === '') {
      setFilteredPersons(persons)
      return
    }
    else{
      //Para cada persona, voy a convertir el nombre en minusculas 
      const filtered = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
      setFilteredPersons(filtered);
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      {/* Mi formulario */}
      <Form addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
  
      <h2>Numbers</h2>
      <div>
          filter shown with <input value={filterInput} onChange= {filterFunction}/>

          <FilteredList filteredPersons={filteredPersons} handleDelete={handleDelete} />
      </div>
    </div>
  )
}

export default App