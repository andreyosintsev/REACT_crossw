document.addEventListener("DOMContentLoaded", () => {
    const menuMobile = document.querySelector(".menu-mobile");

    if (!menuMobile) {
        return console.warn('DOM: element ".menu-mobile" not found');
    }

    const menuMobileButton = document.querySelector(".button-menu-mobile");

    if (!menuMobileButton) {
        return console.warn('DOM: element ".button-menu-mobile" not found');
    }

    const overlay = document.querySelector(".overlay");

    const body = document.querySelector("body");

    menuMobileButton.addEventListener("click", () => {
        if (menuMobile.classList.contains("invisible")) {
            showMenuMobile();
        } else {
            hideMenuMobile();
        }
    });

    overlay.addEventListener("click", (e) => {
        if (!menuMobileButton.contains(e.target) && !menuMobile.contains(e.target)) {
            hideMenuMobile();
        }
    });

    // window.addEventListener("resize", () => {
    //     hideMenuMobile();
    // });

    menuLinks = menuMobile.querySelectorAll(".menu-mobile__item-link");

    menuLinks.forEach((link) => link.addEventListener("click", hideMenuMobile));

    function showMenuMobile() {
        menuMobileButton.classList.add("button-menu-mobile_active");
        menuMobile.classList.remove("invisible");
        if (overlay) overlay.classList.remove("hidden");
        body.classList.add("noscroll");
    }

    function hideMenuMobile() {
        menuMobileButton.classList.remove("button-menu-mobile_active");
        menuMobile.classList.add("invisible");
        if (overlay) overlay.classList.add("hidden");
        body.classList.remove("noscroll");
    }
});
