(function () {
    document.addEventListener("DOMContentLoaded", () => {
        function setFullHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        }

        setFullHeight();

        if ("visualViewport" in window) {
            window.visualViewport.addEventListener("resize", setFullHeight);
        } else {
            window.addEventListener("resize", setFullHeight);
            window.addEventListener("orientationchange", setFullHeight);
        }
    });
})();
