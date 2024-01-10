export const navigate = (window) => {
    window.addEventListener('keydown', keyNavigation);
    window.addEventListener('wheel', wheelNavigation);
}

const keyNavigation = (event) => {
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
        if (event.key === 'ArrowRight' || event.keyCode === 39) {
            newCard = currentCardContainer.nextElementSibling;
        } else if (event.key === 'ArrowLeft' || event.keyCode === 37) {
            newCard = currentCardContainer.previousElementSibling;
        } else if (event.key === 'ArrowDown' || event.keyCode === 40) {
            // Find the parent category of the current card
            const currentCategory = currentCardContainer.parentElement.parentElement;
            // Find the next category
            const nextCategory = currentCategory.nextElementSibling;
            // Find the first card in the next category
            newCard = nextCategory ? nextCategory.querySelector('.card-container') : null;
        } else if (event.key === 'ArrowUp' || event.keyCode === 38) {
            // Find the parent category of the current card
            const currentCategory = currentCardContainer.parentElement.parentElement;
            // Find the previous category
            const prevCategory = currentCategory.previousElementSibling;
            // Find the first card in the previous category
            newCard = prevCategory ? prevCategory.querySelector('.card-container') : null;
        }

        if (newCard && newCard.classList.contains('card-container')) {
            const card = newCard.querySelector('.card');
            card.focus();
            currentCardContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: (event.key === 'ArrowLeft' || event.keyCode === 37) ? 'end' : 'start'
            });
            console.log(card.title);
        }
    }
}

const wheelNavigation = (event) => {
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
        if (event.deltaY > 0) {
            newCard = currentCardContainer.nextElementSibling;
        } else if (event.deltaY < 0) {
            newCard = currentCardContainer.previousElementSibling;
        }

        if (newCard && newCard.classList.contains('card-container')) {
            const card = newCard.querySelector('.card');
            card.focus();
            currentCardContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: (event.deltaY < 0) ? 'end' : 'start'
            });
            console.log(card.title);
        }
    }
}