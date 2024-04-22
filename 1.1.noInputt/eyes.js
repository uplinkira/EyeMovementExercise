// script.js
document.addEventListener('DOMContentLoaded', () => {
    createGrid(20); // Example: create a 10x10 grid
});

function createGrid(numberOfEyes) {
    const gridContainer = document.getElementById('grid-container');
    for (let i = 0; i < numberOfEyes; i++) {
        const eyeContainer = document.createElement('div');
        eyeContainer.classList.add('eye-container');

        const eye = document.createElement('div');
        eye.classList.add('eye');

        const ball = document.createElement('div');
        ball.classList.add('ball');

        eye.appendChild(ball);
        eyeContainer.appendChild(eye);
        gridContainer.appendChild(eyeContainer);

        // Functionality 2: Eye follows the mouse
        document.addEventListener('mousemove', (event) => {
            const { clientX, clientY } = event;
            const { left, top } = eye.getBoundingClientRect();
            const eyeCenterX = left + eye.offsetWidth / 2;
            const eyeCenterY = top + eye.offsetHeight / 2;
            const deltaX = clientX - eyeCenterX;
            const deltaY = clientY - eyeCenterY;
            const angle = Math.atan2(deltaY, deltaX);
            const distance = Math.min(eye.offsetWidth / 4, Math.hypot(deltaX, deltaY));
            const ballX = distance * Math.cos(angle);
            const ballY = distance * Math.sin(angle);
            ball.style.transform = `translate(${ballX}px, ${ballY}px)`;
        });

        // Functionality 3: Change background color on hover
        eyeContainer.addEventListener('mouseenter', () => {
            eyeContainer.style.backgroundColor = getRandomColor();
        });
        eyeContainer.addEventListener('mouseleave', () => {
            eyeContainer.style.backgroundColor = '';
        });

        // Functionality 4: Change eye color on click
        eye.addEventListener('click', () => {
            ball.style.backgroundColor = getRandomColor();
        });
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
