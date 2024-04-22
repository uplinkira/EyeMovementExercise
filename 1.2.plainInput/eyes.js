// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get the 'Create Grid' button and add a click event listener to it
    const createGridBtn = document.getElementById('create-grid-btn');
    createGridBtn.addEventListener('click', () => {
        // Retrieve the number of eyes from the input field
        const eyeCountInput = document.getElementById('eye-count');
        const numberOfEyes = parseInt(eyeCountInput.value, 10) || 0; // Ensure the input is a number, default to 0 if not

        // Call the function to create the grid with the specified number of eyes
        createGrid(numberOfEyes);
    });
});

// Function to create the grid based on the specified number of eyes
function createGrid(numberOfEyes) {
    // Get the container for the grid
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = ''; // Clear any existing content in the grid container

    // Calculate the number of rows/columns needed to fill the grid evenly
    const gridSize = Math.ceil(Math.sqrt(numberOfEyes));
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    // Loop through the number of eyes and create each eye container and its child elements
    for (let i = 0; i < numberOfEyes; i++) {
        // Create the container for each eye
        const eyeContainer = document.createElement('div');
        eyeContainer.classList.add('eye-container');

        // Create the eye element
        const eye = document.createElement('div');
        eye.classList.add('eye');

        // Create the pupil (ball) element
        const ball = document.createElement('div');
        ball.classList.add('ball');

        // Append the ball to the eye, and the eye to the eye container
        eye.appendChild(ball);
        eyeContainer.appendChild(eye);
        // Append the eye container to the grid container
        gridContainer.appendChild(eyeContainer);

        // Add a mousemove event listener to the document to make the eye follow the mouse
        document.addEventListener('mousemove', (event) => {
            // Get the mouse position
            const { clientX, clientY } = event;
            // Get the position of the eye element
            const { left, top } = eye.getBoundingClientRect();
            // Calculate the center of the eye
            const eyeCenterX = left + eye.offsetWidth / 2;
            const eyeCenterY = top + eye.offsetHeight / 2;
            // Calculate the difference between the mouse position and the eye center
            const deltaX = clientX - eyeCenterX;
            const deltaY = clientY - eyeCenterY;
            // Calculate the angle from the eye to the mouse cursor
            const angle = Math.atan2(deltaY, deltaX);
            // Limit the movement of the ball to stay within the eye container
            const distance = Math.min(eye.offsetWidth / 4, Math.hypot(deltaX, deltaY));
            // Calculate the new position for the ball
            const ballX = distance * Math.cos(angle);
            const ballY = distance * Math.sin(angle);
            // Apply the new position to the ball
            ball.style.transform = `translate(${ballX}px, ${ballY}px)`;
        });

        // Add mouseenter and mouseleave event listeners to change the background color on hover
        eyeContainer.addEventListener('mouseenter', () => {
            eyeContainer.style.backgroundColor = getRandomColor();
        });
        eyeContainer.addEventListener('mouseleave', () => {
            eyeContainer.style.backgroundColor = '';
        });

        // Add a click event listener to change the eye color when clicking anywhere in the eye container
        eyeContainer.addEventListener('click', () => {
            ball.style.backgroundColor = getRandomColor();
        });
    }
}

// Function to generate a random hex color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
