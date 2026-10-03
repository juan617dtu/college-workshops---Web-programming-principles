document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector("#contact-form");
    const formStatus = document.querySelector("#form-status");
    const submitButton = contactForm.querySelector("button[type='submit']");
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }
        submitButton.disabled = true;
        formStatus.textContent = "Sending...";
        const formData = new FormData(contactForm);
        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });
            console.log("Status: ", response.status);
            const result = await response.json();
            console.log("Formspree response: ", result);
            if (response.ok) {
                formStatus.textContent = "Thanks! Your message has been sent.";
                contactForm.reset();
            } 
            else {
                submitButton.disabled = false;
                formStatus.textContent = "Something went wrong. Please try again.";
            }
        } 
        catch (error) {
            submitButton.disabled = false;
            formStatus.textContent = "Unable to send your message. Please check your connection and try again.";
        }
    });
});
        