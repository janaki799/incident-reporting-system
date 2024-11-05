// Constants
const BACKEND_URL = 'https://my-backend-service-h7x8.onrender.com';
const COLLEGE_CODE = '8P';

// Utility function to show/hide spinner
const toggleSpinner = (show) => {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.display = show ? 'flex' : 'none';
    }
};

// Function to handle the submission of the college code
function submitCode() {
    const collegeCodeInput = document.getElementById('collegeCode').value;
    console.log('Entered Code:', collegeCodeInput);

    if (collegeCodeInput.toUpperCase() === COLLEGE_CODE) {
        console.log('Redirecting to report page...');
        window.location.href = 'report.html';
    } else {
        alert('Invalid college code. Please try again.');
    }
}

// Function to populate incident types based on the selected category
function populateIncidentTypes() {
    const categorySelect = document.getElementById('incidentCategory');
    const typeSelect = document.getElementById('incidentType');

    // Clear current options
    typeSelect.innerHTML = '';

    // Define incident types mapping
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

    // Get selected category and populate types
    const selectedCategory = categorySelect.value;
    const types = incidentTypes[selectedCategory] || [];

    // Add options to select
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type.toUpperCase().replace(/\s+/g, '_');
        option.textContent = type;
        typeSelect.appendChild(option);
    });

    // Add default option if no types
    if (types.length === 0) {
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select Type';
        typeSelect.appendChild(defaultOption);
    }
}

// Function to submit the report
async function submitReport(formData) {
    try {
        const response = await fetch(`${BACKEND_URL}/reports`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to submit report');
        }

        return data;
    } catch (error) {
        console.error('Error submitting report:', error);
        throw error;
    }
}

// Event listener for DOM content load
document.addEventListener('DOMContentLoaded', () => {
    const incidentForm = document.getElementById('incidentForm');
    const incidentCategory = document.getElementById('incidentCategory');

    // Add form submit handler
    if (incidentForm) {
        incidentForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            toggleSpinner(true);

            try {
                // Play notification sound
                const notificationSound = new Audio('notification.mp3');
                await notificationSound.play();

                // Gather form data
                const formData = {
                    collegeCode: COLLEGE_CODE,
                    incidentCategory: document.getElementById('incidentCategory').value,
                    incidentType: document.getElementById('incidentType').value,
                    description: document.getElementById('description').value,
                    date: document.getElementById('date').value || new Date().toISOString()
                };

                // Submit report
                const response = await submitReport(formData);
                console.log('Report submitted successfully:', response);

                // Reset form and show success message
                incidentForm.reset();
                alert('Your incident report has been submitted successfully!');
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to submit the report. Please try again.');
            } finally {
                toggleSpinner(false);
            }
        });
    }

    // Add category change handler
    if (incidentCategory) {
        incidentCategory.addEventListener('change', populateIncidentTypes);
    }
});




