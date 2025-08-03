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
   person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  // Handle form submission (Add or Update)
  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in both name and phone fields');
      return;
    }

    if (editingId) {
        const updatedPeople = people.map(person=>
        {
          if(person.id===editingId){
            person.id = people.length+1;
            person.name = name;
            person.phone = phone;
            return person;
          }else{
            return person;
          }
        }
        )
        setPeople(updatedPeople);
    } else {
    
    const obj ={"id" : peopleData.length+1 , "name":name , "phone":phone};
    setPeople([...people,obj])

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
    const filtered=people.filter((item)=> item.id !== id);
    setPeople(filtered);
    
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setPhone('');
    // TODO: Handle cancel edit
    // code here...
  };
  
  return (
    <div className={styles.container}>
      {/* Left Panel - Inputs */}
      <div className={styles.leftPanel}>
        <h2 className={styles.title}>
          {/* TODO: Add title here : "Add/Edit Person" */}
          {editingId ? 'Edit Person' : 'Add Person'}
        </h2>
        
        <input
        className={styles.input}
        value ={name}
        onChange={(e)=>setName(e.target.value)
        }
      />
        <input
        className={styles.input}
        value={phone}
      onChange={(e)=>setPhone(e.target.value)
        }
        />

        <button
          onClick={handleSubmit}
        >
         {editingId? 'Update':'Add'}
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
          onClick={()=> setShowList(!showList)}
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
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />

        </div>

        {/* People List */}
        {showList && (
          <ul className={styles.peopleList}>
            {filteredPeople.map((list)=> 
            <li key={list.id} className={styles.personItem}> 
              < div className={styles.personInfo}> 
             <h3 className={styles.personName}>{list.name}  </h3>
             <p className={styles.personPhone}>{list.phone}</p>
             </div>
               <div className={styles.personActions}>
                <button onClick={()=>handleEdit(list)} className={styles.editButton}>Edit</button>
              <button onClick={()=>handleDelete(list.id)}className={styles.deleteButton}>Delete</button>
               </div>
            </li>
            
            )}
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