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

  // Filter people based on search term (computed value)
  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(e) {
    setSearchTerm(e.target.value);
   
  }

  // Handle form submission (Add or Update)
  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) {
      alert("Please fill in both name and phone fields");
      return;
    }

    if (editingId) {
      // TODO: Update existing person
      // code here...
      let newPeople = people.map((person) => {
        if (person.id === editingId) {
          person.name = name;
          person.phone = phone;
          return person;
        } else {
          return person;
        }
      });
      setEditingId(null);

      setPeople(newPeople);
    } else {
      // TODO: Add new person
      // code here...
      let idd = people.length + 1;
      let obj = { id: idd, name: name, phone: phone };

      setPeople([...people, obj]);
      console.log([...people, obj]);
    }

    // Clear form
    setName("");
    setPhone("");
  };

  // Handle edit button click
  const handleEdit = (person) => {
    // TODO: Handle edit button click
    // code here...
    setName(person.name);
    setPhone(person.phone);
    setEditingId(person.id);
  };

  // Handle delete button click
  const handleDelete = (id) => {
    // TODO: Handle delete button click
    // code here...
    console.log(id);
    let newPeople = people.filter((pep) => pep.id !== id);
    setPeople(newPeople);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    // TODO: Handle cancel edit
    // code here...
    setEditingId(null);
    setName("");
    setPhone("");
  };

  return (
    <div className={styles.container}>
      {/* Left Panel - Inputs */}
      <div className={styles.leftPanel}>
        <h2 className={styles.title}>
          {/* TODO: Add title here : "Add/Edit Person" */}
          {editingId ? "Edit" : "Add"} Person
        </h2>

        <input
          className={styles.input}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          // code here... to add name input
        />

        <input
          className={styles.input}
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}

          // code here... to add phone input
        />

        <button
          onClick={handleSubmit}
          // code here... to add add/update button
        >
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button
            className={styles.button}
            onClick={handleCancelEdit}
            // code here... to add cancel button
          >
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
          // code here... to add show/hide toggle button
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
            value={searchTerm}
            className={styles.searchInput}
            placeholder="Search by name..."
            onChange={handleChange}
            // code here... to add search input
          />
        </div>

        {/* People List */}
        {showList && (
          <ul className={styles.peopleList}>
            {/* TODO: Add your list rendering logic here */}
            {/* 
              Requirements:
              1. Show "No people found" message when filteredPeople is empty , use noResults class for styling
              2. Map through filteredPeople to display each person
              3. Each person should show name and phone
              4. Add Edit and Delete buttons for each person
              5. Use the provided CSS classes for styling (personItem, personInfo, personName, personPhone, personActions, editButton, deleteButton)
            */}
            {filteredPeople.length === 0 ? (
              <div className={styles.noResults}>No people found</div>
            ) : (
              filteredPeople.map((pe) => {
                return (
                  <li key={pe.id} className={styles.personItem}>
                    <div className={styles.personInfo}>
                      <h3 className={styles.personName}>{pe.name}</h3>
                      <p className={styles.personPhone}>{pe.phone}</p>
                    </div>
                    <div className={styles.personActions}>
                      <button
                        onClick={() => {
                          handleEdit(pe);
                        }}
                        className={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(pe.id);
                        }}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PeopleManager;
