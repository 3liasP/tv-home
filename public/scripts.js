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

        appContainer.appendChild(card);
    });
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