export const getRandomColor = () => {
    // Generate a random color in hex format
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export const tryLoadImage = (card, link) => {
    const img = new Image();
    img.src = `../assets/img/${link.image}`;

    img.onload = function () {
        // Image loaded successfully, append it to the card
        card.appendChild(img);
    };

    img.onerror = function () {
        // Image failed to load, add the website initial instead
        addInitial(card, link);
    };
}

export const addInitial = (card, link) => {
    const websiteInitial = link.name.charAt(0).toUpperCase();
    card.innerHTML = `<div class="website-initial">${websiteInitial}</div>`;
}

export const updateCurrentTime = () => {
    const currentTimeElement = document.getElementById('current-time');
    const now = new Date();

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };

    const dateStr = now.toLocaleDateString(undefined, dateOptions);
    const timeStr = now.toLocaleTimeString(undefined, timeOptions);

    currentTimeElement.textContent = `It's ${dateStr} at ${timeStr}`;
}