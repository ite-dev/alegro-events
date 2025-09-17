

export function initGallery(imageFiles){
    const cardsBasePath = window.location.pathname.includes('alegro-events')
        ? '/alegro-events/public/gallery/venue-arrangements/'
        : '/public/gallery/venue-arrangements/';

    const imageFilenames = imageFiles || [
        'dishes-1.jpg',
        'dishes-2.jpg',
        'dishes-3.jpg',
        'dishes-4.jpg',
        'dishes-5.jpg',
        'dishes-6.jpg',
    ];

    const cardsContainer = document.querySelector('.cards-container');
    imageFilenames.forEach((filename, index) => {
        const card = document.createElement('div');
        card.className = 'cards-box js-card';
        card.onclick = () => true;

        card.innerHTML = `
        <div class="cards-img-box">
            <img src="${cardsBasePath}${filename}" alt="Event Image ${index + 1}">
        </div>
        <p>
        Enjoy our unique dishes by Chef Aaron Shasha.
        </p>
    `;
        cardsContainer.appendChild(card);
    });
};