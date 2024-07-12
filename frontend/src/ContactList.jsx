import { useState } from "react";

const ContactList = ({ contacts, updateContact, updateCallback }) => {
  const [sortCriteria, setSortCriteria] = useState(() => null);
  const [sortOrder, setSortOrder] = useState(() => "asc");

  function handleSort(criteria) {
    if (sortCriteria === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  }

  const sortedContacts = [...contacts].sort((a, b) => {
    if (sortCriteria) {
      const comparison = a[sortCriteria].localeCompare(b[sortCriteria]);
      return sortOrder === "asc" ? comparison : -comparison;
    } else {
      return 0;
    }
  });

  async function handleDeleteButton(id) {
    const isConfirmed = window.confirm("Delete contact?");
    if (!isConfirmed) return;

    console.log(`Deleted contact with Id: ${id}`);
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete_contact/${id}`,
        options
      );
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <>
      <div>
        <h2>Contact list App</h2>
        <table>
          <thead>
            <tr>
              <th
                className="th-pointer"
                onClick={() => handleSort("firstName")}
              >
                First Name{" "}
                {sortCriteria === "firstName" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="th-pointer" onClick={() => handleSort("lastName")}>
                Last Name{" "}
                {sortCriteria === "lastName" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="th-pointer" onClick={() => handleSort("email")}>
                Email{" "}
                {sortCriteria === "email" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              {/*<th>Date created</th>*/}
              <th>{/*Actions*/}</th>
            </tr>
          </thead>
          <tbody>
            {sortedContacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.email}</td>
                {/* <td>{contact.dateCreated}</td>*/}
                <td>
                  <div className="button-container">
                    <button
                      className="action-button"
                      onClick={() => updateContact(contact)}
                    >
                      Update
                    </button>
                    <button
                      className="action-button"
                      onClick={() => handleDeleteButton(contact.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ContactList;
