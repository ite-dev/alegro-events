import Toastify from 'toastify-js';
import './css/toast.css';

const defaultOptions = {
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    close: true,
};

export const successMsg = (msg) => {
    Toastify({
        ...defaultOptions,
        duration: 10000,
        text: `${msg}`,
        className: "success-toast",
    }).showToast();
};

export const errorMsg = (msg) => {
    Toastify({
        ...defaultOptions,
        text: `${msg}`,
        duration: 5000,
        className: "error-toast",
    }).showToast();
};

export const infoMsg = (msg) => {
    Toastify({
        ...defaultOptions,
        text: `${msg}`,
        duration: 2500, 
        className: "info-toast",
    }).showToast();
};

export const loadingMsg = (msg) => {
    const toast = Toastify({
        ...defaultOptions,
        text: `⏳ ${msg}`,
        duration: -1, 
        close: false,
        className: "loading-toast"
    }).showToast();

    return toast; 
};