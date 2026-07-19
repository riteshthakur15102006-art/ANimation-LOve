// ===============================
// ELEMENTS
// ===============================

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const mainCard = document.getElementById("mainCard");
const loader = document.getElementById("loader");
const successPage = document.getElementById("successPage");

const heartContainer = document.getElementById("heart-container");

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

// ===============================
// CANVAS SIZE
// ===============================

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// ===============================
// NO BUTTON MESSAGES
// ===============================

const noTexts = [

    "No 😒",
    "Are you sure? 🥺",
    "Really? 😭",
    "Think Again 😢",
    "Please ❤️",
    "Don't Do This 💔",
    "I'll Cry 😭",
    "Last Chance 😩",
    "Pretty Please 🥹",
    "I Bought Flowers 🌹",
    "I Have Chocolates 🍫",
    "Still No? 😭",
    "Impossible 😎",
    "You Missed 😂",
    "Nice Try 😏",
    "Catch Me 😝",
    "I'm Fast ⚡",
    "Nope 😆",
    "Click YES ❤️"

];

let attempt = 0;

// ===============================
// YES BUTTON GROW
// ===============================

function growYesButton(){

    const scale = 1 + attempt * 0.08;

    yesBtn.style.transform = `scale(${scale})`;

}

// ===============================
// MOVE NO BUTTON
// ===============================

function moveNoButton(pointerX = null, pointerY = null){

    const area = document.getElementById("buttonArea");

    const areaRect = area.getBoundingClientRect();

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    let x;
    let y;

    if(pointerX !== null){

        // Escape from finger

        const currentX = parseFloat(noBtn.style.left) || area.clientWidth * 0.6;
        const currentY = parseFloat(noBtn.style.top) || 70;

        const fingerX = pointerX - areaRect.left;
        const fingerY = pointerY - areaRect.top;

        let dx = currentX - fingerX;
        let dy = currentY - fingerY;

        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        dx /= distance;
        dy /= distance;

        x = currentX + dx * 170;
        y = currentY + dy * 170;

    }else{

        x = Math.random() * (area.clientWidth - btnWidth);
        y = Math.random() * (area.clientHeight - btnHeight);

    }

    x = Math.max(10, Math.min(x, area.clientWidth - btnWidth - 10));
    y = Math.max(10, Math.min(y, area.clientHeight - btnHeight - 10));

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    attempt++;

    noBtn.innerText = noTexts[attempt % noTexts.length];

    growYesButton();

}

// ===============================
// DESKTOP EVENTS
// ===============================

noBtn.addEventListener("mouseenter", () => {

    moveNoButton();

});

noBtn.addEventListener("mouseover", () => {

    moveNoButton();

});

// ===============================
// MOBILE TOUCH
// ===============================

document.addEventListener("touchmove", function(e){

    const touch = e.touches[0];

    const rect = noBtn.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const distance = Math.hypot(

        touch.clientX - cx,
        touch.clientY - cy

    );

    if(distance < 120){

        moveNoButton(

            touch.clientX,
            touch.clientY

        );

    }

}, { passive: true });

noBtn.addEventListener("touchstart", function(e){

    e.preventDefault();

    moveNoButton();

}, { passive: false });

noBtn.addEventListener("click", function(e){

    e.preventDefault();

    moveNoButton();

});


// ===============================
// FLOATING HEARTS
// ===============================

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize = (16 + Math.random() * 24) + "px";

    heart.style.animationDuration = (4 + Math.random() * 4) + "s";

    heartContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 8000);

}

setInterval(createHeart, 350);

// ===============================
// CONFETTI
// ===============================

const confetti = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function launchConfetti() {

    confetti.length = 0;

    for (let i = 0; i < 250; i++) {

        confetti.push({

            x: random(0, canvas.width),

            y: random(-canvas.height, 0),

            w: random(6, 12),

            h: random(6, 12),

            dx: random(-2, 2),

            dy: random(3, 8),

            rot: random(0, Math.PI * 2),

            dr: random(-0.2, 0.2),

            color: `hsl(${Math.random() * 360},90%,60%)`

        });

    }

}

function drawConfetti() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach(piece => {

        piece.x += piece.dx;
        piece.y += piece.dy;
        piece.rot += piece.dr;

        ctx.save();

        ctx.translate(piece.x, piece.y);

        ctx.rotate(piece.rot);

        ctx.fillStyle = piece.color;

        ctx.fillRect(
            -piece.w / 2,
            -piece.h / 2,
            piece.w,
            piece.h
        );

        ctx.restore();

    });

    requestAnimationFrame(drawConfetti);

}

drawConfetti();

// ===============================
// YES BUTTON
// ===============================

yesBtn.addEventListener("click", () => {

    mainCard.classList.add("hidden");

    loader.classList.remove("hidden");

    setTimeout(() => {

        loader.classList.add("hidden");

        successPage.classList.remove("hidden");

        successPage.classList.add("fade-in");

        launchConfetti();

        const loveVideo = document.getElementById("loveVideo");

        if (loveVideo) {

            loveVideo.play().catch(() => {});

        }

    }, 2500);

});

// ===============================
// INITIAL POSITION
// ===============================

window.addEventListener("load", () => {

    noBtn.style.left = "60%";
    noBtn.style.top = "65px";

});
