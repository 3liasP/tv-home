import { createCards } from './cards.js';
import { updateCurrentTime } from './helpers.js';
import { navigate } from './navigation.js';

document.addEventListener('DOMContentLoaded', function () {
    // Fetch and load links from the external JSON file
    fetch('../assets/json/links.json')
        .then(response => response.json())
        .then(data => createCards(data))
        .catch(error => console.error('Error fetching links:', error));
});

navigate(window);

// Update clock every second
setInterval(updateCurrentTime, 1000);

// Initial clock update
updateCurrentTime();

