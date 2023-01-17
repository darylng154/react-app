import React, {useState} from 'react'
import Table from './Table'
import Form from './Form';

// characters is the array for people/person [names + jobs] defined in Form.js
function MyApp() { 
const [characters, setCharacters] = useState([/*empty Table*/]);  

function removeOneCharacter (index) {
const updated = characters.filter((character, i) => {
    return i !== index
  });
  setCharacters(updated);
}

function updateList(person) {
  setCharacters([...characters, person]);
}

  // characters & removeOneCharacter = props we are passing to Table
  // updateList = prop passing to Form
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}  

export default MyApp;