import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import Notification from './Components/Notification'
import contactService from './Services/Contacts'

const App = () => {

  const [ persons, setPersons] = useState([]) //Kontaktien tila
  const [ newName, setNewName ] = useState("") //Nimikentän tila
  const [ newNumber, setNewNumber ] = useState("") //Numerokentän tila
  const [ filter, setFilter ] = useState("") //Hakukentän tila
  const [ notificationMessage, setNotificationMessage ] = useState(null)


  // Datan hakeminen palvelimelta useEffect hookilla
  useEffect(() => {
    contactService.getAll().then(allContacts => {
      setPersons(allContacts)
    })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    
    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {

      if (window.confirm(`${newName} is already added to phonebook, replace the old numer with a new one?`)){
        const id = persons.find(person => person.name === newName).id
        
        onUpdateNumber(id)
        setNewName('')
        setNewNumber('')
    }
      
    }
    else contactService.create(nameObject).then(retunedContact => {
      setPersons(persons.concat(retunedContact))
      setNewName('')
      setNewNumber('')

      
      setNotificationMessage(`Added ${nameObject.name} `)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
    )
  }

  const onUpdateNumber = (id) => {

    const person = persons.find(p => p.id === id)
    const newObject = {...person, number: newNumber}

    contactService
      .updateNumber(id, newObject)
      .then(returnedPerson => {

        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        
        setNotificationMessage("Number updated!")
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        
      })
      .catch(error => {

        setNotificationMessage(`The information for ${person.name} has already been deleted from the phonebook`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)

      })
  }

  const onDeleteName = (id) => {
  
    const contact = persons.find(person => person.id === id)

    if (window.confirm("Delete " + contact.name + "?")){
      contactService
        .deleteObject(contact.id)
        .then(response => {
          setPersons(persons.filter(deletedContact => deletedContact.id !== id))
        })
        
      setNotificationMessage(`${contact.name} deleted from phonebook`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
}



  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setFilter(event.target.value)
  }

  const namesToShow = (filter.length === 0)
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    
    <div>

      <h1>Phonebook</h1>


      <Notification message={notificationMessage} />

      <Filter 
      value={filter}
      onChange={handleNewFilter} />

      <h2>Add a new contact</h2>

      <PersonForm 
      newName={newName} 
      newNumber={newNumber} 
      onSubmit={addName}
      handleNewName={handleNewName}
      handleNewNumber={handleNewNumber} />

      <h2>Numbers</h2>

      <Persons
      namesToShow={namesToShow}
      onDelete={onDeleteName} 
      />

    </div>
  )

}

export default App
