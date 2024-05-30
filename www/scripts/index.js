const canvas = document.getElementById("stars");
const context = canvas.getContext("2d");
const colorRange = [0, 60, 240];

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawStars() {
    const largestWindow = window.innerWidth >= window.innerHeight
        ? window.innerWidth : window.innerHeight ;
    const diameter = (largestWindow * Math.sqrt(2)) * Math.sqrt(2);
    canvas.width = diameter;
    canvas.height = diameter;

    for (let i = 0; i < diameter; i++) {
        const x = Math.random() * diameter;
        const y = Math.random() * diameter;
        const hue = colorRange[rand(0, colorRange.length - 1)];
        const sat = rand(50, 100);

        const radius = Math.random() * 1.2;
        context.beginPath();
        context.arc(x, y, radius, 0, 360);
        context.fillStyle = `hsla(${hue}, ${sat}%, 90%, 0.9)`;
        context.fill();
    }
}
drawStars();

window.addEventListener("resize", drawStars);