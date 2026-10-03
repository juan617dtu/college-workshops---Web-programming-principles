document.addEventListener("DOMContentLoaded", () => {
    //responsive navigation
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    //typed.js
    const typedElement = document.querySelector(".typed");
    const strings = ["Juan Cuéllar.", "a Software Developer.", "a Tester.", "a Designer.", "a Technical Support Engineer."];
    let currentString = 0;
    let characterIndex = 0;

    function type() {
        const text = strings[currentString];
        typedElement.textContent = text.slice(0, characterIndex);
        if (characterIndex < text.length) {
            characterIndex++;
            setTimeout(type, 100);
        }
        else setTimeout(deleteText, 2000);
    }
    function deleteText() {
        const text = strings[currentString];
        typedElement.textContent = text.slice(0, characterIndex);
        if (characterIndex > 0) {
            characterIndex--;
            setTimeout(deleteText, 50);
        }
        else nextString();
    }
    function nextString() {
        currentString = (currentString + 1) % strings.length;
        characterIndex = 0;
        setTimeout(type, 200);
    }
    if (typedElement) type();
});
