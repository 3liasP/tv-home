require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const jsonFileName = process.env.JSON_FILE || 'links.json';

app.use(express.static(path.join(__dirname, 'public')));

// Only send selected environment variables to the client
app.get('/env', (req, res) => {
    const env = {
        JSON_FILE: process.env.JSON_FILE,
        USE_FAVICONS: process.env.USE_FAVICONS
    };
    res.json(env);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Using JSON file: ${jsonFileName}`);
    console.log(`Using favicons: ${process.env.USE_FAVICONS}`);
});
