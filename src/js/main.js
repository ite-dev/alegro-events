if(window.trustedTypes){
    window.alegroPolicy = window.trustedTypes.createPolicy('alegroApp', {
        createHTML: (input) => input,
        createScript: (input) => input
    });

    window.toastifyPolicy = window.trustedTypes.createPolicy('toastifyPolicy', {
        createHTML: (input) => input,
    });
};

window.requestIdleCallback = window.requestIdleCallback || function (cb) {
    return setTimeout(cb, 200);
};

document.addEventListener('DOMContentLoaded', () => {
    initCore();
    initUI();
    initObservers();
    initConditionalFeatures();
});

function initCore(){
    initNav();
    handleScroll();
    document.addEventListener('scroll', handleScroll, { passive: true });
};

async function initConditionalFeatures(){
    if(document.querySelector('#contactForm')){
        const { initForm } = await import('./components/forms/formHandler.js');
        initForm();
    };

    if(isHomePage()){
        requestIdleCallback(async () => {
            const { infoMsg } = await import('./utils/toastify/toast.js');
            infoMsg("ברוכים הבאים לאלגרו !");
        });
    };
};

function initObservers(){
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

    const blocks = document.querySelectorAll('.block, .block-reverse');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('frozen');
                obs.unobserve(entry.target);
            };
        });
    });
    blocks.forEach(el => observer.observe(el));
};

function initUI(){
    initScrollTop();
    initFAQ();
};

function initScrollTop(){
    if (!isHomePage()) return;

    const btn = document.querySelector('#homepageDefault');
    btn?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

function initFAQ() {
    const faqContainer = document.getElementById("faq-container");
    if (!faqContainer) return;

    const items = faqContainer.querySelectorAll(".faq-item");
    items[0]?.classList.add("open");

    faqContainer.addEventListener("click", (e) => {
        const question = e.target.closest("[data-faq-question]");
        if (!question) return;

        const item = question.parentElement;

        items.forEach(i => i !== item && i.classList.remove("open"));
        item.classList.toggle("open");
    });
};

function isHomePage(){
    return window.location.pathname === "/" || window.location.pathname === "/index.html";
};

function handleScroll(){
    const btn = document.querySelector('.btn-up');
    if (!btn) return;
    btn.classList.toggle('show-btn', window.scrollY >= 200);
};

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.trustindex.io/loader.js?57d05705979a0228f4469947f4a';
        script.defer = true;

        const container = document.querySelector('.reviews-container');
        container?.appendChild(script);

        const instaFeed = document.createElement('script');
        instaFeed.src = 'https://cdn.trustindex.io/loader-feed.js?63526185946e88162136db9c518';
        instaFeed.defer = true;

        const feedContainer = document.querySelector('.instagram-feed');
        feedContainer?.appendChild(instaFeed);
    }, 500);
});

import { onScreenResize, getIsMobile } from '/src/js/utils/screen-utils.js';
function initNav() {
    let isMobile = getIsMobile();

    function resetDropdownStyles() {
        document.querySelectorAll(".dropdown").forEach(menu => {
            menu.classList.remove("open");
            menu.style.maxHeight = "";
            menu.style.minHeight = "";

            const toggle = menu.closest(".expandable-nav-item");
            if (toggle) {
                toggle.style.marginBottom = "";
                const arrow = toggle.querySelector("span");
                if (arrow) arrow.style.transform = "";
            }
        });
        const menuContainer = document.querySelector(".checkbox-container ul");
        if (menuContainer) menuContainer.style.paddingTop = "";
    };

    function setupDropdown(toggleSelector, menuSelector, arrowSelector) {
        const toggle = document.querySelector(toggleSelector);
        const menu = document.querySelector(menuSelector);
        const menuContainer = document.querySelector(".checkbox-container ul");
        const arrow = document.querySelector(arrowSelector);
        if (!toggle || !menu || !arrow) return;
        if (!toggle) console.warn("Toggle not found:", toggleSelector);
        if (!menu) console.warn("Menu not found:", menuSelector);
        if (!arrow) console.warn("Arrow not found:", arrowSelector);

        toggle.addEventListener('click', (e) => {
            if (!isMobile) {
                toggle.style.marginBottom = "0px";
                menu.style.maxHeight = "333px";
                menu.style.minHeight = "150px";
                menuContainer.style.paddingTop = "0px";
                arrow.style.color = "black";

            };
            if (isMobile) {
                document.querySelectorAll(".dropdown.open").forEach((openMenu) => {
                    if (openMenu !== menu) {
                        openMenu.classList.remove("open");
                        openMenu.style.maxHeight = "0px";
                        openMenu.style.minHeight = "0px";

                        const otherArrow = openMenu
                            .closest(".expandable-nav-item")
                            ?.querySelector("span");
                        if (otherArrow) {
                            otherArrow.style.transform = 'rotate(0deg) translateY(4px)';
                        };
                        const otherToggle = openMenu.closest(".expandable-nav-item");
                        if (otherToggle) {
                            otherToggle.style.marginBottom = "0px";
                        };
                    };
                });
            };

            menu.classList.toggle("open");
            const isOpen = menu.classList.contains("open");
            if (isMobile) {
                toggle.style.marginBottom = isOpen ? "343px" : "0px";
                menu.style.maxHeight = isOpen ? "100%" : "0px";
                menu.style.minHeight = isOpen ? "333px" : "0px";
                menuContainer.style.paddingTop = isOpen ? "220px" : "1em";
            };

            arrow.style.transform = isOpen
                ? "rotate(180deg) translateY(-5px)"
                : "rotate(0deg) translateY(4px)";
        });
    };
    setupDropdown('.gallery-li.expandable-nav-item', '.gallery-list.dropdown', '.gallery-dropdown-arrow');
    setupDropdown('.events-li.expandable-nav-item', '.events-list.dropdown', '.events-dropdown-arrow');

    onScreenResize((mobile) => {
        if (mobile !== isMobile) {
            resetDropdownStyles();
            isMobile = mobile;
        }
    });

    const glass = document.querySelector(".nav-bar");
    window.addEventListener("scroll", () => {
        const progress = Math.min(window.scrollY / 300, 1);
        glass.style.setProperty("--p", progress);
    });
};