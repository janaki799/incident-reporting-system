// Function to handle the submission of the college code
function submitCode() {
    const collegeCodeInput = document.getElementById('collegeCode').value;

    // Check if the college code is valid
    if (collegeCodeInput.toUpperCase() === '8P') {
        // Redirect to the reporting form page
        window.location.href = 'report.html';
    } else {
        alert('Invalid college code. Please try again.');
    }
}

// Function to populate incident types based on the selected category
function populateIncidentTypes() {
    const categorySelect = document.getElementById('incidentCategory');
    const typeSelect = document.getElementById('incidentType');

    // Clear the current options in the incident type dropdown
    typeSelect.innerHTML = '';

    // Define incident types based on selected category
    const incidentTypes = {
        maintenance: [
            "Broken Equipment",
            "Plumbing Issues",
            "Electrical Problems",
            "Damaged Furniture",
            "Elevator Malfunction",
            "HVAC Issues",
            "Building Damages"
        ],
        safety: [
            "Fire Hazards",
            "Theft",
            "Vandalism",
            "Unauthorized Access",
            "Physical Hazards",
            "Suspicious Behavior",
            "Medical Emergencies"
        ],
        academic: [
            "Cheating or Plagiarism",
            "Harassment by Faculty or Staff",
            "Unfair Grading",
            "Inappropriate Classroom Behavior"
        ],
        health: [
            "Unsanitary Conditions",
            "Food Safety",
            "COVID-19 or Other Infectious Diseases",
            "First Aid Issues"
        ],
        bullying: [
            "Bullying",
            "Sexual Harassment",
            "Cyber Bullying"
        ],
        environment: [
            "Pollution",
            "Noise Pollution",
            "Energy Wastage"
        ],
        transport: [
            "Parking Issues",
            "Transportation Delays",
            "Accidents"
        ],
        it: [
            "Network Issues",
            "Software Problems",
            "Access Issues"
        ],
        others: []
    };

    // Get the selected category and populate the corresponding incident types
    const selectedCategory = categorySelect.value;
    const types = incidentTypes[selectedCategory];

    // Populate the incident type dropdown
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type.toLowerCase().replace(/\s+/g, '_'); // Use a URL-friendly value
        option.textContent = type;
        typeSelect.appendChild(option);
    });
}

// Function to handle the incident report form submission
document.getElementById('incidentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const incidentCategory = document.getElementById('incidentCategory').value;
    const incidentType = document.getElementById('incidentType').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;

    // Display notification sound (ensure you have a sound file)
    const notificationSound = new Audio('c:\Users\Ravi varma\Downloads\alert-sound-230091.mp3 '); // Replace with your sound file path
    notificationSound.play();

    // Create a report object (for backend submission, modify as needed)
    const report = {
        category: incidentCategory,
        type: incidentType,
        description: description,
        date: date
    };

    // For demonstration, log the report object to the console
    console.log(report);


    fetch("https://maker.ifttt.com/trigger/form_submitted/json/with/key/gWTj2JlC9uzHyyeAnPeyIfUt9dxZelZy5JeJXc4Gzi9",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json/json"
            },
            body: JSON.stringify(report)
        })
        .then(response =>{
            if(response.ok){
                console.log("Notification sent successfully!");
            }
            else {
                console.error("Failed to send notification:", response.status);
            }
        })
        .catch(error =>{
            console.error("Error", error);
        });


    // Reset the form after submission
    document.getElementById('incidentForm').reset();

    // Notify the user
    alert('Your incident report has been submitted successfully!');
});

// Event listener to update incident types when the category changes
document.getElementById('incidentCategory').addEventListener('change', populateIncidentTypes);