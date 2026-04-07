const cards = document.querySelectorAll(".card");
let current = 0;

function updateCards() {
    cards.forEach((card, i) => {
        card.classList.remove("active", "next", "prev", "hidden");

        if (i === current) {
            card.classList.add("active");
        } else if (i === current + 1) {
            card.classList.add("next");
        } else if (i === current - 1) {
            card.classList.add("prev");
        } else {
            card.classList.add("hidden");
        }
    });
}

updateCards();

/* ضغط للتنقل */
cards.forEach((card, i) => {
    card.addEventListener("click", () => {
        if (i > current) current++;
        else if (i < current) current--;
        if (current < 0) current = 0;
        if (current >= cards.length) current = cards.length - 1;
        updateCards();
    });
});

/* سحب يمين/شمال */
let startX = 0;

document.getElementById("slider").addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

document.getElementById("slider").addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;

    if (endX < startX - 50) {
        current = Math.min(current + 1, cards.length - 1);
    } else if (endX > startX + 50) {
        current = Math.max(current - 1, 0);
    }

    updateCards();
});

/* دعم الماوس */
let mouseDown = false;

document.getElementById("slider").addEventListener("mousedown", e => {
    mouseDown = true;
    startX = e.clientX;
});

document.getElementById("slider").addEventListener("mouseup", e => {
    if (!mouseDown) return;
    mouseDown = false;

    let endX = e.clientX;

    if (endX < startX - 50) {
        current = Math.min(current + 1, cards.length - 1);
    } else if (endX > startX + 50) {
        current = Math.max(current - 1, 0);
    }

    updateCards();
});
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = Math.random() * window.innerHeight + "px";

    heart.style.fontSize = (Math.random() * 20 + 10) + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// عدد القلوب في البداية
for (let i = 0; i < 100; i++) {
    setTimeout(createHeart, i * 50);
}
function getNextDate() {
    const now = new Date();
    let year = now.getFullYear();

    let target = new Date(year, 9, 10); // 9 = October

    // لو التاريخ عدى → السنة الجاية
    if (now > target) {
        target = new Date(year + 1, 9, 10);
    }

    return target;
}

function updateCountdown() {
    const now = new Date();
    const target = getNextDate();
    const diff = target - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();