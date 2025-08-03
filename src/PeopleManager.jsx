import { useState, useEffect } from "react";
import peopleData from "./data.json";
import styles from "./PeopleManager.module.css";

function PeopleManager() {
  // State for people list
  const [people, setPeople] = useState([]);

  // State for form inputs
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // State for editing
  const [editingId, setEditingId] = useState(null);

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // State for show/hide list
  const [showList, setShowList] = useState(true);

  // Load initial data
  useEffect(() => {
    setPeople(peopleData);
  }, []);

  // TODO: Implement search filtering
  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission (Add or Update)
  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) {
      alert("Please fill in both name and phone fields");
      return;
    }
    if (editingId) {
      let filtered = people.map((person) => {
        if (person.id === editingId) {
          return (person = { ...person, name: name, phone: phone });
        }
        return person;
      });
      setPeople(filtered);
    } else {
      // TODO: Add new person
      const newData = { id: people.length + 1, name: name, number: phone };
      setPeople([...people, newData]);
      // code here...
    }

    // Clear form
    setName("");
    setPhone("");
  };

  // Handle edit button click
  const handleEdit = (id) => {
    const [person] = people.filter((person) => person.id === id);
    setName(person.name);
    setPhone(person.phone);
    setEditingId(person.id);
  };

  // Handle delete button click
  const handleDelete = (id) => {
    let filtered = people.filter((person) => person.id !== id);
    setPeople(filtered);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setPhone("");
  };

  return (
    <div className={styles.container}>
      {/* Left Panel - Inputs */}
      <div className={styles.leftPanel}>
        {/* {!editingId? <h2 className={styles.title} >Add Person</h2> : <h2 className={styles.title}>Edit Person</h2>} */}
         <h2 className={styles.title}>
          {!editingId ? "Add Person" : "Edit Person"}
         </h2> 
        <input
          className={styles.input}
          type="text"
          id="nameInput"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          className={styles.input}
          type="number"
          id="numberInput"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
        <button onClick={handleSubmit}>{editingId? "Edit" : "Add"}</button>
        {editingId && (
          <button className={styles.button} onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </div>

      {/* Right Panel - People List */}
      <div className={styles.rightPanel}>
        <h2 className={styles.title}>People List</h2>

        {/* Show/Hide Toggle Button */}
        <button
          className={styles.toggleButton}
          onClick={() => {
            setShowList(!showList);
          }}
        >
          {showList ? "Hide List" : "Show List"}
        </button>

        {/* TODO: Implement Search Input */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* People List */}
        {/* TODO: Add your list rendering logic here */}
        {showList && (
          <ul className={styles.peopleList}>
            {filteredPeople.map((person) => {
              return (
                <li className={styles.personItem} key={person.id}>
                  <div className={styles.personInfo}>
                    <h3 className={styles.personName}>{person.name}</h3>
                    <p className={styles.personPhone}>{person.phone}</p>
                  </div>
                  <div className="personActions">
                    <button
                      onClick={() => {
                        handleEdit(person.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(person.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}

            {/* 
              Requirements:
              1. Show "No people found" message when filteredPeople is empty , use noResults class for styling
              2. Map through filteredPeople to display each person
              3. Each person should show name and phone
              4. Add Edit and Delete buttons for each person
              5. Use the provided CSS classes for styling (personItem, personInfo, personName, personPhone, personActions, editButton, deleteButton)
            */}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PeopleManager;
