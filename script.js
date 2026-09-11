const startButton = document.getElementById("startButton");

if (startButton) {
    startButton.addEventListener("click", function () {

        // Remember that music should start on the main page
        sessionStorage.setItem("musicStarted", "yes");

        // Start confetti effect
        createConfetti();

        // Small delay so the confetti can be seen
        setTimeout(function () {
            window.location.href = "main.html";
        }, 800);

    });
}


const audio = document.getElementById("birthdayAudio");
const musicButton = document.getElementById("musicToggle");


// =========================================
// MUSIC SETTINGS
// =========================================

const musicStart = 25;
const maxVolume = 0.8;


// =========================================
// FADE IN MUSIC
// =========================================

function fadeInMusic() {

    if (!audio) return;

    // Start at 10% volume
    audio.volume = 0.1;

    audio.play().catch(function () {
        console.log("Music needs to be started manually.");
    });

    let volume = 0.1;

    const fade = setInterval(function () {

        if (volume < maxVolume) {

            volume += 0.02;

            if (volume > maxVolume) {
                volume = maxVolume;
            }

            audio.volume = volume;

        } else {

            clearInterval(fade);

        }

    }, 100);
}


// =========================================
// START MUSIC AT 25 SECONDS
// =========================================

if (audio && document.body.classList.contains("main-page")) {

    function startMusic() {

        audio.currentTime = musicStart;

        fadeInMusic();

    }


    if (sessionStorage.getItem("musicStarted") === "yes") {

        if (audio.readyState >= 1) {

            startMusic();

        } else {

            audio.addEventListener("loadedmetadata", startMusic, {
                once: true
            });

        }

    }

}


// =========================================
// LOOP MUSIC BACK TO 25 SECONDS
// =========================================

if (audio) {

    audio.addEventListener("timeupdate", function () {

        if (
            audio.duration &&
            audio.currentTime >= audio.duration - 0.2
        ) {

            audio.currentTime = musicStart;

            fadeInMusic();

        }

    });

}


// =========================================
// MUSIC BUTTON
// =========================================

if (musicButton && audio) {

    musicButton.addEventListener("click", function () {

        if (audio.paused) {

            if (audio.currentTime < musicStart) {
                audio.currentTime = musicStart;
            }

            fadeInMusic();

            musicButton.textContent = "♫";

        } else {

            audio.pause();

            musicButton.textContent = "♪";

        }

    });

}


// =========================================
// CONFETTI
// =========================================

function createConfetti() {

    const colors = [
        "#FF70BF",
        "#D552A3",
        "#831C91",
        "#FFFFFF",
        "#FFD8EF",
        "#FFD86B"
    ];

    const confettiCount = 32;

    for (let i = 0; i < confettiCount; i++) {

        const confetti = document.createElement("span");

        confetti.classList.add("confetti");

        // Random color
        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        // Random horizontal direction
        const x =
            (Math.random() - 0.5) * 500;

        // Random upward movement
        const y =
            -(Math.random() * 220 + 100);

        // Random rotation
        const rotation =
            Math.random() * 720 - 360;

        // Random size
        const size =
            Math.random() * 5 + 5;

        confetti.style.width = size + "px";
        confetti.style.height = size * 1.4 + "px";

        confetti.style.setProperty("--x", x + "px");
        confetti.style.setProperty("--y", y + "px");
        confetti.style.setProperty("--rotation", rotation + "deg");

        // Place confetti around the Start button
        const buttonRect = startButton.getBoundingClientRect();

        confetti.style.left =
            (buttonRect.left + buttonRect.width / 2) + "px";

        confetti.style.top =
            (buttonRect.top + buttonRect.height / 2) + "px";

        document.body.appendChild(confetti);

        // Remove after animation
        setTimeout(function () {
            confetti.remove();
        }, 900);
    }

    // Give the button a quick celebration effect
    startButton.classList.add("confetti-button");

    setTimeout(function () {
        startButton.classList.remove("confetti-button");
    }, 500);
}


// =========================================
// CARD SCROLL REVEAL
// =========================================

const cards = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }

    });

}, {
    threshold: 0.15
});


cards.forEach(function (card) {
    observer.observe(card);
});

/* =========================================
   PAGE 2 CONFETTI CANNON
========================================= */

function createPageBurst() {

    const colors = [
        "#FF70BF",
        "#D552A3",
        "#831C91",
        "#FFFFFF",
        "#FFD8EF",
        "#FFD86B"
    ];

    const confettiCount = 140;

    function createConfettiPiece(side) {

        const confetti = document.createElement("span");
        confetti.classList.add("page-confetti");

        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        const size = Math.random() * 7 + 4;

        confetti.style.width = size + "px";
        confetti.style.height = size * 1.5 + "px";

        /*
         * LEFT CANNON
         * Shoots toward the upper-right.
         */
        if (side === "left") {

            confetti.style.left =
                (Math.random() * 7 + 1) + "vw";

            confetti.style.bottom =
                (Math.random() * 5 + 1) + "vh";

            const x =
                Math.random() * (window.innerWidth * 0.48) +
                window.innerWidth * 0.05;

            const y =
                -(Math.random() * (window.innerHeight * 0.75) +
                window.innerHeight * 0.25);

            confetti.style.setProperty(
                "--confetti-x",
                x + "px"
            );

            confetti.style.setProperty(
                "--confetti-y",
                y + "px"
            );
        }

        /*
         * RIGHT CANNON
         * Shoots toward the upper-left.
         */
        else {

            confetti.style.right =
                (Math.random() * 7 + 1) + "vw";

            confetti.style.bottom =
                (Math.random() * 5 + 1) + "vh";

            const x =
                -(Math.random() * (window.innerWidth * 0.48) +
                window.innerWidth * 0.05);

            const y =
                -(Math.random() * (window.innerHeight * 0.75) +
                window.innerHeight * 0.25);

            confetti.style.setProperty(
                "--confetti-x",
                x + "px"
            );

            confetti.style.setProperty(
                "--confetti-y",
                y + "px"
            );
        }

        confetti.style.setProperty(
            "--rotation",
            (Math.random() * 1440 - 720) + "deg"
        );

        confetti.style.setProperty(
            "--delay",
            (Math.random() * 0.35) + "s"
        );

        document.body.appendChild(confetti);

        setTimeout(function () {
            confetti.remove();
        }, 4000);
    }


    /*
     * Split the confetti between both cannons.
     */
    for (let i = 0; i < confettiCount / 2; i++) {

        createConfettiPiece("left");
        createConfettiPiece("right");

    }
}


/* =========================================
   START PAGE 2 CONFETTI
========================================= */

if (document.body.classList.contains("main-page")) {

    setTimeout(function () {
        createPageBurst();
    }, 150);

}
