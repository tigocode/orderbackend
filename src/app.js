require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(routes);



app.listen(process.env.PORT || 3000, () => console.log('O servidor está funcionando!'));
