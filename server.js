require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const jsonFileName = process.env.JSON_FILE || 'links.json';

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Using JSON file: ${jsonFileName}`);
});
