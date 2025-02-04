//  script.js
//  Valentine's Day
//
//  Created by Alex Otlacan on 2/3/25.

const alternatives = [
    {text:"", images:"images/dog-heart.gif"},
    {text:"I promise it will be unforgettable", images:"images/dog-sad.gif"},
    {text:"Think again", images:"images/nope-sad.gif"},
    {text:"Come on, dare to say yes", images:"images/sad-dog.gif"},
    {text:"Don’t let fear stop you", images:"images/doggy-sad.gif"}
];
const ohyes = {text:"I knew you’d say yes", images:"images/excited-yay.gif"};
const title = document.querySelector('.title');
const text = document.querySelector('.text');
const cat = document.querySelector('.cat');
const buttons = document.querySelectorAll('.button');
const errorButton = document.querySelector('.button__error');

let count = 0;

function updateDisplay(item) {
    console.log(item);
    cat.src = item.images;
    text.innerHTML = item.text;
}

function getRandomPosition() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const randomX = Math.floor(Math.random() * (screenWidth - 100)); // 100 to avoid going off-screen
    const randomY = Math.floor(Math.random() * (screenHeight - 50)); // 50 to avoid going off-screen
    return { x: randomX, y: randomY };
}

function launchConfetti() {
    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.top = 0;
    confettiCanvas.style.left = 0;
    confettiCanvas.style.width = '100%';
    confettiCanvas.style.height = '100%';
    confettiCanvas.style.pointerEvents = 'none';
    document.body.appendChild(confettiCanvas);

    const confetti = confettiCanvas.getContext('2d');
    const colors = ['#ff0', '#f00', '#0f0', '#00f', '#ff1493', '#ffa500'];

    const pieces = Array.from({ length: 100 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI * 2
    }));

    function drawConfetti() {
        confetti.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        pieces.forEach(p => {
            confetti.fillStyle = p.color;
            confetti.beginPath();
            confetti.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            confetti.fill();

            p.y += p.speed;
            p.x += Math.sin(p.angle);

            if (p.y > window.innerHeight) {
                p.y = 0;
                p.x = Math.random() * window.innerWidth;
            }
        });

        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();

    setTimeout(() => {
        document.body.removeChild(confettiCanvas);
    }, 5000);
}

function playSong() {
    const audio = new Audio('audio/how-deep-is-your-love.mp3'); // Replace with your song's path
    audio.play();
}

function playSadSound() {
    const sadAudio = new Audio('audio/error.mp3'); // Replace with your sad sound path
    sadAudio.play();
}

errorButton.addEventListener('click', () => {
    count = 0;
    updateDisplay(alternatives[count]);
    buttons.forEach(btn => btn.style.display = 'inline-block');
    errorButton.style.display = 'none';
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.textContent === 'YES'){
            updateDisplay(ohyes);
            buttons.forEach(btn => btn.style.display = 'none');
            launchConfetti();
            playSong();
        }
        if (button.textContent === 'NO'){
            count++;
            if(count < alternatives.length){
                updateDisplay(alternatives[count]);
            } else {
                buttons.forEach(btn => btn.style.display = 'none');
                errorButton.style.display = 'inline-block';
            }

            playSadSound(); // Play sad sound when NO is clicked

            // Move the "NO" button to a random position
            const newPosition = getRandomPosition();
            button.style.position = 'absolute';
            button.style.left = `${newPosition.x}px`;
            button.style.top = `${newPosition.y}px`;
        }
    });
});
