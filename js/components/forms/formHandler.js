
export function initForm(){
    const submitBtn = document.querySelector("#contactForm button[type=submit");


    document.querySelector("#contactForm").addEventListener("submit", async (e) => {
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

        try {
            submitBtn.disabled = true;
            const res = await fetch("http://localhost:8000/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, message, website }),
            });

            const data = await res.json();
            if(res.ok){
                statusMessage("Message Sent!", "success");
                e.target.reset();
            } else {
                statusMessage("Message failed to send, please try again..", "error");
            };
        } catch (err) {
            console.error(err);
            statusMessage("Something went wrong, please try again..", "error");
        } finally {
            setTimeout(() => submitBtn.disabled = false, 5000)
        };
    });
};

function sanitizeInput(value){
    return value.replace(/[<>]/g, "").replace(/\s+/g, " ");
};

function statusMessage(msg, type = "info"){
    const formContainer = document.querySelector(".form-container");
    const status = document.createElement("p");
    const currentStatus = document.querySelector(".status");

    if(currentStatus){ currentStatus.remove(); };

    status.textContent = msg; 
    status.className = type === "error" ? "status error" : "status success"; 
    formContainer.appendChild(status);
};