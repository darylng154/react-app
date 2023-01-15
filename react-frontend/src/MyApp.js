import React, {useState} from 'react'
import Table from './Table'
import Form from './Form';


function MyApp() { 
const [characters, setCharacters] = useState([/*empty Table*/]);  

function removeOneCharacter (index) {
const updated = characters.filter((character, i) => {
    return i !== index
  });
  setCharacters(updated);
}

  // characters & removeOneCharacter = props we are passing to Table
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form />
    </div>
  )
}  

export default MyApp;