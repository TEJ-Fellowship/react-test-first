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
  const filteredPeople = people.filter(
    (person) =>
      person.name === searchTerm ||
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.phone.includes(searchTerm)
  );

  // Handle form submission (Add or Update)
  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) {
      alert("Please fill in both name and phone fields");
      return;
    }

    if (editingId) {
      // TODO: Update existing person
      // code here...
      setPeople(
        people.map((person) =>
          person.id === editingId ? { ...person, name, phone } : person
        )
      );
    } else {
      // TODO: Add new person
      // code here...

      const newPerson = {
        id: Date.now(), // Unique ID based on timestamp
        name,
        phone,
      };

      setPeople([...people, newPerson]);
    }

    // Clear form
    setName("");
    setPhone("");
  };

  // Handle edit button click
  const handleEdit = (data) => {
    // TODO: Handle edit button click
    // code here...

    setEditingId(data.id);
    setName(data.name);
    setPhone(data.phone);
    setShowList(true);
    setSearchTerm("");
  };

  // Handle delete button click
  const handleDelete = (id) => {
    // TODO: Handle delete button click
    // code here...
    setPeople(people.filter((person) => person.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setName("");
      setPhone("");
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    // TODO: Handle cancel edit
    // code here...
    setEditingId(null);
    setName("");
    setPhone("");
    setShowList(true);
    setSearchTerm("");
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
          // code here... to add name input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={styles.input}
          // code here... to add phone input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button className={styles.button} onClick={handleSubmit}>
          {editingId ? "Edit" : "Add"}
        </button>

        {editingId && (
          <button
            className={styles.button}
            // code here... to add cancel button
            onClick={handleCancelEdit}
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
          onClick={() => setShowList(!showList)}
        >
          {showList ? "Hide List" : "Show List"}
        </button>

        {/* TODO: Implement Search Input */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name..."
            // code here... to add search input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              <>
                <h1 className={styles.noResults}>No people found</h1>
              </>
            ) : (
              filteredPeople.map((data) => {
                return (
                  <li className={styles.personItem} key={data.id}>
                    <div className={styles.personInfo}>
                      <h3 className={styles.personName}>{data.name} </h3>
                      <p className={styles.personPhone}> {data.phone} </p>
                    </div>
                    <div className={styles.personActions}>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEdit(data)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(data.id)}
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
