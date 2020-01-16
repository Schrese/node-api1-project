// implement your API here
require('dontenv').config();
const express = require('express');
const cors = require('cors');

const Users = require('./data/db.js')

const server = express();

server.use(express.json());
server.use(cors());

//GET users (find())
server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
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
            console.log('error getting this user', error)
            res.status(500).json({errorMessage: 'The user information could not be retrieved.'})
        })
})

//POST new user (insert())
server.post('/api/users', function(req, res) { 
    const userData = req.body;
    if(!userData.name || !userData.bio) {
        res.status(400).json({errorMessage: 'Please provide name and bio for the user.'})
    } else {
        Users.insert(userData)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            console.log('error creating user', error)
            res.status(500).json({errorMessage: 'The users information could not be retrieved.'})
        })
    }
    
})

//PUT existing user by id (update())
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const upData = req.body;

    if(!upData.name || !upData.bio) {
        res.status(400).json({errorMessage: 'Please provide name and bio for the user.'})
    } else {
        Users.update(id, upData)
            .then(user => {
                if (user) {
                    Users.findById(id)
                        .then(user => {
                            res.status(200).json(user)
                        })
                        .catch(err => {
                            console.log('error getting this user', err)
                            res.status(500).json({errorMessage: 'Could not find that user'})
                        })
                } else {
                    res.status(404).json({errorMessage: 'The user with the specified ID does not exist.'})
                }
            })
            .catch(err => {
                console.log('error in editing the user')
                res.status(500).json({errorMessage: 'The user information could not be modified.'})
            })
    }
    
})

//Delete user by id (remove())
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    Users.findById(id)
        .then(user => {
            if (user === undefined) {
                res.status(404).json({message: 'The user with the specified ID does not exist.'})
            } else {
                Users.remove(id)
                    .then(deleted => {
                        res.status(200).json({message: 'User successfully deleted!'})
                    })
                    .catch(err => {
                        console.log('error deleting this user')
                        res.status(500).json({errorMessage: 'The user could not be removed.'})
                    })
            }
        })
        .catch(err => {
            console.log('error getting this user', error)
            res.status(500).json({errorMessage: 'The user information could not be retrieved.'})
        })
    })


const port = process.env.PORT;
server.listen(port, () => console.log(`\n ** api on port : ${port} \n`))