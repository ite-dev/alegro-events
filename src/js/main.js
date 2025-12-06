
if(window.trustedTypes){
    window.alegroPolicy = window.trustedTypes.createPolicy('alegroApp', {
        createHTML: (input) => input,
        createScript: (input) => input
    });

    window.toastifyPolicy = window.trustedTypes.createPolicy('toastifyPolicy', {
        createHTML: (input) => input,
    });
};


function deferInit(){
    try{
        import('./utils/toastify/toast.js').then((toastUtils) => {

            import('./components/navigation/navbar/navbar.js')
                .then(({ initNav }) => initNav());

            const fontStylesheet = document.getElementById('font-stylesheet');
            if(fontStylesheet && !fontStylesheet.href.includes('fonts.googleapis')){
                fontStylesheet.href = "https://fonts.googleapis.com/css2?family=Assistant:wght@200..800&display=swap";
            };

            if(document.querySelector('#contactForm')){
                import('./components/forms/formHandler.js')
                    .then(({ initForm }) => initForm());
            };

            const map = document.querySelector("iframe[data-src]");
            if(map){
                const observer = new IntersectionObserver(([entry]) => {
                    if(entry.isIntersecting){
                        map.src = map.dataset.src;
                        observer.disconnect();
                    };
                });
                observer.observe(map);
            };

            if(document.querySelector('#contactForm')){
                toastUtils.infoMsg("ברוכים הבאים לאלגרו !");
            };
        });

        if(window.location.pathname === "/" || window.location.pathname === "/index.html"){
            const homeDefaultBtn = document.querySelector('#homepageDefault');
            homeDefaultBtn?.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.scrollRestoration = "manual";
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        };
    } catch (err) {
        console.error("deferInit() error:", err);
    };
};

if('requestIdleCallback' in window){
    requestIdleCallback(deferInit, { timeout: 2000 });
} else {
    window.addEventListener('load', deferInit, { once: true });
    setTimeout(deferInit, 2000);
};

window.addEventListener('load', () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?57d05705979a0228f4469947f4a';
    script.defer = true;
    const container = document.querySelector('.reviews-container');
    if (container) container.appendChild(script);
});

/*
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.animated-typing');
    const words = [
        "אולמי אלגרו ירושלים".split('').reverse().join(''),
        "Weddings.",
        "Events.",
        "Bar / Bat  Mitzvah.",
        "Henna  Ceremony.",
        "Catering.",
        "Brit Mila",
        "עליה לתורה".split('').reverse().join('')
    ];

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
*/

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
