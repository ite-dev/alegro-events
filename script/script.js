const stickyTitle = document.querySelector('.sticky-title');
const allProjectsBtn = document.querySelector('#AP');
const beBtn = document.querySelector('#BE');
const rpBtn = document.querySelector('#RP');
const jsBtn = document.querySelector('#JSP');
const lpBtn = document.querySelector('#LPP');
const pyBtn = document.querySelector('#PYP');

let allCards = document.querySelectorAll('.cards-box');
let backendCards = document.querySelectorAll('.be-card');
let reactCards = document.querySelectorAll('.rp-card');
let jsCards = document.querySelectorAll('.js-card');
let lpCards = document.querySelectorAll('.lp-card');
let pythonCards = document.querySelectorAll('.py-card');

let cardTypes = {
    backend: backendCards,
    react: reactCards,
    js: jsCards,
    landing: lpCards,
    python: pythonCards,
    all: allCards
};

const projectsTop = document.querySelector('.projects-section');

function filterDisplay(type) {
    if (type !== "all") {
        Object.values(cardTypes).forEach((cards) => {
            cards.forEach((card) => {
                card.style.display = "none";
            });
        });
    };

    if (cardTypes[type]) {
        cardTypes[type].forEach((card) => {
            card.style.display = "flex";
        });
    }
    projectsTop.scrollIntoView({ behavior: "smooth" });
};

beBtn.addEventListener('click', () => {
    filterDisplay("backend");
});
rpBtn.addEventListener('click', () => {
    filterDisplay("react");
});
jsBtn.addEventListener('click', () => {
    filterDisplay("js");
});


// Mobile Scroll Animation // 
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.cards-box');
    const projectsSection = document.querySelector('.projects-section');
    const offset = 100;

    function onScroll() {
        const sectionTop = projectsSection.getBoundingClientRect().top;
        const sectionBottom = projectsSection.getBoundingClientRect().bottom;

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            if (cardTop < window.innerHeight - offset && cardBottom > 400) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
});

// Typing Text Animation // 
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.animated-typing');
    const words = ["אולמי אלגרו ירושלים".split('').reverse().join(''),"Weddings.", "Events.", "Bar / Bat  Mitzvah.", "Henna  Ceremony.", "Catering.", "Brit Mila", "עליה לתורה".split('').reverse().join('')];

    let currentWordIndex = 0;
    const animateText = (textToAnimate) => {
        container.innerHTML = '';

        for (let i = 0; i < textToAnimate.length; i++) {
            const letter = textToAnimate[i];
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.animationDelay = `${i * 0.1}s`;
            container.appendChild(span);
        }
    };

    const startAnimation = () => {
        const word = words[currentWordIndex];

        animateText(word);
        currentWordIndex = (currentWordIndex + 1) % words.length;
        setTimeout(() => {
            startAnimation();
        }, word.length * 100 + 2000);
    };
    startAnimation();
});
// Typing Text Animation // 

// Home Background Image Rotation // 
const homeSection = document.querySelector('.home-section');
const basePath = window.location.pathname.includes('alegro-events')
    ? '/alegro-events/public/gallery/tempbgs/'
    : 'public/gallery/tempbgs/';
const images = [
    'table-bg.jpg',
    'table-bg2.jpg',
    'dishes-5.jpg',
];

let currentHomePic = 0;
setInterval(() => {
    currentHomePic = (currentHomePic + 1) % images.length;
    homeSection.style.backgroundImage = `url('${basePath}${images[currentHomePic]}')`;
}, 4000); 
// Home Background Image Rotation // 


// Load Gallery Images // 
const cardsBasePath = window.location.pathname.includes('alegro-events')
    ? '/alegro-events/public/gallery/tempbgs/'
    : '/public/gallery/tempbgs/';

