import { onScreenResize, getIsMobile } from '/src/js/utils/screen-utils.js';
import './css/image-gallery.css';
const importImages = import.meta.glob("/src/assets/gallery/**/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp}", { eager: true });

let isMobile = getIsMobile();

function groupImages(){
    const map = {};

    Object.entries(importImages).forEach(([path, module]) => {
        const parts = path.split("/");
        const galleryIndex = parts.lastIndexOf("gallery");
        const folder = galleryIndex !== -1 ? parts[galleryIndex + 1] : "root";

        const rawFileName = parts[parts.length - 1];
        const fileName = rawFileName.replace(/\.[^/.]+$/, "")
            .replace(/\d+/g, "").replace(/[-_]+/g, " ")
            .replace(/\b\w/g, c => c.toUpperCase()).trim();

        if (!map[folder]) map[folder] = [];
        map[folder].push({url: module.default, label: fileName});
    });
    return map;
};

export function initGallery({ container, folderKey } = {}){
    if (!container || !folderKey) return;

    const folders = groupImages();
    let images = [];

    if(folderKey === "all"){
        images = Object.values(folders).flat();
        images = images.sort(() => Math.random() - 0.5);
    } else {
        images = folders[folderKey] || [];
    };

    if (!images || images.length === 0) {return;};

    let currentIndex = 0;
    const BATCH = 12;

    const loadMoreBtn = document.createElement("button");
    loadMoreBtn.textContent = "להצגת תמונות נוספות";
    loadMoreBtn.className = "load-more-btn";
    loadMoreBtn.style.display = "none";
    loadMoreBtn.setAttribute("aria-label", "טען עוד תמונות לגלריה");
    container.after(loadMoreBtn);

    function createCard(image, number){
        const card = document.createElement("div");
        card.className = "cards-box";

        const imgBox = document.createElement("div");
        imgBox.className = "cards-img-box";

        const img = document.createElement("img");
        img.src = image?.url;
        img.alt = `${image?.label} אולמי אלגרו אירועים בירושלים, חתונות, חינה, בר/בת מצווה`;
        img.loading = "lazy";
        imgBox.appendChild(img);

        const p = document.createElement("p");
        p.textContent = image?.label || `${image?.label}`;

        card.append(imgBox, p);
        return card;
    };

    function loadChunk(){
        if (currentIndex >= images.length) return;
        const next = currentIndex + BATCH;
        const slice = images.slice(currentIndex, next);

        slice.forEach((image, i) => {
            const card = createCard(image, currentIndex + i + 1);
            card.classList.add("img-block", "frozen");
            container.appendChild(card);
        });
        currentIndex = next;

        if(images.length > 24 && currentIndex >= 24 && currentIndex < images.length){
            loadMoreBtn.style.display = "block";
        } else {
            loadMoreBtn.style.display = "none";
        };

        if(currentIndex >= 24){
            window.removeEventListener("scroll", handleScroll);
        }

        const event = new CustomEvent("gallery-updated", {
            detail: { container },
        });
        document.dispatchEvent(event);
    };

    if (images.length > 12) window.addEventListener("scroll", handleScroll);
    loadMoreBtn.addEventListener("click", loadChunk);
    loadChunk();

    function handleScroll(){
        const offset = getIsMobile() ? 1500 : 1000;
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight - offset){
            loadChunk();
        }
    };
};
