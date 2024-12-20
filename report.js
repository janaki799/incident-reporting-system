document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('incidentCategory');
    const typeSelect = document.getElementById('incidentType');
    const form = document.getElementById('reportForm');
    const loadingSpinner = document.getElementById('loading-spinner');

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
        others: ["Other"]
    };

    // Function to populate incident types based on selected category
    function populateIncidentTypes() {
        const selectedCategory = categorySelect.value;
        const types = incidentTypes[selectedCategory] || [];

        // Clear the existing options in the type dropdown
        typeSelect.innerHTML = '<option value="">Select a type</option>';

        // Add new options to the type dropdown
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeSelect.appendChild(option);
        });
    }

    // Event listener to update incident types when category is selected
    categorySelect.addEventListener('change', populateIncidentTypes);

    // Optional: Populate the incident types dropdown when the page loads (based on default selection)
    populateIncidentTypes();

    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent actual form submission

        // Display loading spinner
        loadingSpinner.style.display = 'block';

        // Simulate a successful form submission after a short delay
        setTimeout(() => {
            // Hide loading spinner
            loadingSpinner.style.display = 'none';

            // Show success message
            alert("Report Submitted Successfully!");

            // Optionally, clear the form
            form.reset();
        }, 1000); // 1 second delay to simulate submission
    });
});