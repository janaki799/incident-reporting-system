const BACKEND_URL = 'https://my-backend-service-h7x8.onrender.com';
const COLLEGE_CODE = '8P';

const toggleSpinner = (show) => {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.display = show ? 'flex' : 'none';
    }
};

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

function populateIncidentTypes() {
    const categorySelect = document.getElementById('incidentCategory');
    const typeSelect = document.getElementById('incidentType');

    typeSelect.innerHTML = '<option value="" disabled selected>Select Type</option>';
    typeSelect.disabled = false;
    const incidentTypes = {
        maintenance: [
            "Broken Equipment",
            "Plumbing Issues",
            "Electrical Problems",
            "Damaged Furniture",
            "Elevator Malfunction",
            "HVAC Issues",
            "Building Damages",
            "Air Conditioning Issues",
            "Lighting Issues",
            "Plumbing Blockages",
            "Fire Alarm Malfunction",
            "Security System Failure",
            "Lab Equipment Malfunction",
            "Electrical Wiring Issues",
            "Computer Lab Equipment Failure",
            "Air Conditioning/Heating Issues in Labs",
            "Faulty Fire Safety Equipment",
            "Leaky Roof or Windows",
            "Poor Lighting in Labs"
        ],
        safety: [
            "Fire Hazards",
            "Theft",
            "Vandalism",
            "Unauthorized Access",
            "Physical Hazards",
            "Suspicious Behavior",
            "Medical Emergencies",
            "Slip and Fall Hazards",
            "Electrical Shocks",
            "Unsafe Staircases",
            "Broken Doors or Windows",
            "Unsafe Lab Equipment",
            "Chemical Spills",
            "Electrical Hazards in Labs",
            "Injury Due to Machine Malfunction",
            "Unsafe Lab Procedures",
            "Fall Hazards in Workshops",
            "Gas Leak",
            "Personal Protective Equipment (PPE) Shortages",
            "Lab Equipment Misuse or Accidents",
            "Broken Safety Equipment"
        ],
        academic: [
            "Cheating or Plagiarism",
            "Harassment by Faculty or Staff",
            "Unfair Grading",
            "Inappropriate Classroom Behavior",
            "Discrimination by Faculty",
            "Student Misconduct",
            "Inadequate Course Materials",
            "Technical Difficulties in Online Courses",
            "Unprofessional Behavior by Faculty",
            "Late Lab Results/Feedback",
            "Issues with Online Lab Sessions",
            "Insufficient Practical Knowledge in Courses",
            "Course Schedule Conflicts",
            "Incomplete/Incorrect Course Materials",
            "Lack of Availability of Important Textbooks",
            "Miscommunication of Course Requirements",
            "Unclear Lab Instructions",
            "Unfair Peer Evaluation",
            "Technical Issues with Online Exams",
            "Unavailability of Lab Assistants"
        ],
        health: [
            "Unsanitary Conditions",
            "Food Safety",
            "COVID-19 or Other Infectious Diseases",
            "First Aid Issues",
            "Excessive Stress",
            "Mental Health Support Issues",
            "Food Poisoning",
            "Unhygienic Toilets",
            "Lack of Emergency Medical Assistance",
            "Campus Health Campaigns (Lack of)",
            "Inadequate Medical Facilities"
        ],
        bullying: [
            "Bullying",
            "Sexual Harassment",
            "Cyber Bullying",
            "Ragging",
            "Bullying in Online Classes",
            "Faculty Favoritism",
            "Discrimination in Labs or Workshops",
            "Gender-Based Harassment",
            "Peer Pressure in Group Projects",
            "Harassment in Hostels",
            "Mental Health Bullying (e.g., stigma around seeking help)"
        ],
        environment: [
            "Pollution",
            "Noise Pollution",
            "Energy Wastage",
            "Pollution Due to Laboratory Waste",
            "Noise Pollution from Workshops",
            "Lack of Recycling in Labs",
            "Uncontrolled Waste Disposal",
            "Deforestation Around the Campus",
            "Electricity Wastage in Labs",
            "Air Pollution Due to Vehicle Exhaust",
            "Lack of Green Spaces on Campus",
            "Inadequate Ventilation in Labs"
        ],
        transport: [
            "Parking Issues",
            "Transportation Delays",
            "Accidents",
            "Unsafe Parking for Vehicles",
            "Limited Bus Services",
            "Transportation Delays During Exams",
            "Cycling and Pedestrian Safety",
            "Accidents at College Gates",
            "Breakdowns of Campus Shuttle Service",
            "Traffic Congestion Around Campus",
            "Poor Road Conditions on Campus",
            "Lack of Accessible Transport for Disabled Students"
        ],
        it: [
            "Network Issues",
            "Software Problems",
            "Access Issues",
            "Slow Internet/Network Connectivity in Labs",
            "Problems with Online Learning Platforms",
            "Software Crashes in Lab Computers",
            "Inadequate Lab Access to Software Tools",
            "Server Downtime for Lab Servers",
            "Cyberbullying or Cybersecurity Threats",
            "Poor Maintenance of College Website",
            "Technical Issues with Student Portals",
            "Wi-Fi Connectivity Issues in Campus Buildings"
        ],
        others: [
            "Complaint About Project Work Allocation",
            "Lack of Campus Events",
            "Social Media Misuse (e.g., fake accounts)",
            "Disciplinary Issues in Hostels",
            "Issues with Club and Event Management",
            "Conflict Over Resource Allocation for Projects",
            "Unfair Distribution of Funding for Projects",
            "Miscommunication Regarding Event Schedules",
            "Conflict with Hostel Rules and Regulations",
            "Complaint About Campus Food Quality",
            "Conflict Over Group Project Assignments"
            ]
    };

    const selectedCategory = categorySelect.value;
    const types = incidentTypes[selectedCategory] || [];

    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type.toUpperCase().replace(/\s+/g, '_');
        option.textContent = type;
        typeSelect.appendChild(option);
    });

    if (types.length === 0) {
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select Type';
        typeSelect.appendChild(defaultOption);
    }
}

async function submitReport(formData) {
    try {
        const response = await fetch(`${BACKEND_URL}/reports`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        });

        if (!response.ok) {
            // Log detailed error response
            const errorData = await response.json();
            console.error('Backend error:', errorData);
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error submitting report:', error);
        throw new Error(error.message || 'Failed to submit report');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const incidentForm = document.getElementById('incidentForm');
    const incidentCategory = document.getElementById('incidentCategory');

     populateIncidentTypes();

    if (incidentForm) {
        incidentForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            toggleSpinner(true);

            try {
                const formData = {
                    collegeCode: COLLEGE_CODE,
                    incidentCategory: document.getElementById('incidentCategory').value,
                    incidentType: document.getElementById('incidentType').value,
                    description: document.getElementById('description').value,
                    date: new Date().toISOString()  // This will capture the exact moment of submission
                };

                // Validate form data before submission
                if (!formData.incidentCategory || !formData.incidentType || !formData.description) {
                    throw new Error('Please fill out all required fields.');
                }

                const response = await submitReport(formData);
                console.log('Report submitted successfully:', response);

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

    if (incidentCategory) {
        incidentCategory.addEventListener('change', populateIncidentTypes);
    }
});









