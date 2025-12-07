
if (window.trustedTypes) {
    window.alegroPolicy = window.trustedTypes.createPolicy('alegroApp', {
        createHTML: (input) => input,
        createScript: (input) => input
    });

    window.toastifyPolicy = window.trustedTypes.createPolicy('toastifyPolicy', {
        createHTML: (input) => input,
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    const toastUtils = await import('./utils/toastify/toast.js');

    const { initNav } = await import('./components/navigation/navbar/navbar.js');
    initNav();

    const fontLink = document.getElementById('font-stylesheet');
    if (fontLink) {
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Assistant:wght@200..800&display=swap';
        fontLink.onload = () => {
            fontLink.media = 'all';
        };
    };

    if (document.querySelector('#contactForm')) {
        const { initForm } = await import('./components/forms/formHandler.js');
        initForm();
    };

    const map = document.querySelector("iframe[data-src]");
    if (!map) {

    } else {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                map.src = map.dataset.src;
                observer.disconnect();
            }
        });
        observer.observe(map);
    };

    if (document.querySelector('#contactForm')) {
        toastUtils.infoMsg("ברוכים הבאים לאלגרו !");
    };

    if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
        const homeDefaultBtn = document.querySelector('#homepageDefault');
        homeDefaultBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.scrollRestoration = "manual";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };
    
    handleScroll();
});

window.addEventListener('load', () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?57d05705979a0228f4469947f4a';
    script.defer = true;
    const container = document.querySelector('.reviews-container');
    if (container) container.appendChild(script);
});

const blocks = document.querySelectorAll('.block');
const blockReverse = document.querySelectorAll('.block-reverse');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting){

            entry.target.classList.add('frozen');
            observer.unobserve(entry.target);
        };
    });
});
blocks.forEach(block => observer.observe(block));
blockReverse.forEach(block => observer.observe(block));

function handleScroll(){
    const scrollButton = document.querySelector('.btn-up');
    if (!scrollButton) return;

    const scrollPosition = window.scrollY;
    if(scrollPosition >= 200){
        scrollButton.style.bottom = '50px';
        scrollButton.style.opacity = 1;
    } else {
        scrollButton.style.bottom = '-100px';
        scrollButton.style.opacity = 0;
    };
};
document.addEventListener('scroll', handleScroll, { passive: true });

const faqContainer = document.getElementById("faq-container");
if(faqContainer){
    faqContainer.addEventListener("click", (e) => {
        const question = e.target.closest("[data-faq-question]");
        if (!question) return;

        const item = question.parentElement;
        const allItems = document.querySelectorAll(".faq-item");

        allItems.forEach(i => {
            if (i !== item) i.classList.remove("open");
        });
        item.classList.toggle("open");
    });
};
