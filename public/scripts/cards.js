import { addInitial, getRandomColor, tryLoadImage } from './helpers.js';

export const createCards = (categories) => {
    const appContainer = document.getElementById('app-container');

    Object.entries(categories).forEach(([categoryName, links]) => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
        appContainer.appendChild(categoryContainer);

        // Create a title for the category
        const categoryTitle = document.createElement('div');
        categoryTitle.classList.add('category-title');
        categoryTitle.textContent = categoryName;
        categoryContainer.appendChild(categoryTitle);
        // Create a new row for the category
        const categoryRow = document.createElement('div');
        categoryRow.classList.add('category-row');
        categoryContainer.appendChild(categoryRow);


        links.forEach(link => {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card-container');

            const card = document.createElement('div');
            card.classList.add('card');
            card.tabIndex = 0; // Make the card focusable

            // Set background color based on JSON data
            card.style.backgroundColor = link.color || getRandomColor();

            // Try to load local image
            if (link.image) {
                tryLoadImage(card, link);
            } else {
                // Add website initial instead
                addInitial(card, link);
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

            cardContainer.appendChild(card);

            // Add website name to the card container
            const nameDiv = document.createElement('div');
            nameDiv.classList.add('card-name'); // Add a class for styling
            nameDiv.textContent = link.name;
            cardContainer.appendChild(nameDiv);

            categoryRow.appendChild(cardContainer);
        });

        appContainer.appendChild(categoryContainer);
    });

    // Set the first card to be active
    const firstCard = appContainer.querySelector('.card');
    if (firstCard) {
        firstCard.focus();
    }
}