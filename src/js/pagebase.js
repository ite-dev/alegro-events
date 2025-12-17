
document.addEventListener("DOMContentLoaded", async () => {
    const galleryContainers = document.querySelectorAll(".cards-container[data-gallery]");
    if (galleryContainers.length === 0) return;

    const { initGallery } = await import("/src/js/components/image-gallery/gallery.js");
    const { initLightbox } = await import("/src/js/components/image-gallery/lightbox.js");

    galleryContainers.forEach((container) => {
        const folderKey = container.dataset.gallery;
        if (!folderKey) return;

        initGallery({
            container,
            folderKey,
        });
        initLightbox(container);
    });
});