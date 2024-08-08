// <REQUIREMENTS> //
// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/SQL/database');
const User = require('./models/User'); // Assumindo que você tem um modelo User
const userRoutes = require('./routes/userRoutes');
const path = require('path');
// <REQUIREMENTS> //

// <CONFIGS> //
// Load environment variables from .env file
dotenv.config();

// Create express application
const app = express();

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware for parsing JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas de usuário
app.use('/user', userRoutes);
// <CONFIGS> //

// <ENDPOINT> //

// User customization
app.post('/user/customize', (req, res) => {
    const { username, backgroundColor, fontColor, linkColor, hoverColor, fontFamily } = req.body;

    // Salvar as customizações no banco de dados
    User.update(
        {
            backgroundColor: backgroundColor,
            fontColor: fontColor,
            linkColor: linkColor,
            hoverColor: hoverColor,
            fontFamily: fontFamily
        },
        { where: { username: username } }
    ).then(() => {
        res.status(200).json({ message: 'Customizations saved successfully!' });
    }).catch(err => {
        console.error('Error saving customizations:', err);
        res.status(500).json({ message: 'Failed to save customizations.' });
    });
});
// <ENDPOINT> //

// <PAGES> //
// Error 500 (internal error)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, 'views', '500.html'));
});

// Error 404 (page not found)
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Home page
app.get('/', (req, res) => {
    res.render('salesPage'); // Usando res.render para EJS
});
// <PAGES> //

// Starting server
sequelize.sync().then(() => {
    app.listen(process.env.PORT || '3001', () => {
        console.log("Server is running on port 3001");
    });
}).catch(err => {
    console.log("Unable to connect to the database:", err);
});
