import axios from 'axios';

import React, {useState, useEffect} from 'react'
import Table from './Table'
import Form from './Form';

// characters is the array for people/person [names + jobs] defined in Form.js
function MyApp() { 
const [characters, setCharacters] = useState([/*empty Table*/]);

useEffect(() => {
  fetchAll().then( result => {
     if (result)
        setCharacters(result);
   });
}, [] );

// characters & removeOneCharacter = props we are passing to Table
// updateList = prop passing to Form
return (  // return for MyApp()
  <div className="container">
    <Table characterData={characters} removeCharacter={removeOneCharacter} />
    <Form handleSubmit={updateList} />
  </div>
)

function removeOneCharacter (index) {
const updated = characters.filter((character, i) => {
    return i !== index
  });
  setCharacters(updated);
}

function updateList(person) { 
  makePostCall(person).then( result => {
    if (result && result.status === 200)
      setCharacters([...characters, person] );
  });
}

// calls to our API requests endpoints
async function fetchAll(){
  try {
     const response = await axios.get('http://localhost:5000/users');
     return response.data.users_list;     
  }
  catch (error){
     //We're not handling errors. Just logging into the console.
     console.log(error); 
     return false;         
  }
}

async function makePostCall(person){
  try {
     const response = await axios.post('http://localhost:5000/users', person);
     return response;
  }
  catch (error) {
     console.log(error);
     return false;
  }
}

}  

export default MyApp;