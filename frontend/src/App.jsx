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

  // Main function to retrieve "Contacts" object database from API endpoint "/contacts"
  // (Method defaults to "GET", no headers or body required) 
  async function fetchContacts() {
    const response = await fetch(baseURL + "contacts")
    const data = await response.json()
    setContacts(data.contacts)
    console.log(data.contacts)
  }

  // A dangerous function that deletes the entire database from API endpoint "/delete_contacts"
  // Response "200" confirms utter and irreversible deletion of the table 
  // performed by SQLAlchemy python module on the backend
  async function handleDeleteAllContacts() {
    const isConfirmed = window.confirm("Delete all contacts? (this action cannot be undone)");
        if (!isConfirmed) return
    try {
        const options = {
            method: "DELETE"
        }
        const response = await fetch(baseURL + "delete_contacts", options)
        if (response.status === 200) {
            console.log("Table deleted succesfully")
        } else {
            console.error("Failed to delete")
        }
    } catch (error) {
        console.log(error)
        alert(error)
    }
    fetchContacts()
  }

   
  /* The following functions manage the state of a modal box(*) used for creating and editing contacts.
   * The modal is summoned whether for creating a new contact or editing an existing one
   * by a simple conditional render of a <div/> element with class name "modal".
   * (*) Modals: pop-up over everything else in the document, removing scroll function from the <body> 
   */

  // Closes the modal by setting isModalOpen to false and resetting the currentContact state to an empty object.
  function closeModal() {
    setIsModalOpen(false)
    setCurrentContact({})
  }
  // Opens the modal for creating a new contact if it's not already open.
  function openCreateModal() {
    if(!isModalOpen) setIsModalOpen(true)
  }

  // Opens the modal for editing a contact if it's not already open.
  // param "contact" represents the object to be edited.
  function openEditModal(contact) {
    if(isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  // Callback function called after updating a contact. Invokes previous closeModal function
  // and fetches the -hopefully- already updated on the backend database list of contacts.
  function onUpdate() {
    closeModal()
    fetchContacts()
  }

  return (
    <>
     <div className='container'>
     <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
     <button className="submit-button" onClick={openCreateModal}>Create New</button>
     <button className="submit-button" onClick={handleDeleteAllContacts}>Delete All</button>
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
