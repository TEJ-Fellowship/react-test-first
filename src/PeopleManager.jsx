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
  // const filteredPeople = people.filter(person =>
  //   some code here...
  // );

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

    const obj = {
      id: people.length + 1,
      name,
      phone,
    };

    if (editingId) {
      // TODO: Update existing person
      // code here...
      setPeople(
        people.map((person) =>
          person.id === editingId ? { ...person, name, phone } : person
        )
      );
      setEditingId(null);
    } else {
      // TODO: Add new person
      // code here...
      setPeople([...people, obj]);
    }

    // Clear form
    setName("");
    setPhone("");
  };

  // Handle edit button click
  const handleEdit = (person) => {
    // TODO: Handle edit button click
    // code here...
    setEditingId(person.id);
    setName(person.name);
    setPhone(person.phone);
    setSearchTerm("");
  };

  // Handle delete button click
  const handleDelete = (id) => {
    // TODO: Handle delete button click
    // code here...
    setPeople(people.filter((person) => person.id !== id));
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
          {!editingId ? "Add Person" : "Edit People"}
        </h2>

        <input
          className={styles.input}
          // code here... to add name input
          onChange={(event) => setName(event.target.value)}
          value={name}
        />

        <input
          className={styles.input}
          // code here... to add phone input
          onChange={(event) => setPhone(event.target.value)}
          value={phone}
        />

        <button
          // code here... to add add/update button
          onClick={() => handleSubmit()}
        >
          {!editingId ? "Add " : "Edit"}
        </button>

        {editingId && (
          <button
            className={styles.button}
            // code here... to add cancel button
            onClick={() => handleCancelEdit()}
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
          onClick={() => setShowList(!showList)}
          // code here... to add show/hide toggle button
        >
          {showList ? "Hide List" : "Show List"}
        </button>

        {/* TODO: Implement Search Input */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name..."
            onChange={(event) => setSearchTerm(event.target.value)}
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
              <h1 className={styles.noResults}>No Person Found</h1>
            ) : (
              filteredPeople.map((person) => {
                return (
                  <li key={person.id} className={styles.personItem}>
                    <div className={styles.personInfo}>
                      <h3 className={styles.personName}>{person.name}</h3>
                      <p className={styles.personPhone}>{person.phone}</p>
                    </div>
                    <div className={styles.personAction}>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEdit(person)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(person.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })
            )}

            {/* {people.map((person) => (
                  <li className={styles.personItem}>
                    <div className={styles.personInfo}>
                      <h3 className={styles.personName}>{person.name}</h3>
                      <p className={styles.personPhone}>{person.phone}</p>
                    </div>
                    <div className={styles.personAction}>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEdit(person)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(person.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))} */}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PeopleManager;
