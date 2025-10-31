const importImages = import.meta.glob("/src/assets/gallery/**/*.{jpg,jpeg,png,webp}", { eager: true });

function groupImages(){
    const map = {};

    Object.entries(importImages).forEach(([path, module]) => {
        const parts = path.split("/");
        const folder = parts[parts.length - 2] || "root";

        if (!map[folder]) map[folder] = [];
        map[folder].push(module.default);
    });
    return map;
};

export function initGallery({ containerSelector, folderKey } = {}){
    if (!containerSelector || !folderKey) return;

    const folders = groupImages();
    const images = folders[folderKey];
    if (!images || images.length === 0) {
        return;
    };

    const container = document.querySelector(containerSelector);
    if (!container) return;

    let currentIndex = 0;
    const BATCH = 12;

    function createCard(url, number) {
        const card = document.createElement("div");
        card.className = "cards-box js-card";

        const imgBox = document.createElement("div");
        imgBox.className = "cards-img-box";

        const img = document.createElement("img");
        img.src = url;
        img.alt = `Gallery Image ${number}`;
        img.loading = "lazy";

        imgBox.appendChild(img);

        const p = document.createElement("p");
        p.textContent = `Photo ${number}`;

        card.append(imgBox, p);
        return card;
    }

    function loadChunk(){
        if (currentIndex >= images.length) return;
        const next = currentIndex + BATCH;
        const slice = images.slice(currentIndex, next);

        slice.forEach((url, i) => {
            const card = createCard(url, currentIndex + i + 1);
            container.appendChild(card);
        });
        currentIndex = next;

        const event = new CustomEvent("gallery-updated", {
            detail: { containerSelector },
        });
        document.dispatchEvent(event);

        if (currentIndex >= images.length) {
            window.removeEventListener("scroll", handleScroll);
        };
    };

    function handleScroll(){
        const nearBottom = window.scrollY + window.innerHeight >= document.body.offsetHeight - 600;
        if (nearBottom) loadChunk();
    };

    loadChunk();
    window.addEventListener("scroll", handleScroll);
};
