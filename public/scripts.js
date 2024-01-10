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
        card.innerHTML = `
            <img src="${link.image}" alt="${link.name}">
            <div>${link.name}</div>
        `;

        // Open the link in a new tab when the card is clicked
        card.addEventListener('click', function () {
            window.open(link.url, '_blank');
        });

        appContainer.appendChild(card);
    });
}
