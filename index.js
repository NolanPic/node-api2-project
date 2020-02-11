const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h1>Node API 2</h1>');
});

const port = 5000;
server.listen(port, () => console.log(`\nServer listening on port ${port}\n`));