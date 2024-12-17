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
    const collegeCodeInput = document.getElementById('collegeCode').value.trim();
    console.log('Entered Code:', collegeCodeInput);

    if (collegeCodeInput.toUpperCase() === COLLEGE_CODE) {
        console.log('Redirecting to report page...');
        localStorage.setItem('collegeCode', collegeCodeInput.toUpperCase());
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
            "Broken Equipment", "Plumbing Issues", "Electrical Problems", "Damaged Furniture", "Elevator Malfunction",
            "HVAC Issues", "Building Damages"
        ],
        safety: [
            "Fire Hazards", "Theft", "Vandalism", "Unauthorized Access", "Physical Hazards", "Suspicious Behavior",
            "Medical Emergencies"
        ],
        academic: [
            "Cheating or Plagiarism", "Harassment by Faculty or Staff", "Unfair Grading", "Inappropriate Classroom Behavior"
        ],
        health: [
            "Unsanitary Conditions", "Food Safety", "COVID-19 or Other Infectious Diseases", "First Aid Issues"
        ],
        bullying: [
            "Bullying", "Sexual Harassment", "Cyber Bullying"
        ],
        environment: [
            "Pollution", "Noise Pollution", "Energy Wastage"
        ],
        transport: [
            "Parking Issues", "Transportation Delays", "Accidents"
        ],
        it: [
            "Network Issues", "Software Problems", "Access Issues"
        ],
        others: ["Other"]
    };

    // Get selected category and populate types
    const selectedCategory = categorySelect.value;
    const types = incidentTypes[selectedCategory] || [];

    // Add options to select
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
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

// Function to submit the report using FormData
async function submitReport(formData) {
    try {
        // Log all form data (including the image and text fields) before sending
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const response = await fetch(`${BACKEND_URL}/reports`, {
            method: 'POST',
            body: formData, // The FormData includes both text fields and the image file
        });

        // Check for server errors
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to submit report');
        }

        // Parse response
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error submitting report:', error);
        throw error;
    }
}

// Event listener for DOM content load
document.addEventListener('DOMContentLoaded', () => {
    const collegeCodeForm = document.getElementById('collegeCodeForm');
    const incidentCategorySelect = document.getElementById('incidentCategory');
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.querySelector('.container');
        container.classList.add('flip-animation');
    });

    // Handle college code submission
    if (collegeCodeForm) {
        collegeCodeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitCode();
        });
    }

    // Handle category selection and populate types
    if (incidentCategorySelect) {
        incidentCategorySelect.addEventListener('change', populateIncidentTypes);
        populateIncidentTypes(); // Populate on load
    }

    // Handle report form submission
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                toggleSpinner(true);

                // Collect form data as FormData
                const formData = new FormData(reportForm);

                // Append additional fields like collegeCode and timestamp
                const collegeCode = localStorage.getItem('collegeCode');
                if (!collegeCode) {
                    throw new Error('College code not found');
                }
                formData.append('collegeCode', collegeCode);
                formData.append('timestamp', new Date().toISOString());

                // If an image is selected, it will be automatically included in FormData
                const imageFile = document.getElementById('image').files[0];
                if (imageFile) {
                    formData.append('image', imageFile); // The key should match your backend field name
                }

                // Submit the report as FormData
                const result = await submitReport(formData);

                // Notify the user with the returned data
                alert(`New Report Details:\n\nID: ${result.id}\nCollege Code: ${result.collegeCode}\nCategory: ${result.incidentCategory}\nType: ${result.incidentType}\nDescription: ${result.description}\nDate: ${new Date(result.timestamp).toLocaleString()}\nEnvironment: production`);

                // Reset the form and repopulate incident types
                reportForm.reset();
                populateIncidentTypes(); // Repopulate the categories if needed
            } catch (error) {
                console.error('Error:', error);
                alert(`Failed to submit report: ${error.message}`);
            } finally {
                toggleSpinner(false);
            }
        });
    }
});








