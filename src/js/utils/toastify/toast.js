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
    // Create a container div for the toast content
    const node = document.createElement("div");

    // Create a span inside the node for the message
    const span = document.createElement("span");
    span.style.color = "#E7D8BA";

    if (window.alegroPolicy && window.trustedTypes) {
        // Use Trusted Types to safely set HTML if needed
        span.innerHTML = window.alegroPolicy.createHTML(msg);
    } else {
        span.textContent = msg;
    }

    node.appendChild(span);

    // Pass the DOM node to Toastify
    const toast = Toastify({
        ...defaultOptions,
        node,
        duration,
        className,
        stopOnFocus: true,
    });

    toast.showToast();
    return toast;
}

export const successMsg = (msg) => createToast(msg, "success-toast", 10000);
export const errorMsg = (msg) => createToast(msg, "error-toast", 5000);
export const infoMsg = (msg) => createToast(msg, "info-toast", 2500);
export const loadingMsg = (msg) => createToast(`⏳ ${msg}`, "loading-toast", -1);
