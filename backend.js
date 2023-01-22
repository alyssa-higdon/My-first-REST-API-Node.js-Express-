const express = require('express');
const app = express();
const port = 5000;

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


app.use(express.json());


app.get('/', (req, res) => {
    res.send(users);
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        
        let resule1 = findUserByJob(job);
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

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user){
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    deleteUser(id);;
    res.status(200).end();
})

function deleteUser(id){
    const user_index = users['users_list'].findIndex( (user) => user['id'] === id);
    if (user_index > -1)
        users['users_list'].splice(user_index, 1);
    }


const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}


app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});



app.get('/users/:name/:job', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined){
        let result = findUserByName(name);
        console.log(result);
        let finalResult = findUserByJob(result, job);
        console.log(finalResult);

        finalResult = {users_list: finalResult};
        res.send(finalResult);
    }
    else{
        res.send(users);
    }
});

const findUserByJob = (list, job) => { 
    return list.filter( (user) => user['job'] === job); 
}