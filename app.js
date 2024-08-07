// base requirements
const express = require('express');
const bodyParse = require('body-parse');
const sequelize = require('.config/SQL/database');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

// creating express application
const app = express();

// serves app requests
app.use(bodyParse.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', userRoutes);

// serves pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views'));
});

// starting sever
sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server is running on port 3001");
    });
}).catch(err => {
    console.log("Unable to connect to the database:", err);
});
