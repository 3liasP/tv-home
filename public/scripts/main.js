import { createCards } from './cards.js';
import { updateCurrentTime } from './helpers.js';
import { navigate } from './navigation.js';

document.addEventListener('DOMContentLoaded', function () {
    fetch('/env')
        .then(response => response.json())
        .then(env => {
            fetch(`../assets/json/${env.JSON_FILE}`)
            .then(response => response.json())
            .then(data => createCards(data, env.USE_FAVICONS))
            .catch(error => console.error('Error fetching links:', error));
        });
});

navigate(window);

// Update clock every second
setInterval(updateCurrentTime, 1000);

// Initial clock update
updateCurrentTime();

