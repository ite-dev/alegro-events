import { initGallery } from "/src/js/components/image-gallery/gallery.js";
import { initLightbox } from "/src/js/components/image-gallery/lightbox.js";
import { initNav } from "./components/navigation/navbar/navbar.js";
import { initForm } from "./components/forms/formHandler.js";

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initForm();
});

function initBaseGallery(){
    const containerElements = document.querySelectorAll(".cards-container[data-gallery]");
    containerElements.forEach((container) => {
        const folderKey = container.getAttribute("data-gallery");
        if (!folderKey) return;

        const containerSelector = `.cards-container[data-gallery="${folderKey}"]`;

        initGallery({
            containerSelector,
            folderKey,
        });

        initLightbox(containerSelector);
    });
};
document.addEventListener("DOMContentLoaded", initBaseGallery);
