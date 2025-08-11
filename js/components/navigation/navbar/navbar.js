import {onScreenResize, getIsMobile} from '../../../utils/screen-utils.js'

export function initNav(){
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

        toggle.addEventListener('click', (e) => {
            if(!isMobile){
                toggle.style.marginBottom = "0px";
                menu.style.maxHeight = "300px";
                menu.style.minHeight = "150px";
                menuContainer.style.paddingTop = "0px";
            };
            if(isMobile){
                document.querySelectorAll(".dropdown.open").forEach((openMenu) => {
                    if(openMenu !== menu){
                        openMenu.classList.remove("open");
                        openMenu.style.maxHeight = "0px";
                        openMenu.style.minHeight = "0px";

                        const otherArrow = openMenu
                            .closest(".expandable-nav-item")
                            ?.querySelector("span");
                        if(otherArrow){
                            otherArrow.style.transform = 'rotate(0deg) translateY(4px)';
                        };
                        const otherToggle = openMenu.closest(".expandable-nav-item");
                        if(otherToggle){
                            otherToggle.style.marginBottom = "0px";
                        };
                    };
                });
            };

            menu.classList.toggle("open");
            const isOpen = menu.classList.contains("open");
            if (isMobile) {
                toggle.style.marginBottom = isOpen ? "325px" : "0px";
                menu.style.maxHeight = isOpen ? "100%" : "0px";
                menu.style.minHeight = isOpen ? "300px" : "0px";
                menuContainer.style.paddingTop = isOpen ? "350px" : "1em";
            };

            arrow.style.transform = isOpen
                ? "rotate(180deg) translateY(-5px)"
                : "rotate(0deg) translateY(4px)";
        });
    };
    setupDropdown('.gallery-li.expandable-nav-item', '.gallery-list.dropdown', '.gallery-dropdown-arrow');
    setupDropdown('.events-li.expandable-nav-item', '.events-list.dropdown', '.events-dropdown-arrow');

    onScreenResize((mobile) => {
        if(mobile !== isMobile){
            resetDropdownStyles();
            isMobile = mobile;
        }
    });
};