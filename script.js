// Function to handle the submission of the college code
function submitCode() {
    const collegeCodeInput = document.getElementById('collegeCode').value;
   console.log('Entered Code:',
               collegeCodeInput);

    // Check if the college code is valid
    if (collegeCodeInput.toUpperCase() === '8P') {
        console.log('Redirecting to report page...');
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
        maintenance: ["Broken Equipment", "Plumbing Issues", "Electrical Problems", "Damaged Furniture", "Elevator Malfunction", "HVAC Issues", "Building Damages"],
        safety: ["Fire Hazards", "Theft", "Vandalism", "Unauthorized Access", "Physical Hazards", "Suspicious Behavior", "Medical Emergencies"],
        academic: ["Cheating or Plagiarism", "Harassment by Faculty or Staff", "Unfair Grading", "Inappropriate Classroom Behavior"],
        health: ["Unsanitary Conditions", "Food Safety", "COVID-19 or Other Infectious Diseases", "First Aid Issues"],
        bullying: ["Bullying", "Sexual Harassment", "Cyber Bullying"],
        environment: ["Pollution", "Noise Pollution", "Energy Wastage"],
        transport: ["Parking Issues", "Transportation Delays", "Accidents"],
        it: ["Network Issues", "Software Problems", "Access Issues"],
        others: []
    };

    // Get the selected category and populate the corresponding incident types
    const selectedCategory = categorySelect.value;
    const types = incidentTypes[selectedCategory] || []; // Default to empty array if undefined

    // Populate the incident type dropdown
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type.toUpperCase().replace(/\s+/g, '_'); // Use a URL-friendly value
        option.textContent = type;
        typeSelect.appendChild(option);
    });

    if (types.length===0){
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select Type';

        typeSelect.appendChild(defaultOption);
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    const incidentForm = document.getElementById('incidentForm');
    const incidentCategory = document.getElementById('incidentCategory');
    
    if (incidentForm) {

        incidentForm.addEventListener('submit',function(event){
            event.preventDefault();
         
            const incidentCategory = document.getElementById('incidentCategory').value;
            const incidentType = document.getElementById('incidentType').value;
            const description = document.getElementById('description').value;
            const date = document.getElementById('date').value;
        
            // Display notification sound (ensure you have a sound file)
            const notificationSound = new Audio('notification.mp3'); // Correct path format
            notificationSound.play();
        
            // Create a report object to send to the backend
            const report = {
                collegeCode: '8P',
                incidentCategory: incidentCategory, // Correct key
                incidentType: incidentType,         // Correct key
                description: description,
                date: date || new Date().toISOString()
            };
        
            console.log('Report object:', report);
        
            // Send the report to the backend
            fetch('https://my-backend-service-h7x8.onrender.com/api/flash', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(report)
            })
            .then(response => {
                console.log('Raw response:', response);
               
                    return response.text().then(text =>{
                        console.log('Response body:',text);
                        if (!response.ok) {
                        throw new Error(`Network response was not ok: ${text}`);
                    }
                return JSON.parse(text);
            });
            })
            .then(data => {
                console.log('Parsed response:',data);
                document.getElementById('incidentForm').reset();// Correct form ID
                alert('Your incident report has been submitted successfully!'); // Alert message
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Failed to submit the report. Please try again.");
        });
    });
};
       
             if (incidentCategory){

                incidentCategory.addEventListener('change',populateIncidentTypes);
             }
    });

