// Sample parking data (in real-world use, this data would come from a database)
let availableSpaces = 50;
let allottedSpaces = 0;

// Function to update the parking space counts
function updateParkingCounts() {
    document.getElementById('available-count').textContent = availableSpaces;
    document.getElementById('allotted-count').textContent = allottedSpaces;
}

// Function to toggle the state of a parking space (book/unbook)
function toggleParkingSpace(index) {
    if (index >= 0 && index < 50) {
        const space = parkingSpaces[index];
        if (space.classList.contains('booked')) {
            // Unbook the space
            space.classList.remove('booked');
            allottedSpaces--;
            availableSpaces++;
            updateParkingCounts();
        } else {
            // Book the space
            space.classList.add('booked');
            allottedSpaces++;
            availableSpaces--;
            updateParkingCounts();
        }
    }
}

// Event listener for parking space clicks
document.querySelector('.parking-grid').addEventListener('click', (e) => {
    if (e.target.classList.contains('parking-space')) {
        const index = Array.from(parkingSpaces).indexOf(e.target);
        toggleParkingSpace(index);
    }
});

// Function to allocate parking spaces
function allocateParkingSpaces(quantity) {
    if (availableSpaces >= quantity) {
        availableSpaces -= quantity;
        allottedSpaces += quantity;
        updateParkingCounts();
        return true; // Allocation successful
    } else {
        return false; // Allocation failed
    }
}

// Function to release parking spaces
function releaseParkingSpaces(quantity) {
    if (allottedSpaces >= quantity) {
        availableSpaces += quantity;
        allottedSpaces -= quantity;
        updateParkingCounts();
        return true; // Release successful
    } else {
        return false; // Release failed
    }
}

// Event listener for the parking form submission
document.getElementById('parking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const quantity = parseInt(document.getElementById('parking-quantity').value);

    if (quantity > 0) {
        if (e.submitter.id === 'allocate-button') {
            if (allocateParkingSpaces(quantity)) {
                alert(`${quantity} parking spaces allocated.`);
            } else {
                alert('Not enough available parking spaces.');
            }
        } else if (e.submitter.id === 'release-button') {
            if (releaseParkingSpaces(quantity)) {
                alert(`${quantity} parking spaces released.`);
            } else {
                alert('Not enough allotted parking spaces.');
            }
        }

        // Update parking space visuals after allocation or release
        updateParkingSpaceVisuals();
    } else {
        alert('Invalid quantity. Please enter a positive number.');
    }
});

// Generate parking spaces dynamically
function generateParkingSpaces() {
    const parkingGrid = document.querySelector('.parking-grid');
    for (let i = 1; i <= 50; i++) {
        const parkingSpace = document.createElement('div');
        parkingSpace.className = 'parking-space';
        parkingSpace.textContent = i;
        parkingGrid.appendChild(parkingSpace);
    }
}

generateParkingSpaces();
const parkingSpaces = document.querySelectorAll('.parking-space');

// Update parking space visuals based on allocation status
function updateParkingSpaceVisuals() {
    parkingSpaces.forEach((space, index) => {
        if (isParkingSpaceBooked(index)) {
            space.classList.add('booked');
        } else {
            space.classList.remove('booked');
        }
    });
}

updateParkingSpaceVisuals();

// Function to check if a parking space is booked
function isParkingSpaceBooked(index) {
    return parkingSpaces[index].classList.contains('booked');
}

// Reservation form submission
document.getElementById('reservation-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const date = document.getElementById('reservation-date').value;
    const time = document.getElementById('reservation-time').value;
    // Send reservation request to backend and handle response
    console.log(`Parking space reserved for ${date} at ${time}`);
});

// Payment button click
document.getElementById('pay-button').addEventListener('click', function () {
    const totalAmount = parseFloat(document.getElementById('total-amount').textContent);
    // Integrate with payment gateway to process payment
    console.log(`Payment processed for total amount of $${totalAmount}`);
});

// Feedback submission
document.getElementById('submit-feedback').addEventListener('click', function () {
    const feedback = document.getElementById('feedback-text').value;
    // Send feedback to backend for processing
    console.log(`Feedback submitted: ${feedback}`);
});
