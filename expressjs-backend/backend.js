const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');       // imports CORS library
const MAXUSERS = 10;
app.use(cors());                    // enable All CORS requests

app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => { 
    return users['users_list'].filter( (user) => user['job'] === job); 
} 

const filterUsers = (req_query, field, list) => { 
    return list.filter( (user) => user[field] === req_query); 
} 

function findIndexById(id) {
    return users['users_list'].findIndex( (user) => user['id'] === id);
}

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// returns all users matching id or name or job using querys
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined)
    {
        let result = filterUsers(job, 'job', findUserByName(name)); // or below
        // let result = findUserByName(name).filter( (user) => user['job'] === job);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined)
    {
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else if (job != undefined)
    {
        let result = findUserByJob(job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

function generateRandomId(user)
{
    const min = 0;
    const max = MAXUSERS-1;
    let id = (Math.floor(Math.random() * max) + min).toString();
    return id;     // generates random number ID
}

function addUser(user){
    user.id = generateRandomId(user);
    // user.id = (Math.floor(Math.random * max) + min);
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findIndexById(id);
    // console.log(`delete result: ${result}`);     // debugging results

    if (result === undefined || result == -1)
        res.status(404).send('Resource not found.');
    else {
        deleteUser(result);
        res.status(204).end();
    }
});

function deleteUser(user){
    let deleteCount = 1;
    users['users_list'].splice(user, deleteCount);
}

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }