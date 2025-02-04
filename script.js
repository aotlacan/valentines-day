//  script.js
//  Valentine's Day
//
//  Created by Alex Otlacan on 2/3/25.

const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');

    const noAudio = new Audio('audio/error.mp3');
    noAudio.currentTime = 0;
    noAudio.play().catch(e => console.log('Playback failed:', e));

    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    // Shrink the "NO" button
    const currentNoFontSize = parseFloat(window.getComputedStyle(noButton).fontSize);
    noButton.style.fontSize = `${currentNoFontSize * 0.8}px`; // Shrinks by 20% each click

    // Increase the "YES" button size
    const currentYesFontSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentYesFontSize * 1.5}px`; // Increases by 50% each click

    const newPosition = getRandomPosition();
    noButton.style.position = 'absolute';
    noButton.style.left = `${newPosition.x}px`;
    noButton.style.top = `${newPosition.y}px`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}

function getRandomPosition() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const randomX = Math.floor(Math.random() * (screenWidth - 100));
    const randomY = Math.floor(Math.random() * (screenHeight - 50));
    return { x: randomX, y: randomY };
}

// Play the song when on yes_page.html
if (window.location.pathname.includes('yes_page.html')) {
    const yesAudio = new Audio('audio/how-deep-is-your-love.mp3');
    yesAudio.play().catch(e => console.log('Playback failed:', e));

    // Add event listener to play a song when clicking the image
    const yesImage = document.getElementById('yes-image');
    if (yesImage) {
        yesImage.addEventListener('click', () => {
            const imageAudio = new Audio('audio/celebration.mp3'); // Replace with your audio file
            imageAudio.play().catch(e => console.log('Image audio playback failed:', e));
        });
    }
}

document.querySelector('.no-button')?.addEventListener('click', handleNoClick);
document.querySelector('.yes-button')?.addEventListener('click', handleYesClick);
