
if (window.trustedTypes) {
    window.alegroPolicy = window.trustedTypes.createPolicy('alegroApp', {
        createHTML: (input) => input,
        createScript: (input) => input
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    const toastUtils = await import('./utils/toastify/toast.js');

    if (document.querySelector('#contactForm')) {
        toastUtils.infoMsg("ברוכים הבאים לאלגרו !");
    }


    const { initNav } = await import('./components/navigation/navbar/navbar.js');
    initNav();

    const fontLink = document.getElementById('font-stylesheet');
    if (fontLink) {
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Assistant:wght@200..800&display=swap';
        fontLink.onload = () => {
            fontLink.media = 'all';
        };
    };

    if (document.querySelector('#contactForm')){
        const { initForm } = await import('./components/forms/formHandler.js');
        initForm();
    };

    const map = document.querySelector("iframe[data-src]");
    if (!map) return;
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            map.src = map.dataset.src;
            observer.disconnect();
        }
    });
    observer.observe(map);

    handleScroll();
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
    const scrollPosition = window.scrollY;

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
// Scroll Position: scroll-up btn display,  //

// FAQ Section // 
document.getElementById("faq-container").addEventListener("click", (e) => {
    const question = e.target.closest("[data-faq-question]");
    if (!question) return;

    const item = question.parentElement;
    const allItems = document.querySelectorAll(".faq-item");

    allItems.forEach(i => {
        if (i !== item) i.classList.remove("open");
    });
    item.classList.toggle("open");
});