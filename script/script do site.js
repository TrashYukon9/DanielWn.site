/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initTheme();
    initNavbar();
    initMobileMenu();
    initTypedText();
    initParticles();
    initReveal();
    initScrollEffects();
    initCursorGlow();
    initHeroParallax();
    initTiltEffect();
    initAOS();
    updateFooterYear();

});


/*==================================================
TEMA CLARO E ESCURO
==================================================*/

const THEME_STORAGE_KEY = "portfolio-theme";

function initTheme() {

    const themeButton =
        document.querySelector(".theme-btn") ||
        document.querySelector("#theme-toggle");

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    const prefersLight = window.matchMedia(
        "(prefers-color-scheme: light)"
    ).matches;

    const shouldUseLight =
        savedTheme === "light" ||
        (!savedTheme && prefersLight);

    document.documentElement.classList.toggle(
        "light-mode",
        shouldUseLight
    );

    updateThemeIcon(themeButton, shouldUseLight);

    if (!themeButton) {
        return;
    }

    themeButton.addEventListener("click", () => {

        const isLight = document.documentElement.classList.toggle(
            "light-mode"
        );

        localStorage.setItem(
            THEME_STORAGE_KEY,
            isLight ? "light" : "dark"
        );

        updateThemeIcon(themeButton, isLight);

        initParticles();

    });

}


function updateThemeIcon(button, isLight) {

    if (!button) {
        return;
    }

    const icon = button.querySelector("i");

    if (!icon) {
        return;
    }

    icon.className = isLight
        ? "fa-solid fa-sun"
        : "fa-solid fa-moon";

    button.setAttribute(
        "aria-label",
        isLight
            ? "Ativar modo escuro"
            : "Ativar modo claro"
    );

    button.setAttribute(
        "title",
        isLight
            ? "Ativar modo escuro"
            : "Ativar modo claro"
    );

}


/*==================================================
NAVBAR
==================================================*/

function initNavbar() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) {
        return;
    }

    function updateNavbar() {

        const isScrolled = window.scrollY > 30;

        navbar.classList.toggle(
            "scrolled",
            isScrolled
        );

        navbar.classList.toggle(
            "navbar-scroll",
            isScrolled
        );

    }

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

}


/*==================================================
MENU MOBILE
==================================================*/

