// =========================
// Elements
// =========================

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const loader = document.getElementById("loader");
const success = document.getElementById("success");

const card = document.querySelector(".card");

const hearts = document.querySelector(".hearts");

const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

// =========================
// Resize Canvas
// =========================

function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// =========================
// Funny Messages
// =========================

const messages = [

"No 😎",
"Are you sure? 🥺",
"Think Again 😭",
"Please ❤️",
"I'll Cry 😢",
"Really? 😭",
"Don't Do This 💔",
"Last Chance 😩",
"I Love You 🥹",
"Pretty Please 🥺",
"I Bought Flowers 🌹",
"I Have Chocolates 🍫",
"You Can't Catch Me 😝",
"Still No? 😭",
"I'm Fast ⚡",
"Impossible 😎",
"You Missed 😂",
"Nice Try 😏",
"Hehe 😆",
"Click YES ❤️"

];

let attempts = 0;

// =========================
// Move Button
// =========================

function moveButton(x = null, y = null){

    const cardRect = card.getBoundingClientRect();

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    let left;
    let top;

    if(x!==null && y!==null){

        const centerX = x-cardRect.left;
        const centerY = y-cardRect.top;

        const btnX = parseFloat(noBtn.style.left)||250;
        const btnY = parseFloat(noBtn.style.top)||70;

        let dx = btnX-centerX;
        let dy = btnY-centerY;

        const length = Math.sqrt(dx*dx+dy*dy)||1;

        dx/=length;
        dy/=length;

        left = btnX+dx*180;
        top = btnY+dy*180;

    }else{

        left=Math.random()*(cardRect.width-btnWidth);
        top=Math.random()*(cardRect.height-btnHeight-20);

    }

    left=Math.max(10,Math.min(left,cardRect.width-btnWidth-10));
    top=Math.max(10,Math.min(top,cardRect.height-btnHeight-10));

    noBtn.style.left=left+"px";
    noBtn.style.top=top+"px";

    attempts++;

    noBtn.innerText=messages[attempts%messages.length];

    yesBtn.style.transform=`scale(${1+attempts*0.08})`;

}

// =========================
// Desktop
// =========================

noBtn.addEventListener("mouseenter",()=>{

moveButton();

});

// =========================
// Mobile Touch
// =========================

document.addEventListener("touchmove",(e)=>{

const t=e.touches[0];

const rect=noBtn.getBoundingClientRect();

const cx=rect.left+rect.width/2;
const cy=rect.top+rect.height/2;

const distance=Math.hypot(
t.clientX-cx,
t.clientY-cy
);

if(distance<120){

moveButton(t.clientX,t.clientY);

}

},{passive:true});

// =========================
// Extra Protection
// =========================

noBtn.addEventListener("touchstart",(e)=>{

e.preventDefault();

moveButton();

},{passive:false});

noBtn.addEventListener("click",(e)=>{

e.preventDefault();

moveButton();

});

// =========================
// Floating Hearts
// =========================

function createHeart(){

const heart=document.createElement("span");

heart.innerHTML="❤️";

heart.style.left=Math.random()*100+"vw";

heart.style.animationDuration=4+Math.random()*5+"s";

heart.style.fontSize=12+Math.random()*26+"px";

hearts.appendChild(heart);

setTimeout(()=>{

heart.remove();

},9000);

}

setInterval(createHeart,350);

// =========================
// Confetti
// =========================

const pieces=[];

function random(min,max){

return Math.random()*(max-min)+min;

}

function createConfetti(){

for(let i=0;i<220;i++){

pieces.push({

x:random(0,confettiCanvas.width),

y:random(-400,0),

size:random(5,10),

speed:random(2,7),

angle:random(0,360),

rotation:random(-5,5),

color:`hsl(${Math.random()*360},90%,60%)`

});

}

}

function drawConfetti(){

ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);

pieces.forEach(p=>{

ctx.save();

ctx.translate(p.x,p.y);

ctx.rotate(p.angle);

ctx.fillStyle=p.color;

ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);

ctx.restore();

p.y+=p.speed;

p.angle+=p.rotation;

});

requestAnimationFrame(drawConfetti);

}

drawConfetti();

// =========================
// YES
// =========================

yesBtn.addEventListener("click",()=>{

card.style.display="none";

loader.classList.remove("hidden");

setTimeout(()=>{

loader.classList.add("hidden");

success.classList.remove("hidden");

createConfetti();

},2500);

});