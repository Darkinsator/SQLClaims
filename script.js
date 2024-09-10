// script.js
document.getElementById('claimForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Gather form data
    const employeeID = document.getElementById('employeeID').value;
    const claimDate = document.getElementById('claimDate').value;
    const injuryType = document.getElementById('injuryType').value;
    const injuryDescription = document.getElementById('injuryDescription').value;
    const claimAmount = document.getElementById('claimAmount').value;
    
    // Build the payload
    const claimData = {
        employeeID: employeeID,
        claimDate: claimDate,
        injuryType: injuryType,
        injuryDescription: injuryDescription,
        claimAmount: claimAmount
    };

    // Send the data to the backend using fetch
    fetch('https://your-backend-api-url/claims', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(claimData)
    })
    .then(response => response.json())
    .then(data => {
        // Show success message or handle errors
        if (data.success) {
            document.getElementById('responseMessage').textContent = 'Claim submitted successfully!';
            document.getElementById('responseMessage').style.color = 'green';
        } else {
            document.getElementById('responseMessage').textContent = 'Error submitting claim: ' + data.message;
            document.getElementById('responseMessage').style.color = 'red';
        }
    })
    .catch(error => {
        document.getElementById('responseMessage').textContent = 'Error submitting claim: ' + error.message;
        document.getElementById('responseMessage').style.color = 'red';
    });
});
