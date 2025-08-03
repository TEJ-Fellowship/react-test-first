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
  const filteredPeople = people.filter(person => {
    if (searchTerm.toLowerCase() === person.name.toLowerCase()) {
      return true;
    } else if (searchTerm === '') {
      return true;
    } else {
      return false;
    }
  });

  // Handle form submission (Add or Update)
  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in both name and phone fields');
      return;
    }

    if (editingId) {
    const updatedPeople=people.map(obj => {
        if (editingId === obj.id) {
          obj.name=name;
          obj.phone=phone;
          return obj;
        }else{
          return obj;
        }
      })
      setPeople(updatedPeople);
      setEditingId(null);
    } else {
      setPeople([...people, { id: people.at(-1).id + 1, name, phone }]);
    }
    // Clear form
    setName('');
    setPhone('');
  };

  // Handle edit button click
  const handleEdit = (person) => {
   setName(person.name);
   setPhone(person.phone);
   setEditingId(person.id);
  };

  // Handle delete button click
  const handleDelete = (id) => {
    // TODO: Handle delete button click
    // code here...
    const updated = people.filter(person => person.id !== id);
    setPeople(updated);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    // TODO: Handle cancel edit
    // code here...
    setEditingId(null);
    setName('');
    setPhone('');
  };

  return (
    <div className={styles.container}>
      {/* Left Panel - Inputs */}
      <div className={styles.leftPanel}>
        <h2 className={styles.title}>
          {editingId?'Edit Person':'Add Person'}
        </h2>

        <input
          className={styles.input}
          value={name}
          placeholder='Enter name'
          onChange={(el) => setName(el.target.value)}
        />

        <input
          className={styles.input}
          value={phone}
          placeholder='Enter phone number'
          onChange={(el) => setPhone(el.target.value)}
        />

        {!editingId ? (<button className={styles.button}
          onClick={handleSubmit}
        >Add
        </button>) :

          (<><button className={styles.button}
            onClick={handleSubmit}
          >Update
          </button>

            <button
              className={styles.button}
              onClick={handleCancelEdit}
            >Cancel
            </button>
          </>)}
      </div>

      {/* Right Panel - People List */}
      <div className={styles.rightPanel}>
        <h2 className={styles.title}>People List</h2>

        {/* Show/Hide Toggle Button */}
        <button
          className={styles.toggleButton}
          onClick={() => setShowList(!showList)}
        >
          {showList ? 'Hide List' : 'Show List'}
        </button>

        {/* TODO: Implement Search Input */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name..."
            onChange={(el) => setSearchTerm(el.target.value)}
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
            {filteredPeople.length === 0 ? 'No people found' :
              (filteredPeople.map(el => {
                return (
                  <li className={styles.personItem}>
                    <div className={styles.personInfo}>
                      <h3 className={styles.personName}>{el.name}</h3>
                      <p className={styles.personPhone}>{el.phone}</p>
                    </div>
                    <div className={styles.personActions}>
                      <button className={styles.editButton} onClick={()=>handleEdit(el)}>Edit</button>
                      <button className={styles.deleteButton} onClick={()=>handleDelete(el.id)}>Delete</button>
                    </div>
                  </li>
                )
              }))
            }
          </ul>
        )}
      </div>
    </div>
  );
}

export default PeopleManager;