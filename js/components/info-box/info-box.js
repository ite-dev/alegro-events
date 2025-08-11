import { onScreenResize, getIsMobile } from '../../utils/screen-utils.js';

export function initInfoBox() {
    const pairs = document.querySelectorAll('.info-box-pair');
    const grid = document.querySelector('.about-content-wrapper');
    let isMobile = getIsMobile();
    let activePair = null;

    function applyResponsiveStyles() {
        pairs.forEach(p => {
            const isExpanded = p.classList.contains('expanded');
            const shrinkEm = isExpanded;
            if (activePair && !shrinkEm) {
                p.style.height = isMobile ? "175px" : '250px';
                p.style.background = 'rgba(154, 126, 76)';
                p.style.gap = '10px';
                grid.style.gridAutoRows = isMobile ? 'minmax(0, 175px)' : 'minmax(0,250px)';
            } else {
                p.style.height = isMobile ? "200px" : "400px";
                p.style.background = 'rgba(154, 126, 76, 1)';
                p.style.gap = '8px';
                grid.style.gridAutoRows = isMobile ? 'minmax(0, 200px)' : 'unset';
            }
        });
    };

    onScreenResize((mobile) => {
        isMobile = mobile;
        applyResponsiveStyles();
    });

    function handlePairExpanded(pairs) {
        pairs.forEach((pair, index) => {
            pair.addEventListener('click', () => {
                const isExpanded = pair.classList.contains('expanded');
                pairs.forEach(p => p.classList.remove('expanded'));

                if (!isExpanded) {
                    pair.classList.add('expanded');
                    activePair = pair;

                    grid.style.background = 'transparent';
                    grid.style.boxShadow = 'unset';

                    const previousPair = pair.previousElementSibling;
                    const isLast = index === pairs.length - 1;

                    if (isLast) {
                        const topOffset = pair.getBoundingClientRect().top + window.scrollY - 250;
                        window.scrollTo({ top: topOffset, behavior: 'smooth' });
                    } else {
                        if (previousPair?.classList.contains('info-box-pair')) {
                            previousPair.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                            const topOffset = pair.getBoundingClientRect().top + window.scrollY - 300;
                            window.scrollTo({ top: topOffset, behavior: 'smooth' });
                        };
                    };
                } else {
                    activePair = null;
                    grid.style.background = 'rgba(154, 126, 76, 1)';
                    grid.style.boxShadow = '0px 0px 20px 1px rgba(255, 255, 255, 0.174)';
                };

                applyResponsiveStyles();
            });
        });
    };
    handlePairExpanded(pairs);
};
