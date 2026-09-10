const startButton = document.getElementById("startButton");

if (startButton) {
    startButton.addEventListener("click", function () {
        sessionStorage.setItem("musicStarted", "yes");
        window.location.href = "main.html";
    });
}


const audio = document.getElementById("birthdayAudio");
const musicButton = document.getElementById("musicToggle");

const musicStart = 25;


if (audio && document.body.classList.contains("main-page")) {

    function startMusic() {
        audio.currentTime = musicStart;

        audio.play().catch(function () {
            console.log("Music needs to be started manually.");
        });
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


if (audio) {
    audio.addEventListener("timeupdate", function () {

        if (
            audio.duration &&
            audio.currentTime >= audio.duration - 0.2
        ) {
            audio.currentTime = musicStart;

            audio.play().catch(function () {
                console.log("Music needs to be started manually.");
            });
        }

    });
}


if (musicButton && audio) {

    musicButton.addEventListener("click", function () {

        if (audio.paused) {

            if (audio.currentTime < musicStart) {
                audio.currentTime = musicStart;
            }

            audio.play();

            musicButton.textContent = "♫";

        } else {

            audio.pause();

            musicButton.textContent = "♪";
        }

    });
}


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
