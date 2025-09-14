

export function initCarousel(){
    const slider = document.querySelector('.slider');
    const items = document.querySelectorAll('.slider .item');
    const quantity = parseInt(getComputedStyle(slider).getPropertyValue('--quantity'));
    const anglePerItem = 360 / quantity;

    let currentPosition = 1;
    let isLocked = false;
    let lockedRotation = 0;
    let autoRotateInterval = null;
    let inactivityTimer = null;
    const inactivityDelay = 5000;
    const verticalTilt = -12;

    function updateRotation(position){
        const rotateY = -((position - 1) * anglePerItem);
        slider.style.animation = 'none';
        slider.style.transform = `perspective(1000px) rotateX(${verticalTilt}deg) rotateY(${rotateY}deg)`;

        items.forEach((item, index) => {
            if (index + 1 === position) {
                item.classList.add('centered');
            } else {
                item.classList.remove('centered');
            }
        });
    };

    function rotateToItem(position){
        if (position === currentPosition) {
            if (isLocked) {
                resumeAutoRotate();
            } else {
                lockRotation(position);
            };
        } else {
            rotateShortestPath(position);
        };
        resetInactivityTimer();
    };

    function lockRotation(position){
        currentPosition = position;
        updateRotation(position);
        isLocked = true;
        lockedRotation = -((position - 1) * anglePerItem);
    };

    function rotateLeft(){
        currentPosition = (currentPosition - 2 + quantity) % quantity + 1;
        lockRotation(currentPosition);
        resetInactivityTimer();
    };

    function rotateRight(){
        currentPosition = (currentPosition % quantity) + 1;
        lockRotation(currentPosition);
        resetInactivityTimer();
    };

    function rotateShortestPath(targetPosition){
        let diff = targetPosition - currentPosition;
        if (diff > quantity / 2) {
            diff -= quantity;
        } else if (diff < -quantity / 2) {
            diff += quantity;
        };

        if (diff > 0) {
            currentPosition = targetPosition;
        } else {
            currentPosition = targetPosition;
        };
        lockRotation(currentPosition);
    };

    function resetInactivityTimer(){
        clearTimeout(inactivityTimer);
        clearInterval(autoRotateInterval);

        inactivityTimer = setTimeout(() => {
            resumeAutoRotate();
        }, inactivityDelay);
    };

    function resumeAutoRotate(){
        isLocked = false;
        slider.style.animation = 'autoRun 40s linear infinite';
        slider.style.transform = '';
        slider.dataset._startTime = performance.now();

        items.forEach(item => item.classList.remove('centered'));
        clearTimeout(inactivityTimer);
        clearInterval(autoRotateInterval);
        inactivityTimer = setTimeout(resumeAutoRotate, inactivityDelay);
    };

    document.querySelector('.arrow.left').addEventListener('click', (e) => {
        e.preventDefault();
        rotateLeft();
    });

    document.querySelector('.arrow.right').addEventListener('click', (e) => {
        e.preventDefault();
        rotateRight();
    });

    items.forEach(item => {
        item.addEventListener('click', () => {
            const position = parseInt(getComputedStyle(item).getPropertyValue('--position'));
            rotateToItem(position);
        });
    });

    slider.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
        slider.style.animationPlayState = 'paused';
    });

    slider.addEventListener('mouseleave', () => {
        if (!isLocked) {
            slider.style.animationPlayState = 'running';
        }
        resetInactivityTimer();
    });

    // Init
    isLocked = false;
    autoRotateInterval = setInterval(() => {
        rotateRight();
    }, 5000);
};