const imageFilenames = [
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
// Load Gallery Images // 

// Scroll Snap About // 
let wrapper = document.querySelector('.about-content-wrapper');

wrapper.addEventListener('wheel', (e) => {
    e.preventDefault();
    wrapper.scrollBy({
        top: e.deltaY > 0 ? wrapper.clientHeight : -wrapper.clientHeight,
        behavior: 'smooth',
    });
}, { passive: false });
// Scroll Snap About // 


// Temp Controllers //
const hideBtn = document.querySelector('.hide-btn');
hideBtn.style = "color: cyan";

hideBtn.addEventListener('click', () => {
    const homeP = document.querySelector('.home-paragraph');

    if(hideBtn.innerHTML === "Hide Text"){
        homeP.style = "color: transparent; background: transparent;";
        hideBtn.innerHTML = "Show";
        hideBtn.style = "color: white; background: transparent;"
    }
    else{
        homeP.style = "color: white; background: rgb(0,0,0,.5);";
        hideBtn.innerHTML = "Hide Text";
        hideBtn.style = "color: white; background: transparent;"
    }
});

const hideTypingBtn = document.querySelector('.hide-typing-btn');
hideTypingBtn.addEventListener('click', () => {
    const typingTextContainer = document.querySelector('.animated-typing');

    if(hideTypingBtn.innerHTML === "Hide"){
        typingTextContainer.style = "display: none !important;";
        hideTypingBtn.innerHTML = "show";
        hideTypingBtn.style = "background: none; color: white; opacity: .5;"
    } else{
        typingTextContainer.style = "display: unset !important";
        hideTypingBtn.innerHTML = "Hide"
        hideTypingBtn.style = "background: transparent; color: black; opacity: 1;"
    };
});
// Temp Controllers //

// Scroll Position: scroll-up btn display,  //
document.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.btn-up');
    const scrollPosition = window.scrollY;

    if (scrollPosition >= 100) {
        scrollButton.style.bottom = '50px';
        scrollButton.style.opacity = 1;
    }
    else if (scrollPosition < 100 || scrollPosition > 200) {
        scrollButton.style.bottom = '-100px';
        scrollButton.style.opacity = 0;
    }
});
// Scroll Position: scroll-up btn display,  //


// Image Carousel //
function createCarousel(containerSelector, imageFilenames) {
    const container = document.querySelector(containerSelector);
    const carousel = container.querySelector('.carousel');
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');

    imageFilenames.forEach((filename, index) => {
        const galleryPic = document.createElement('div');
        galleryPic.className = 'carousel-item';
        galleryPic.innerHTML = `<img src="${basePath}${filename}" alt="Image ${index + 1}">`;
        carousel.appendChild(galleryPic);
    });

    const galleryPics = carousel.querySelectorAll('.carousel-item');
    let index = 1;
    const totalPics = galleryPics.length;

    function triggerFlipAnimation(pic) {
        pic.classList.add('is-flipping');
        
        setTimeout(() => {
            pic.classList.remove('is-flipping');
        }, 1000);
    }

    function updateCarousel() {
        galleryPics.forEach(pic => {
            pic.className = 'carousel-item';
            pic.style.display = "none";
            pic.style.opacity = 0.4;

            pic.style.border = '4px solid black';
        });

        const centerIndex = ((index % totalPics) + totalPics) % totalPics;
        const leftIndex = (centerIndex - 1 + totalPics) % totalPics;
        const rightIndex = (centerIndex + 1) % totalPics;

        const centerPic = galleryPics[centerIndex];
        const leftPic = galleryPics[leftIndex];
        const rightPic = galleryPics[rightIndex];

        // Apply flipping animation
        triggerFlipAnimation(rightPic);
        triggerFlipAnimation(centerPic);
        triggerFlipAnimation(leftPic);


        while (carousel.firstChild) {
            carousel.removeChild(carousel.firstChild);
        }
        carousel.appendChild(leftPic);
        carousel.appendChild(centerPic);
        carousel.appendChild(rightPic);

        leftPic.classList.add('active', 'left');
        centerPic.classList.add('active', 'center');
        rightPic.classList.add('active', 'right');
    }

    prevBtn.addEventListener('click', () => {
        index--;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        index++;
        updateCarousel();
    });

    updateCarousel();
}



// Create Carousels //
createCarousel('.carousel-container-1', [
    'dishes-1.jpg',
    'dishes-2.jpg',
    'dishes-3.jpg',
    'dishes-4.jpg',
    'dishes-5.jpg',
    'dishes-6.jpg',
], basePath);
createCarousel('.carousel-container-2', [
    'dishes-6.jpg',
    'champagne.jpg',
    'dishes-7.jpg',
    'dishes-4.jpg',
    'dishes-5.jpg',
    'dishes-2.jpg',
], basePath);
// Image Carousel //

// Gallery Backgound Image Rotation // 
const gallerySection = document.querySelector('.projects-section');

const galleryImages = [
    'gallery-bg8.jpg',
    'gallery-bg10.jpg',
    'gallery-bg12.jpg',
    'gallery-bg13.jpg',
    'gallery-bg14.jpg',
    'gallery-bg19.jpg',
    'gallery-bg21.jpg',
    'gallery-bg22.jpg',
    'gallery-bg23.jpg',
];

let currentPic = 0;
setInterval(() => {
    currentPic = (currentPic + 1) % galleryImages.length;
    gallerySection.style.backgroundImage = `url('${basePath}${galleryImages[currentPic]}')`;
}, 7000);
// Gallery Background Image Rotation // 
