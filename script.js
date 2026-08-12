document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("music");
    const mainContent = document.getElementById("mainContent");
    const angryButton = document.getElementById("angryButton");
    const forgiveMessage = document.getElementById("forgiveMessage");

    let heartInterval;


    /* ================================
       OPEN WEBSITE
    ================================= */

    window.startWebsite = function () {

        // Tampilkan isi website
        mainContent.style.display = "block";

        // Putar musik
        if (music) {
            music.volume = 0.65;

            music.play().catch(() => {
                console.log("Musik menunggu izin browser.");
            });
        }

        // Scroll perlahan ke isi
        setTimeout(() => {
            mainContent.scrollIntoView({
                behavior: "smooth"
            });
        }, 150);

        // Mulai hati beterbangan
        createHeart();

        heartInterval = setInterval(createHeart, 1200);

    };


    /* ================================
       FORGIVE BUTTON ❤️
    ================================= */

    window.forgive = function () {

        if (!forgiveMessage) return;

        forgiveMessage.style.display = "block";

        // Sembunyikan tombol
        const buttons = document.querySelector(".choice-buttons");

        if (buttons) {
            buttons.style.display = "none";
        }

        // Efek hati banyak
        for (let i = 0; i < 25; i++) {

            setTimeout(() => {
                createHeart();
            }, i * 100);

        }

        // Scroll ke pesan
        setTimeout(() => {

            forgiveMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 300);

    };


    /* ================================
       BELUM 😤 BUTTON
    ================================= */

    window.notForgive = function () {

        if (!angryButton) return;

        const messages = [
            "Yakin belum maafin? 🥺",
            "Ayolah sayangkuu 😭",
            "Aku udah minta maaf loh 😭❤️",
            "Jangan marah donggg 🥺",
            "Sini aku peluk dulu 🫂",
            "Aku janji nggak bikin kamu jealous lagi 😭",
            "Pleaseee sayangkuu ❤️",
            "Masa masih marah 😭"
        ];

        const randomMessage =
            messages[Math.floor(Math.random() * messages.length)];

        angryButton.innerText = randomMessage;

        // Pindahkan tombol secara acak
        const maxX = Math.min(
            window.innerWidth - angryButton.offsetWidth - 20,
            250
        );

        const maxY = 120;

        const x =
            Math.random() * Math.max(maxX, 20) -
            Math.max(maxX, 20) / 2;

        const y =
            Math.random() * maxY -
            maxY / 2;

        angryButton.style.transform =
            `translate(${x}px, ${y}px)`;

        // Buat hati kecil
        for (let i = 0; i < 5; i++) {
            setTimeout(createHeart, i * 100);
        }

    };


    /* ================================
       FLOATING HEART
    ================================= */

    function createHeart() {

        const heart = document.createElement("div");

        heart.className = "heart";

        const hearts = [
            "❤️",
            "💗",
            "💕",
            "💖",
            "💓",
            "💞",
            "🥺"
        ];

        heart.innerText =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.fontSize =
            (12 + Math.random() * 18) + "px";

        heart.style.animationDuration =
            (4 + Math.random() * 3) + "s";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);

    }


    /* ================================
       CLICK ANYWHERE = SMALL HEART
    ================================= */

    document.addEventListener("click", (event) => {

        // Jangan munculkan hati saat klik tombol "Belum"
        if (
            event.target === angryButton ||
            event.target.classList.contains("angry-btn")
        ) {
            return;
        }

        const heart = document.createElement("div");

        heart.className = "heart";
        heart.innerText = "❤️";

        heart.style.position = "fixed";
        heart.style.left = event.clientX + "px";
        heart.style.top = event.clientY + "px";
        heart.style.bottom = "auto";
        heart.style.fontSize = "16px";
        heart.style.pointerEvents = "none";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);

    });


    /* ================================
       CLEANUP
    ================================= */

    window.addEventListener("beforeunload", () => {

        if (heartInterval) {
            clearInterval(heartInterval);
        }

    });

});
