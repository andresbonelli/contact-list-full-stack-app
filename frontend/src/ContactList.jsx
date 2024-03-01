import React from "react";

const ContactList = ({ contacts, updateContact, updateCallback }) => {

    async function handleDeleteButton(id) {
        const isConfirmed = window.confirm("Delete contact?");
        if (!isConfirmed) return

        console.log(`Deleted contact with Id: ${id}`)
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
        
    };

    return <>
    <div>
        <h2>Contact list</h2>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>E-mail Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <tr key={contact.id}>
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email}</td>
                        <td>
                            <button className="action-button" onClick={() => updateContact(contact)}>Update</button>
                            <button className="action-button" onClick={() => handleDeleteButton(contact.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
   
    </>
};

export default ContactList