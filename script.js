// ===============================
// START BUTTON
// ===============================

const startButton = document.getElementById("startButton");

if (startButton) {
    startButton.addEventListener("click", function () {

        // Remember that music was started
        sessionStorage.setItem("musicStarted", "yes");

        // Go to the main birthday page
        window.location.href = "main.html";

    });
}


// ===============================
// MUSIC
// ===============================

const audio = document.getElementById("birthdayAudio");
const musicButton = document.getElementById("musicToggle");

const musicStart = 22;


// Start music on main page
if (audio && document.body.classList.contains("main-page")) {

    if (sessionStorage.getItem("musicStarted") === "yes") {

        audio.currentTime = musicStart;

        audio.play().catch(function () {
            console.log("Music needs to be started manually.");
        });
    }
}


// Loop the selected part of the song
if (audio) {

    audio.addEventListener("timeupdate", function () {

        if (audio.currentTime >= audio.duration - 0.2) {

            audio.currentTime = musicStart;
            audio.play();

        }

    });
}


// Music on/off button
if (musicButton && audio) {

    musicButton.addEventListener("click", function () {

        if (audio.paused) {
            audio.play();
            musicButton.textContent = "♫";
        } else {
            audio.pause();
            musicButton.textContent = "♪";
        }

    });
}


// ===============================
// MESSAGE CARD ANIMATION
// ===============================

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
