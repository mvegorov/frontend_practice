document.addEventListener('DOMContentLoaded', function () {
    const reviewsContainer = document.getElementById('reviews-container');
    const preloader = document.getElementById('preloader');

    preloader.style.display = 'flex';

    const randomFilter = Math.random() > 0.5 ? 'id_gte=100' : 'id_lte=200';

    fetch(`https://jsonplaceholder.typicode.com/comments?${randomFilter}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Сеть недоступна');
            }
            return response.json();
        })
        .then((comments) => {
            preloader.style.display = 'none';

            // Ограничим количество отзывов до 6
            const reviews = comments.slice(0, 6);

            reviews.forEach((comment) => {
                const reviewCard = document.createElement('div');
                reviewCard.classList.add('review-card');

                const name = document.createElement('h3');
                name.textContent = comment.name;

                const reviewText = document.createElement('p');
                reviewText.textContent = `"${comment.body}"`;

                reviewCard.appendChild(name);
                reviewCard.appendChild(reviewText);

                reviewsContainer.appendChild(reviewCard);
            });
        })
        .catch((error) => {
            preloader.style.display = 'none';

            const errorMessage = document.createElement('p');
            errorMessage.textContent = '⚠ Что-то пошло не так';
            errorMessage.style.color = 'red';
            reviewsContainer.appendChild(errorMessage);

            console.error('Ошибка при загрузке отзывов:', error);
        });
});