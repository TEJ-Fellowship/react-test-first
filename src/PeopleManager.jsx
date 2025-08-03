import { useState, useEffect } from 'react';
import peopleData from './data.json';
import styles from './PeopleManager.module.css';

function PeopleManager() {
  // State for people list
  const [people, setPeople] = useState([]);
  
  // State for form inputs
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  // State for editing
  const [editingId, setEditingId] = useState(null);
  
   // State for search
  const [searchTerm, setSearchTerm] = useState('');
  
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

  // Handle form submission (Add or Update)
  const handleSubmit = () => {
    // if (!name.trim() || !phone.trim()) {
    //   alert('Please fill in both name and phone fields');
    //   return;
    // }

    if (editingId) {
      // TODO: Update existing person
     // code here...
    } else {
      // TODO: Add new person
      // code here...
    }

    // Clear form
    setName('');
    setPhone('');
  };

  // Handle edit button click
  const handleEdit = (person) => {
    // TODO: Handle edit button click
    // code here...
  };

  // Handle delete button click
  const handleDelete = (id) => {
    // TODO: Handle delete button click
    // code here...
    
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    // TODO: Handle cancel edit
    // code here...
  };
  
  return (
    <div className={styles.container}>
      {/* Left Panel - Inputs */}
      <div className={styles.leftPanel}>
        <h2 className={styles.title}>
          {/* TODO: Add title here : "Add/Edit Person" */}
        </h2>
        
        <input
        className={styles.input}
          // code here... to add name input
        />

        <input
        className={styles.input}
          // code here... to add phone input
        />

        <button
          // code here... to add add/update button
        >
         Add or Update
        </button>

        {editingId && (
          <button
            className={styles.button}
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
        >
           {showList ? 'Hide List' : 'Show List'}
        </button>

         {/* TODO: Implement Search Input */}
        <div className={styles.searchContainer}>
        <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name..."
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
          </ul>
        )}
      </div>
    </div>
  );
}

export default PeopleManager;