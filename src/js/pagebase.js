
document.addEventListener("DOMContentLoaded", async () => {
    
    const galleryContainers = document.querySelectorAll(".cards-container[data-gallery]");
    if (galleryContainers.length === 0) return; // No gallery on this page

    const { initGallery } = await import("/src/js/components/image-gallery/gallery.js");
    const { initLightbox } = await import("/src/js/components/image-gallery/lightbox.js");

    galleryContainers.forEach((container) => {
        const folderKey = container.getAttribute("data-gallery");
        if (!folderKey) return;

        const selector = `.cards-container[data-gallery="${folderKey}"]`;

        initGallery({
            containerSelector: selector,
            folderKey,
        });

        initLightbox(selector);
    });
});
