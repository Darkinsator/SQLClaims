// public/script.js
document.getElementById('claimForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const employeeID = document.getElementById('employeeID').value;
    const claimDate = document.getElementById('claimDate').value;
    const injuryType = document.getElementById('injuryType').value;
    const injuryDescription = document.getElementById('injuryDescription').value;
    const claimAmount = document.getElementById('claimAmount').value;

    const responseMessage = document.getElementById('responseMessage');

    try {
        const response = await fetch('/api/claims', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ employeeID, claimDate, injuryType, injuryDescription, claimAmount })
        });

        const result = await response.json();
        if (response.ok) {
            responseMessage.textContent = result.message;
        } else {
            responseMessage.textContent = `Error: ${result.message}`;
        }
    } catch (error) {
        responseMessage.textContent = `Error: ${error.message}`;
    }
});
