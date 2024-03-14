import { useState, useEffect } from 'react'
import axios from 'axios'


const FilteredList = ({filteredPersons}) => {
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
          {/* Es necesario el onChange para que se actualice el estado newName a medida que voy modificando el valor del input */}
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
  const [persons,setPersons] = useState([]);

  //Funcion asíncrona que le setea el estado persons con la data de db.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('db.json');
        setPersons(response.data.persons);
      } catch (error) {
        console.error('Error fetching data from db.json:', error);
      }
    };

    fetchData();
  }, []);


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  /* 
    Para solucionar esto, puedes utilizar el efecto useEffect para actualizar filteredPersons cada vez que persons cambie.
  */
  useEffect(() => {
    setFilteredPersons(persons);
  }, [persons]);

  //Event listener for form
  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    let newPerson = { name: newName, number: newNumber }
    //Guardo la nueva persona en el array
    setPersons([...persons, newPerson])

    // Agrega la nueva persona al listado filtrado
    setFilteredPersons([...filteredPersons, newPerson]) 

    //Reinicio el valor de los inputs
    setNewName('')
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