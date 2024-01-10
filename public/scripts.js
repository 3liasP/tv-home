document.addEventListener('DOMContentLoaded', function () {
    // Fetch and load links from the external JSON file
    fetch('../assets/json/links.json')
        .then(response => response.json())
        .then(data => createCards(data))
        .catch(error => console.error('Error fetching links:', error));
});

function createCards(links) {
    const appContainer = document.getElementById('app-container');

    links.forEach(link => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.tabIndex = 0; // Make the card focusable

        // Set background color based on JSON data
        card.style.backgroundColor = link.color || getRandomColor();

        // Try to load local image
        tryLoadImage(card, link.image);

        // Add website name if no image or loading image fails
        if (!card.querySelector('img')) {
            const websiteInitial = link.name.charAt(0).toUpperCase();
            card.innerHTML = `<div class="website-initial">${websiteInitial}</div>`;
        }

        // Add website name as a tooltip
        card.title = link.name;

        // Open the link in a new tab when the card is clicked
        card.addEventListener('click', function () {
            window.open(link.url, '_blank');
        });

        // Open the link in a new tab when the Enter key is pressed
        card.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.keyCode === 13) {
                window.open(link.url, '_blank');
            }
        });

        // Set focus on the card when it is hovered over
        card.addEventListener('mouseover', function () {
            card.focus();
        });

        appContainer.appendChild(card);
    });

    // Set the first card to be active
    const firstCard = appContainer.querySelector('.card');
    if (firstCard) {
        firstCard.focus();
    }
}

function getRandomColor() {
    // Generate a random color in hex format
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}


function tryLoadImage(card, imageUrl) {
    const img = new Image();
    img.src = imageUrl;

    img.onload = function () {
        // Image loaded successfully, append it to the card
        card.appendChild(img);
    };

    img.onerror = function () {
        // Image failed to load, handle the error
        console.error(`Error loading image: ${imageUrl}`);
    };
}

function updateCurrentTime() {
    const currentTimeElement = document.getElementById('current-time');
    const now = new Date();

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };

    const dateStr = now.toLocaleDateString(undefined, dateOptions);
    const timeStr = now.toLocaleTimeString(undefined, timeOptions);

    currentTimeElement.textContent = `It's ${dateStr} at ${timeStr}`;
}

window.addEventListener('keydown', function (event) {
    const currentCard = document.activeElement;
    if (currentCard.classList.contains('card')) {
        let newCard;
        if (event.key === 'ArrowRight' || event.keyCode === 39) {
            newCard = currentCard.nextElementSibling;
        } else if (event.key === 'ArrowLeft' || event.keyCode === 37) {
            newCard = currentCard.previousElementSibling;
        }

        if (newCard && newCard.classList.contains('card')) {
            newCard.focus();
        }
    }
});

// Update clock every second
setInterval(updateCurrentTime, 1000);

// Initial clock update
updateCurrentTime();