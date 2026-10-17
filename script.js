document.addEventListener("DOMContentLoaded", function () {

    const html = document.documentElement;

    const languageBtn = document.getElementById("languageBtn");
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    // =========================================================
    // LANGUAGE SWITCHER
    // =========================================================

    const savedLanguage =
        localStorage.getItem("christineLanguage") || "en";

    function applyLanguage(lang) {

        html.lang = lang;
        html.dir = lang === "ar" ? "rtl" : "ltr";

        // Translate normal elements
        document
            .querySelectorAll("[data-en][data-ar]")
            .forEach(function (element) {

                const value =
                    lang === "ar"
                        ? element.dataset.ar
                        : element.dataset.en;

                if (value !== undefined) {
                    element.textContent = value;
                }
            });

        // Translate placeholders
        document
            .querySelectorAll(
                "[data-en-placeholder][data-ar-placeholder]"
            )
            .forEach(function (element) {

                element.placeholder =
                    lang === "ar"
                        ? element.dataset.arPlaceholder
                        : element.dataset.enPlaceholder;
            });

        // Language button
        if (languageBtn) {
            languageBtn.textContent =
                lang === "en"
                    ? "العربية"
                    : "English";
        }

        // Save language
        localStorage.setItem(
            "christineLanguage",
            lang
        );
    }

    // Apply saved language
    applyLanguage(savedLanguage);


    // Change language
    if (languageBtn) {

        languageBtn.addEventListener("click", function () {

            const newLanguage =
                html.lang === "en"
                    ? "ar"
                    : "en";

            applyLanguage(newLanguage);
        });
    }


    // =========================================================
    // MOBILE MENU
    // =========================================================

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", function () {

            mobileMenu.classList.toggle("active");

            const isOpen =
                mobileMenu.classList.contains("active");

            menuBtn.innerHTML = isOpen
                ? '<i class="fas fa-xmark"></i>'
                : '<i class="fas fa-bars"></i>';

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });


        // Close menu after clicking a link
        mobileMenu
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener("click", function () {

                    mobileMenu.classList.remove("active");

                    menuBtn.innerHTML =
                        '<i class="fas fa-bars"></i>';

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                });
            });
    }


    // =========================================================
    // SCROLL REVEAL
    // =========================================================

    const revealElements =
        document.querySelectorAll(
            ".service-card, " +
            ".expertise-card, " +
            ".process-card, " +
            ".service-large, " +
            ".benefit, " +
            ".credential-card, " +
            ".about-image, " +
            ".about-main-image, " +
            ".hero-content, " +
            ".hero-image, " +
            ".section-heading, " +
            ".credentials-header, " +
            ".testimonial-placeholder, " +
            ".resource-card, " +
            ".faq-item, " +
            ".services-hero, " +
            ".services-cta"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(function (element) {

            element.classList.add("reveal");

            observer.observe(element);
        });

    } else {

        // Fallback for older browsers
        revealElements.forEach(function (element) {

            element.classList.add("visible");
        });
    }


    // =========================================================
    // CERTIFICATE LIGHTBOX
    // =========================================================

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");


    // Open certificate
    document
        .querySelectorAll(".certificate-image")
        .forEach(function (box) {

            box.addEventListener("click", function () {

                const image =
                    box.querySelector("img");

                if (
                    !image ||
                    !lightbox ||
                    !lightboxImage
                ) {
                    return;
                }


                // Set certificate image
                lightboxImage.src =
                    image.src;

                lightboxImage.alt =
                    image.alt || "Certificate";


                // Show lightbox
                lightbox.classList.add("active");

                lightbox.setAttribute(
                    "aria-hidden",
                    "false"
                );


                // Prevent page scrolling
                document.body.style.overflow =
                    "hidden";
            });
        });


    // Close using X button
    if (lightboxClose && lightbox) {

        lightboxClose.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                closeLightbox();
            }
        );
    }


    // Close when clicking outside certificate
    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === lightbox
                ) {
                    closeLightbox();
                }
            }
        );
    }


    // Close with Escape key
    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                lightbox &&
                lightbox.classList.contains("active")
            ) {
                closeLightbox();
            }
        }
    );


    // Lightbox close function
    function closeLightbox() {

        if (!lightbox) {
            return;
        }

        lightbox.classList.remove("active");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        if (lightboxImage) {
            lightboxImage.src = "";
            lightboxImage.alt = "Certificate";
        }


        // Restore page scrolling
        document.body.style.overflow = "";
    }


    // =========================================================
    // FAQ ACCORDION
    // =========================================================

    document
        .querySelectorAll(".faq-question")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const faqItem =
                        button.closest(".faq-item");

                    if (!faqItem) {
                        return;
                    }


                    // Close other FAQ items
                    document
                        .querySelectorAll(".faq-item")
                        .forEach(function (item) {

                            if (item !== faqItem) {

                                item.classList.remove(
                                    "active"
                                );
                            }
                        });


                    // Toggle current FAQ
                    faqItem.classList.toggle(
                        "active"
                    );
                }
            );
        });


    // =========================================================
    // CONTACT FORM
    // =========================================================

    const form =
        document.getElementById("contactForm");


    if (form) {

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const status =
                    document.getElementById(
                        "formStatus"
                    );


                if (status) {

                    status.textContent =
                        html.lang === "ar"
                            ? "شكراً لتواصلك. تم استلام رسالتك بشكل تجريبي. اربطي النموذج بخدمة بريد أو Formspree قبل إطلاق الموقع."
                            : "Thank you for reaching out. Your message has been received in demo mode. Connect this form to an email service before launch.";

                    status.classList.add(
                        "show"
                    );
                }


                form.reset();
            }
        );
    }


    // =========================================================
    // INITIAL ARIA STATE
    // =========================================================

    if (menuBtn && mobileMenu) {

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    if (lightbox) {

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );
    }

});