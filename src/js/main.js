import {initNav} from './components/navigation/navbar/navbar.js';
import { initGallery } from './components/image-gallery/gallery.js';
import { initForm } from './components/forms/formHandler.js';
import { infoMsg } from './utils/toastify/toast.js';

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initForm();
    infoMsg("ברוכים הבאים לאלגרו !");
/*     initInfoBox(); */
});

// Typing Text Animation // 
/* document.addEventListener("DOMContentLoaded", function () {
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
}); */
// Typing Text Animation // 

// Scroll Position: scroll-up btn display  //
function handleScroll(){
    const scrollButton = document.querySelector('.btn-up');
    const scrollPosition = window.visualViewport ? window.visualViewport.pageTop : window.scrollY;

    if (scrollPosition >= 200) {
        scrollButton.style.bottom = '50px';
        scrollButton.style.opacity = 1;
    }
    else {
        scrollButton.style.bottom = '-100px';
        scrollButton.style.opacity = 0;
    }
};

document.addEventListener('scroll', handleScroll, {passive:true});
document.addEventListener('DOMContentLoaded', handleScroll);
// Scroll Position: scroll-up btn display,  //