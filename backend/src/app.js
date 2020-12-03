const express = require('express');
const cors = require('cors');

const app = express();

const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

const port = 3333;

app.listen(port, () => console.log(`\nServer running at http://localhost:${port}\n`));