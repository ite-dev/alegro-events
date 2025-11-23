import Toastify from "toastify-js";
import "./css/toast.css";

const toastifyPolicy = window.trustedTypes?.createPolicy('toastifyPolicy', {
    createHTML: (input) => input,
});

const defaultOptions = {
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    close: true,
};

function createToast(msg, className = "", duration = defaultOptions.duration) {
    const node = document.createElement("div");
    node.style.color = "#E7D8BA";

    if (toastifyPolicy) {
        node.innerHTML = toastifyPolicy.createHTML(msg);
    } else {
        node.textContent = msg;
    }

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
