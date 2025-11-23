import Toastify from "toastify-js";
import "./css/toast.css";

const defaultOptions = {
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    close: true,
};

/**
 * Create a Trusted Types / CSP-compliant toast
 * @param {string} msg - Message to display
 * @param {string} className - CSS class for styling
 * @param {number} duration - Duration of the toast in ms (-1 for persistent)
 * @returns {object} toast instance
 */
function createToast(msg, className = "", duration = defaultOptions.duration) {
    let node = document.createElement("div");

    if (window.alegroPolicy) {
        node.textContent = window.alegroPolicy.createHTML(msg);
    } else {
        node.textContent = msg;
    };

    node.style.color = "#E7D8BA";
    const toast = Toastify({
        ...defaultOptions,
        node,
        duration,
        className,
        stopOnFocus: true,
    });

    toast.showToast();
    return toast;
};

export const successMsg = (msg) => createToast(msg, "success-toast", 10000);
export const errorMsg = (msg) => createToast(msg, "error-toast", 5000);
export const infoMsg = (msg) => createToast(msg, "info-toast", 24500);
export const loadingMsg = (msg) => createToast(`⏳ ${msg}`, "loading-toast", -1);
