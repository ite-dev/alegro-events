

let isMobile = window.innerWidth <= 980;
const listeners = [];

function debounce(func, waitTime){
    let timeout;
    return function(...args){
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, waitTime);
    };
};

function notifyListeners() {
    isMobile = window.innerWidth <= 980;
    listeners.forEach((callback) => callback(isMobile));
};

const debouncedNotify = debounce(notifyListeners, 100);
window.addEventListener('resize', debouncedNotify);
notifyListeners();

export function onScreenResize(callback){
    listeners.push(callback);
    callback(isMobile);
};

export function getIsMobile(){
    return isMobile;
};
