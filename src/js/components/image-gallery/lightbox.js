

export function initLightbox(containerSelector = ".cards-container"){
    const container = document.querySelector(containerSelector);
    if (!container) return;

    let lightbox, lightboxImg, currentIndex = 0;

    const createLightbox = () => {
        if (lightbox) return;

        lightbox = document.createElement("div");
        lightbox.className = "lightbox";
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-img" src="" alt="">
            <div class="lightbox-nav">
                <span class="lightbox-prev">&#10095;</span>
                <span class="lightbox-next">&#10094;</span>
            </div>
        `;

        document.body.appendChild(lightbox);
        lightboxImg = lightbox.querySelector(".lightbox-img");

        lightbox.querySelector(".lightbox-close").onclick = closeLightbox;
        lightbox.querySelector(".lightbox-prev").onclick = prevImage;
        lightbox.querySelector(".lightbox-next").onclick = nextImage;

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener("keydown", (e) => {
            if (!lightbox || !lightbox.classList.contains("open")) return;

            switch (e.code) {
                case "Escape":
                    closeLightbox();
                    break;
                case "ArrowLeft":
                    prevImage();
                    break;
                case "ArrowRight":
                case "Space":
                    nextImage();
                    break;
            }
        });

        let touchStartX = 0;
        lightbox.addEventListener("touchstart", (e) => (touchStartX = e.changedTouches[0].screenX));
        lightbox.addEventListener("touchend", (e) => {
            const diff = e.changedTouches[0].screenX - touchStartX;
            if (diff > 50) prevImage();
            else if (diff < -50) nextImage();
        });
    };

    const openLightbox = (i) => {
        const images = [...container.querySelectorAll("img")];
        if (!images.length || i < 0 || i >= images.length) return;
        currentIndex = i;
        lightboxImg.src = images[i].src;
        lightbox.classList.add("open");
        document.body.classList.add("no-scroll");
    };

    const closeLightbox = () => {
        lightbox && lightbox.classList.remove("open");
        document.body.classList.remove("no-scroll");
    };

    const prevImage = () => {
        const images = [...container.querySelectorAll("img")];
        if (!images.length) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
    };

    const nextImage = () => {
        const images = [...container.querySelectorAll("img")];
        if (!images.length) return;
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex].src;
    };

    createLightbox();
    container.addEventListener("click", (e) => {
        if(e.target && e.target.tagName === "IMG"){
            const images = [...container.querySelectorAll("img")];
            const index = images.indexOf(e.target);
            if (index !== -1) openLightbox(index);
        };
    });
};
