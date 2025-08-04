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

  // Filter people based on search term
  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission (Add or Update)
  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in both name and phone fields');
      return;
    }

    if (editingId) {
      // Update existing person
      setPeople(people.map(person =>
        person.id === editingId
          ? { ...person, name: name, phone: phone }
          : person
      ));
      setEditingId(null);
    } else {
      // Add new person
      const newPerson = {
        id: people.length+1,
        name: name,
        phone: phone
      };
      setPeople([...people, newPerson]);
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
    if (window.confirm('Are you sure you want to delete this person?')) {
      setPeople(people.filter(person => person.id !== id));
      // If we're editing this person, clear the form
      if (editingId === id) {
        setName('');
        setPhone('');
        setEditingId(null);
      }
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setName('');
    setPhone('');
    setEditingId(null);
  };

  return (
    <div className={styles.container}>
      {/* Left Panel - Inputs */}
      <div className={styles.leftPanel}>
        <h2 className={styles.title}>
          {editingId ? 'Edit Person' : 'Add New Person'}
        </h2>
        
        <input
          type="text"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />

        <input
          type="text"
          className={styles.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
        />

        <button
          className={`${styles.button} ${editingId ? styles.buttonUpdate : ''}`}
          onClick={handleSubmit}
        >
          {editingId ? 'Update' : 'Add'}
        </button>

        {editingId && (
          <button
            className={styles.button}
            onClick={handleCancelEdit}
            style={{ background: '#6c757d' }}
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
        >
          {showList ? 'Hide List' : 'Show List'}
        </button>

        {/* Search Input */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* People List */}
        {showList && (
          <ul className={styles.peopleList}>
            {filteredPeople.length === 0 ? (
              <li className={styles.noResults}>
                {searchTerm ? 'No people found matching your search.' : 'No people in the list.'}
              </li>
            ) : (
              filteredPeople.map(person => (
                <li key={person.id} className={styles.personItem}>
                  <div className={styles.personInfo}>
                    <h3 className={styles.personName}>{person.name}</h3>
                    <p className={styles.personPhone}>{person.phone}</p>
                  </div>
                  <div className={styles.personActions}>
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
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PeopleManager; 