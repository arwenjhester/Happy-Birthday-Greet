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

    // Start quietly
    audio.volume = 0.1;

    audio.play().catch(function () {
        console.log("Music needs to be started manually.");
    });

    let volume = 0.1;

    const fade = setInterval(function () {

        if (volume < 0.75) {

    volume += 0.01;

    if (volume > 0.75) {
        volume = 0.75;
    }

    audio.volume = volume;

        } else {

            clearInterval(fade);

        }

    }, 250);
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
