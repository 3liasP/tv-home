export const navigate = (window) => {
    window.addEventListener('keydown', keyNavigation);
}

const keyNavigation = (event) => {
    if (event.key.startsWith('Arrow')) { // Add this conditional statement
        let currentCardContainer = document.activeElement.parentElement;
        if (!currentCardContainer || !currentCardContainer.classList.contains('card-container')) {
            // If there is no active element or the active element is not a card container,
            // set the first card container as the current card container
            currentCardContainer = document.querySelector('.card-container');
            if (currentCardContainer) {
                currentCardContainer.querySelector('.card').focus();
            }
        } else if (currentCardContainer.classList.contains('card-container')) {
            let newCard, currentCategory, nextCategory, prevCategory;
            switch (event.key) {
                case 'ArrowRight':
                    newCard = currentCardContainer.nextElementSibling;
                    break;
                case 'ArrowLeft':
                    newCard = currentCardContainer.previousElementSibling;
                    break;
                case 'ArrowDown':
                    currentCategory = currentCardContainer.parentElement.parentElement;
                    nextCategory = currentCategory.nextElementSibling;
                    newCard = nextCategory ? nextCategory.querySelector('.card-container') : null;
                    break;
                case 'ArrowUp':
                    currentCategory = currentCardContainer.parentElement.parentElement;
                    prevCategory = currentCategory.previousElementSibling;
                    newCard = prevCategory ? prevCategory.querySelector('.card-container') : null;
                    break;
                default:
                    break;
            }
            if (newCard && newCard.classList.contains('card-container')) {
                const card = newCard.querySelector('.card');
                card.focus();
                currentCardContainer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: (event.key === 'ArrowLeft' || event.keyCode === 37) ? 'end' : 'start'
                });
            }
        }
    }
}
