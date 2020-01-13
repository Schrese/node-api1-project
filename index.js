// implement your API here
const express = require('express');

const Users = require('./data/db.js')

const server = express();

server.use(express.json());

//GET users (find())
server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log('error getting all users', error)
            res.status(500).json({errorMessage: 'The users information could not be retrieved.'})
        })
})

//GET users by id (findById())
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Users.findById(id)
        .then(user => {
            if (user === undefined) {
                res.status(404).json({message: 'The user with the specified ID does not exist.'})
            } else {
                res.status(200).json({user})
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'The user information could not be retrieved.'})
        })
})

//POST new user (insert())

//PUT existing user by id (update())

//Delete user by id (remove())


const port = 8000;
server.listen(port, () => console.log('\n ** api on port : ${port} \n'))