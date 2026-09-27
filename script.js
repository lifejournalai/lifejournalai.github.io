document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            // Logo / brand: return to the top and replay the hero animation.
            if (link.classList.contains("brand")) {
                const hero = document.querySelector(".hero.page-load");

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                if (hero) {
                    hero.classList.remove("page-load");

                    // Force a reflow so the same animation can start again.
                    void hero.offsetWidth;

                    hero.classList.add("page-load");
                }

                return;
            }

            // Keep the finalized Download positioning.
            if (targetId === "#download") {
                const heading = target.querySelector(".download-heading");
                const elementToPosition = heading || target;
                const elementRect = elementToPosition.getBoundingClientRect();
                const absoluteTop = window.scrollY + elementRect.top;
                const desiredTop = 105;

                window.scrollTo({
                    top: Math.max(0, absoluteTop - desiredTop),
                    behavior: "smooth"
                });

                return;
            }

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    // FAQ accordion.
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) {
            return;
        }

        question.addEventListener("click", () => {
            const isOpen = item.classList.contains("active");

            faqItems.forEach((otherItem) => {
                otherItem.classList.remove("active");

                const otherAnswer = otherItem.querySelector(".faq-answer");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            });

            if (!isOpen) {
                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
