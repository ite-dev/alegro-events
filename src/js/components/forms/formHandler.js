const API_URL = import.meta.env.VITE_API_URL;
import './css/contact-form.css';
import 'toastify-js/src/toastify.css';
import '../../utils/toastify/css/toast.css';
import { errorMsg, loadingMsg, successMsg } from '../../utils/toastify/toast';

export function initForm(){
    addInputValidation();
    updateHTMLPatterns();
    const submitBtn = document.querySelector("#contactForm button[type=submit]");

    document.querySelector("#contactForm")
        .addEventListener("submit", async (e) => {
            const form = e.target;
            if(!form.checkValidity()){
                form.reportValidity();
                return;
            };
            e.preventDefault();

            const name = sanitizeInput(document.querySelector("#name")
                    .value.trim());
            const email = sanitizeInput(document.querySelector("#email")
                    .value.trim());
            const phone = sanitizeInput(document.querySelector("#phone")
                    .value.trim());
            const message = sanitizeInput(document.querySelector("#message")
                    .value.trim());
            const website = sanitizeInput(document.querySelector("#website").value.trim());

            if(website){
                console.warn("SPAM DETECTED!");
                errorMsg("Spam Detected!!!", "error");
                return;
            };

            const data = {name: name, email: email, phone: phone, message: message};
            const isValidInfo = inputValidation(data);
            if(!isValidInfo){
                return;
            };

            submitBtn.disabled = true;
            const toast = loadingMsg("פנייתכם נשלחת ברגעים אלה - אנא המתינו לאישור.")
            try {
                const res = await fetchWithTimeout(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, phone, message, website}),
                });

                const data = await res.json();
                if(res.ok){
                    toast.hideToast();
                    formSubmitted();
                    successMsg("פנייתכם נשלחה בהצלחה - ניצור עמכם קשר בהקדם :)");
                    e.target.reset();
                } else {
                    toast.hideToast();
                    errorMsg("שליחת הפנייה נכשלה, אנא נסו שנית.");
                };
            } catch (err) {
                console.error(err);
                toast.hideToast();
                if(err.message === 'Request timed out'){
                    errorMsg(".הבקשה נמשכה זמן רב מדי, אנא נסו שנית");
                } else if (!navigator.onLine){
                    errorMsg("No internet connection - אנא ודאו שאתם מחוברים לאינטרנט :)");
                } else {
                    errorMsg("אירעה תקלה בשליחת ההודעה, אנא נסו שנית.");
                };
            } finally {
                setTimeout(() => submitBtn.disabled = false, 5000);
            };
    });
};

function formSubmitted(){
    const hideForm = document.querySelector("#contactForm");
    hideForm.remove();
    const container = document.querySelector(".form-container");
    const p = document.createElement("p");
    p.innerText = "פנייתכם נשלחה בהצלחה, ניצור עימכם קשר בהקדם :)";

    container.appendChild(p);
}

function sanitizeInput(value){
    return value.replace(/[<>]/g, "").replace(/\s+/g, " ");
};

async function fetchWithTimeout(url, options, timeout = 120000){
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try{
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timer);
        return response;
    } catch (err) {
        clearTimeout(timer);
        if (err.name === 'AbortError'){
            throw new Error('Request timed out');
        };
        throw err;
    };
};

const VALIDATION_RULES = {
    email: {
        regex: /^[A-Za-z0-9._%+-]{2,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        htmlPattern: '[A-Za-z0-9._%+\\-]{2,}@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,}',
        message: 'Invalid email format'
    },
    name: {
        regex: /^([A-Za-z\u0590-\u05FF]+[-']?[A-Za-z\u0590-\u05FF]+)(\s+[A-Za-z\u0590-\u05FF]+[-']?[A-Za-z\u0590-\u05FF]+)?(\s+[A-Za-z\u0590-\u05FF]+[-']?[A-Za-z\u0590-\u05FF]+)?(\s+[A-Za-z\u0590-\u05FF]+[-']?[A-Za-z\u0590-\u05FF]+)?$/,
        htmlPattern: '.{2,100}',
        message: 'Name must be 1-4 words, letters and hyphens/apostrophes allowed'
    },
    phone: {
        regex: /^[0-9]{9,15}$/,
        htmlPattern: '[0-9]{9,15}',
        message: 'Phone must be 9-15 digits'
    },
    message: {
        regex: /^[A-Za-z0-9\u0590-\u05FF !\.,\-=@#:;\+]{0,500}$/,
        htmlPattern: '.{0,500}',
        message: 'Message up to 500 characters, letters and punctuation only'
    }
};

function addInputValidation(){
    const inputs = {
        email: document.getElementById('email'),
        name: document.getElementById('name'),
        phone: document.getElementById('phone'),
        message: document.getElementById('message')
    };

    Object.keys(inputs).forEach(key => {
        inputs[key].addEventListener('input', function (e) {
            const isValid = VALIDATION_RULES[key].regex.test(e.target.value);
            e.target.setCustomValidity(
                isValid ? '' : VALIDATION_RULES[key].message
            );
        });
    });
};

function inputValidation(data){
    for(const [key, rule] of Object.entries(VALIDATION_RULES)){
        if(!rule.regex.test(data[key])){
            return errorMsg(rule.message, "error");
        };
    };
    return true;
};

function updateHTMLPatterns(){
    const inputs = ['email', 'name', 'phone', 'message'];
    inputs.forEach(key => {
        const input = document.getElementById(key);
        if(input && VALIDATION_RULES[key].htmlPattern){
            input.setAttribute('pattern', VALIDATION_RULES[key].htmlPattern);
        };
    });
};