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

function  filter(e){
  let input = e.target.value
  setSearchTerm(input);

  if(input === ''){
    setPeople(people);
  }

  else{
  const filteredPeople = people.filter((p) =>{
    return p.name.toLowerCase().includes(input.toLowerCase())
  })
  setPeople(filteredPeople)
}
}

  // Handle form submission (Add or Update)
  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in both name and phone fields');
      return;
    }

   
   
     
    
    if (editingId) {
      // TODO: Update existing person
      // code here...
    let update = people.map((p) =>{
      if(p.id === editingId){
        p.name = name
        p.phone = phone
        return p;
      }
      else{
        return p;
      }
    })
    setPeople(update);
    setEditingId(null);

    } else {
      // TODO: Add new person
      // code here...
      setPeople([
        ...people,
        { id: people.length + 1, name: name, phone: phone },
      ]);
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
  
    setPeople(people.filter((p) => p.id !== id))
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
         {editingId ? "Edit" : "Add"}
        </h2>

        <input
          className={styles.input}
          // code here... to add name input
          placeholder="enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={styles.input}
          // code here... to add phone input

          placeholder="enter your number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />


{editingId ?  <button
          // code here... to add add/update button
          onClick={handleSubmit}
        >Update
        </button> :
        <button
          // code here... to add add/update button
          onClick={handleSubmit}
        >Add
        </button> }
       

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
          onClick={() =>{
            setShowList(!showList)
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
            // code here... to add search input
            value={searchTerm}
            onChange={filter}
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

            {people.map((p) => (
              <>
                <li className={styles.personItem} key={p.id}>
                  <div className={styles.personInfo}>
                    <h3 className={styles.personName}>{p.name}</h3>
                    <p className={styles.personPhone}>{p.phone}</p>
                  </div>
                </li>
                <div className={styles.personAction}>


                  <button
                    className={styles.editButton}
                    onClick={()=> handleEdit(p)}
                  >
                    edit
                  </button>

                  <button className={styles.deleteButton} onClick={()=> handleDelete(p.id)}>delete</button>
                </div>
              </>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PeopleManager;
