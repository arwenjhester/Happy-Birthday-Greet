const startButton = document.getElementById("startButton");

if (startButton) {
    startButton.addEventListener("click", function () {
        sessionStorage.setItem("musicStarted", "yes");
        window.location.href = "main.html";
    });
}


const audio = document.getElementById("birthdayAudio");
const musicButton = document.getElementById("musicToggle");


// =========================================
// MUSIC SETTINGS
// =========================================

const musicStart = 25;


// =========================================
// FADE IN MUSIC
// =========================================

function fadeInMusic() {

    if (!audio) return;

    const startVolume = 0;
    const targetVolume = 0.5;
    const fadeDuration = 10000; // 10 seconds

    audio.volume = startVolume;

    audio.play().then(function () {

        const startTime = performance.now();

        function fade(timestamp) {

            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / fadeDuration, 1);

            audio.volume =
                startVolume +
                (targetVolume - startVolume) * progress;

            if (progress < 1) {
                requestAnimationFrame(fade);
            } else {
                audio.volume = targetVolume;
            }
        }

        requestAnimationFrame(fade);

    }).catch(function () {
        console.log("Music needs to be started manually.");
    });
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