function initMobileMenu() {

    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links");

    if (!menuButton || !navigation) {
        return;
    }

    const menuIcon = menuButton.querySelector("i");

    function openMenu() {

        navigation.classList.add("menu-open");
        menuButton.classList.add("active");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add("menu-active");

        if (menuIcon) {
            menuIcon.className = "fa-solid fa-xmark";
        }

    }


    function closeMenu() {

        navigation.classList.remove("menu-open");
        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-active");

        if (menuIcon) {
            menuIcon.className = "fa-solid fa-bars";
        }

    }


    menuButton.addEventListener("click", () => {

        const menuIsOpen =
            navigation.classList.contains("menu-open");

        if (menuIsOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    navigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    document.addEventListener("click", event => {

        const clickedInsideNavbar =
            event.target.closest(".navbar");

        if (!clickedInsideNavbar) {
            closeMenu();
        }

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {
            closeMenu();
        }

    });

}


/*==================================================
TEXTO DIGITADO
==================================================*/

function initTypedText() {

    const typedElement = document.querySelector(".typed-text");

    if (!typedElement) {
        return;
    }

    if (typeof window.Typed === "undefined") {

        typedElement.textContent =
            "Desenvolvedor em formação";

        return;

    }

    new Typed(".typed-text", {

        strings: [
            "Desenvolvedor",
            "Estudante de Ciência da computação",
            "Criador de experiências digitais",
            "Buscando novas oportunidades"
        ],

        typeSpeed: 48,
        backSpeed: 28,
        backDelay: 1700,
        startDelay: 350,
        loop: true,
        smartBackspace: true,
        showCursor: true,
        cursorChar: "|"

    });

}


/*==================================================
PARTÍCULAS
==================================================*/

async function initParticles() {

    const particlesContainer =
        document.querySelector("#particles-js");

    if (
        !particlesContainer ||
        typeof window.tsParticles === "undefined"
    ) {
        return;
    }

    const currentParticles =
        window.tsParticles.domItem?.(0);

    if (currentParticles) {

        try {
            currentParticles.destroy();
        } catch (error) {
            console.warn(
                "Não foi possível reiniciar as partículas.",
                error
            );
        }

    }

    const isLight =
        document.documentElement.classList.contains(
            "light-mode"
        );

    const particleColor =
        isLight ? "#15803d" : "#22c55e";

    const linkOpacity =
        isLight ? 0.12 : 0.16;

    const particleOpacity =
        isLight ? 0.28 : 0.40;

    try {

        await window.tsParticles.load(
            "particles-js",
            {

                fullScreen: {
                    enable: false
                },

                background: {
                    color: {
                        value: "transparent"
                    }
                },

                fpsLimit: 60,

                particles: {

                    number: {

                        value: 48,

                        density: {
                            enable: true,
                            area: 1000
                        }

                    },

                    color: {
                        value: particleColor
                    },

                    shape: {
                        type: "circle"
                    },

                    opacity: {

                        value: {
                            min: 0.08,
                            max: particleOpacity
                        }

                    },

                    size: {

                        value: {
                            min: 1,
                            max: 3
                        }

                    },

                    links: {

                        enable: true,
                        distance: 145,
                        color: particleColor,
                        opacity: linkOpacity,
                        width: 1

                    },

                    move: {

                        enable: true,
                        speed: 0.65,
                        direction: "none",
                        random: true,
                        straight: false,

                        outModes: {
                            default: "out"
                        }

                    }

                },

                interactivity: {

                    detectsOn: "window",

                    events: {

                        onHover: {
                            enable: true,
                            mode: "grab"
                        },

                        onClick: {
                            enable: true,
                            mode: "push"
                        },

                        resize: true

                    },

                    modes: {

                        grab: {

                            distance: 145,

                            links: {
                                opacity: 0.32
                            }

                        },

                        push: {
                            quantity: 2
                        }

                    }

                },

                detectRetina: true

            }
        );

    } catch (error) {

        console.warn(
            "As partículas não puderam ser carregadas.",
            error
        );

    }

}


/*==================================================
ANIMAÇÕES DE ENTRADA
==================================================*/

function initReveal() {

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    if (!revealElements.length) {
        return;
    }

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(element => {
            element.classList.add("active");
        });

        return;

    }

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }

    );

    revealElements.forEach(element => {
        observer.observe(element);
    });

}


/*==================================================
SCROLL, PROGRESSO E VOLTAR AO TOPO
==================================================*/

function initScrollEffects() {

    const progressBar =
        document.querySelector(".progress-bar");

    const scrollTopButton =
        document.querySelector(".scroll-top");

    function updateScrollElements() {

        const documentElement =
            document.documentElement;

        const scrollableHeight =
            documentElement.scrollHeight -
            window.innerHeight;

        const scrollPercentage =
            scrollableHeight > 0
                ? (
                    window.scrollY /
                    scrollableHeight
                ) * 100
                : 0;

        if (progressBar) {

            progressBar.style.width =
                `${Math.min(scrollPercentage, 100)}%`;

        }

        if (scrollTopButton) {

            scrollTopButton.classList.toggle(
                "show",
                window.scrollY > 450
            );

        }

    }

    updateScrollElements();

    window.addEventListener(
        "scroll",
        updateScrollElements,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateScrollElements
    );

    if (scrollTopButton) {

        scrollTopButton.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }

}


/*==================================================
CURSOR GLOW
==================================================*/

function initCursorGlow() {

    const cursorGlow =
        document.querySelector(".cursor-glow");

    const touchDevice =
        window.matchMedia(
            "(hover: none), (pointer: coarse)"
        ).matches;

    if (!cursorGlow || touchDevice) {
        return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        },
        { passive: true }
    );

    function animateGlow() {

        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;

        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;

        requestAnimationFrame(animateGlow);

    }

    animateGlow();


    const interactiveElements =
        document.querySelectorAll(
            "a, button, .project-card, .skill-card, .info-card"
        );

    interactiveElements.forEach(element => {

        element.addEventListener("mouseenter", () => {
            cursorGlow.classList.add("cursor-hover");
        });

        element.addEventListener("mouseleave", () => {
            cursorGlow.classList.remove("cursor-hover");
        });

    });

}


