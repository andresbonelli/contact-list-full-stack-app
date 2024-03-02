import { useState, useEffect } from 'react'
import './App.css'
import ContactList from './ContactList'
import ContactForm from './ContactForm'

function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})


  const baseURL = "http://127.0.0.1:5000/"

  useEffect(() => {
    fetchContacts()
  }, [])

  async function fetchContacts() {
    const response = await fetch(baseURL + "contacts")
    const data = await response.json()
    setContacts(data.contacts)
    console.log(data.contacts)
  }

  function closeModal() {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  function openCreateModal() {
    if(!isModalOpen) setIsModalOpen(true)
  }

  function openEditModal(contact) {
    if(isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  function onUpdate() {
    closeModal()
    fetchContacts()
  }

  return (
    <>
     <div className='container'>
     <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
     <button className="submit-button" onClick={openCreateModal}>Create New</button>
     { isModalOpen && <div className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>&times;</span>
          <div className='form-container'>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
          </div>
        </div>
      </div>
      }
      </div>
    </>
  )
}

export default App
