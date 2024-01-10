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
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        const card = document.createElement('div');
        card.classList.add('card');
        card.tabIndex = 0; // Make the card focusable

        // Set background color based on JSON data
        card.style.backgroundColor = link.color || getRandomColor();

        // Try to load local image
        tryLoadImage(card, link);

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

        cardContainer.appendChild(card);

        // Add website name to the card container
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('card-name'); // Add a class for styling
        nameDiv.textContent = link.name;
        cardContainer.appendChild(nameDiv);

        appContainer.appendChild(cardContainer);
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


function tryLoadImage(card, link) {
    const img = new Image();
    img.src = `../assets/img/${link.image}`;

    img.onload = function () {
        // Image loaded successfully, append it to the card
        card.appendChild(img);
    };

    img.onerror = function () {
        // Add website name if no image or loading image fails
        const websiteInitial = link.name.charAt(0).toUpperCase();
        card.innerHTML = `<div class="website-initial">${websiteInitial}</div>`;
        console.error(`Error loading image: ${link.image}`);
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
    let currentCardContainer = document.activeElement.parentElement;
    if (!currentCardContainer || !currentCardContainer.classList.contains('card-container')) {
        // If there is no active element or the active element is not a card container,
        // set the first card container as the current card container
        currentCardContainer = document.querySelector('.card-container');
        if (currentCardContainer) {
            currentCardContainer.querySelector('.card').focus();
        }
    } else if (currentCardContainer.classList.contains('card-container')) {
        let newCard;
        const cardContainers = Array.from(document.querySelectorAll('.card-container'));
        const currentIndex = cardContainers.indexOf(currentCardContainer);

        // Determine the number of cards in a row dynamically
        let n = 1;
        while (n < cardContainers.length && cardContainers[n].offsetTop === cardContainers[0].offsetTop) {
            n++;
        }

        if (event.key === 'ArrowRight' || event.keyCode === 39) {
            newCard = currentCardContainer.nextElementSibling;
        } else if (event.key === 'ArrowLeft' || event.keyCode === 37) {
            newCard = currentCardContainer.previousElementSibling;
        } else if (event.key === 'ArrowDown' || event.keyCode === 40) {
            newCard = cardContainers[currentIndex + n];
        } else if (event.key === 'ArrowUp' || event.keyCode === 38) {
            newCard = cardContainers[currentIndex - n];
        }

        if (newCard && newCard.classList.contains('card-container')) {
            newCard.querySelector('.card').focus();
        }
    }
});

// Update clock every second
setInterval(updateCurrentTime, 1000);

// Initial clock update
updateCurrentTime();