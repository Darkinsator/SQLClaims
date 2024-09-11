document.getElementById('claimForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const employeeID = document.getElementById('employeeID').value;
    const claimDate = document.getElementById('claimDate').value;
    const injuryType = document.getElementById('injuryType').value;
    const injuryDescription = document.getElementById('injuryDescription').value;
    const claimAmount = document.getElementById('claimAmount').value;

    try {
        const response = await fetch('http://localhost:3000/claims', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                employeeID,
                claimDate,
                injuryType,
                injuryDescription,
                claimAmount,
            }),
        });
        const result = await response.json();
        if (result.success) {
            alert('Claim submitted successfully!');
        } else {
            alert('Error submitting claim: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});