/*==================================================
PARALLAX DAS TECNOLOGIAS
==================================================*/

function initHeroParallax() {

    const heroPhoto =
        document.querySelector(".hero-photo");

    const parallaxElements =
        document.querySelectorAll(
            ".hero-photo .tech .parallax"
        );

    const canUseParallax =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;

    if (
        !heroPhoto ||
        !parallaxElements.length ||
        !canUseParallax
    ) {
        return;
    }

    heroPhoto.addEventListener(
        "mousemove",
        event => {

            const bounds =
                heroPhoto.getBoundingClientRect();

            const centerX =
                bounds.left + bounds.width / 2;

            const centerY =
                bounds.top + bounds.height / 2;

            const normalizedX =
                (event.clientX - centerX) /
                (bounds.width / 2);

            const normalizedY =
                (event.clientY - centerY) /
                (bounds.height / 2);

            parallaxElements.forEach(
                (element, index) => {

                    const intensity =
                        7 + index * 1.4;

                    element.style.setProperty(
                        "--tx",
                        `${normalizedX * intensity}px`
                    );

                    element.style.setProperty(
                        "--ty",
                        `${normalizedY * intensity}px`
                    );

                }
            );

        }
    );

    heroPhoto.addEventListener(
        "mouseleave",
        () => {

            parallaxElements.forEach(element => {

                element.style.setProperty(
                    "--tx",
                    "0px"
                );

                element.style.setProperty(
                    "--ty",
                    "0px"
                );

            });

        }
    );

}


/*==================================================
EFEITO 3D NOS CARDS
==================================================*/

function initTiltEffect() {

    const desktopPointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;

    if (
        !desktopPointer ||
        typeof window.VanillaTilt === "undefined"
    ) {
        return;
    }

    const tiltCards =
        document.querySelectorAll(
            ".project-card"
        );

    if (!tiltCards.length) {
        return;
    }

    window.VanillaTilt.init(
        tiltCards,
        {

            max: 4,
            speed: 500,
            scale: 1.015,
            glare: true,
            "max-glare": 0.08,
            perspective: 1100

        }
    );

}


/*==================================================
AOS
==================================================*/

function initAOS() {

    if (typeof window.AOS === "undefined") {
        return;
    }

    window.AOS.init({

        duration: 750,
        easing: "ease-out-cubic",
        once: true,
        offset: 70

    });

}


/*==================================================
ANO AUTOMÁTICO DO FOOTER
==================================================*/

function updateFooterYear() {

    const yearElement =
        document.querySelector("#current-year");

    if (!yearElement) {
        return;
    }

    yearElement.textContent =
        new Date().getFullYear();

}


/*==================================================
TOAST
==================================================*/

window.mostrarToast = function (
    event,
    message = "Redirecionando..."
) {

    if (event?.preventDefault) {
        event.preventDefault();
    }

    const toast =
        document.querySelector(".toast");

    const destination =
        event?.currentTarget?.href;

    if (!toast) {

        if (destination) {
            window.location.href = destination;
        }

        return;

    }

    toast.textContent = message;
    toast.classList.add("show");

    window.setTimeout(() => {

        toast.classList.remove("show");

    }, 1600);

    if (destination) {

        window.setTimeout(() => {

            window.location.href = destination;

        }, 650);

    }

};
/*==================================================
FORMULÁRIO DE CONTATO
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const contactForm =
        document.querySelector("#contact-form");

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            document.querySelector("#contact-name").value.trim();

        const email =
            document.querySelector("#contact-email").value.trim();

        const subject =
            document.querySelector("#contact-subject").value.trim();

        const message =
            document.querySelector("#contact-message").value.trim();


        const emailSubject = encodeURIComponent(
            `Contato pelo portfólio — ${subject}`
        );


        const emailBody = encodeURIComponent(
`Olá, Winicius!

Meu nome é ${name}.

Email para resposta: ${email}

${message}`
        );


        const toast =
            document.querySelector("#toast");

        if (toast) {

            toast.textContent =
                "Abrindo seu aplicativo de email...";

            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            }, 1800);

        }


        setTimeout(() => {

            window.location.href =
                `mailto:winidrk@gmail.com?subject=${emailSubject}&body=${emailBody}`;

        }, 450);

    });

});