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
  const filteredPeople = people.filter(person => 
  //   some code here...
  person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle form submission (Add or Update)
  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in both name and phone fields');
      return;
    }

    if(!name || !phone) return;
    const newperson= {"id": people.length+1, "name": name, "phone": phone}
    setPeople([...people, newperson])

    if (editingId) {
      // TODO: Update existing person
     // code here...
     let newPeople = people.map((person)=> {
      if(person.id === editingId) {
        person.name =name;
        person.phone = phone;
        return person;
      } else {
        return person;
      }
     });
     setEditingId(null)
     setName('')
     setPhone('')
     setPeople(newPeople)
    } else {
      // TODO: Add new person
      // code here...
      const newperson= {"id": people.length+1, "name": name, "phone": phone}
      setPeople([...people, newperson])
      setName('')
      setPhone('')
    }

    // Clear form
    setName('');
    setPhone('');
  };

  // Handle edit button click
  const handleEdit = (person) => {
    // TODO: Handle edit button click
    // code here...
    setName(person.name)
    setPhone(person.phone)
    setEditingId(person.id)
  };

  // Handle delete button click
  const handleDelete = (id) => {
    // TODO: Handle delete button click
    // code here...
    const updated =people.filter(person=> person.id !== id)
    setPeople(updated)
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    // TODO: Handle cancel edit
    // code here...
    setEditingId(null)
    setName('')
    setPhone('')
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
          placeholder='Add a New Name'
          value={name}
          onChange = {(e) => setName(e.target.value)}
        />

        <input
        className={styles.input}
          // code here... to add phone input
          placeholder='Add phone no.'
          value={phone}
          onChange = {(e) => setPhone(e.target.value)}
        />
        
        <button
          // code here... to add add/update button
          
          onClick={handleSubmit}
         
          
        >
        {editingId? 'Update':'Add'}
        </button>

        {editingId && (
          <button
            className={styles.button}
           // code here... to add cancel button
           onClick ={handleCancelEdit}
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
           {showList ? 'Hide List' : 'Show List'}
        </button>

         {/* TODO: Implement Search Input */}
        <div className={styles.searchContainer}>
        <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name..."
           // code here... to add search input
            value={searchTerm}
            onChange={(e) =>setSearchTerm(e.target.value)}
          />

        </div>

        {/* People List */}
        {showList && (
          <ul className={styles.peopleList}>
          {filteredPeople.length === 0 ? (
            <li className={styles.noResults}>No people found</li>
          ) : (
            filteredPeople.map(person =>(
              <li className={styles.personItem}>
              <div className={styles.personInfo}>
              <h3 className={styles.personName}>{person.name}</h3>
              <p className={styles.personPhone}>{person.phone}</p>
              </div>
              <div className={styles.personActions}>
              <button onClick={() =>handleEdit(person)} className={styles.editButton}>Edit</button>
              <button onClick={() =>handleDelete(person.id)} className={styles.deleteButton}>Delete</button>
              </div>
            </li>  
            ))
          )}
          
          
            
            {/* 
              Requirements:
              1. Show "No people found" message when filteredPeople is empty , use noResults class for styling
              2. Map through filteredPeople to display each person
              3. Each person should show name and phone
              4. Add Edit and Delete buttons for each person
              5. Use the provided CSS classes for styling (personItem, personInfo, personName, personPhone, personActions, editButton, deleteButton)
            */
              
            }
          </ul>
        )}
      </div>
    </div>
  );
}

export default PeopleManager;