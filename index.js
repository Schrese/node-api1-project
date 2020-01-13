// implement your API here
const express = require('express');

const server = express();

server.use(express.json());

//GET users (find())

//GET users by id (findById())

//POST new user (insert())

//PUT existing user by id (update())

//Delete user by id (remove())


const port = 8000;
server.listen(port, () => console.log('\n ** api on port : ${port} \n'))