document.addEventListener('DOMContentLoaded', () => {

    // Handle Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password, role })
                });
                const data = await res.json();
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    window.location.href = role === 'admin' ? 'admin.html' : 'employee.html';
                } else {
                    document.getElementById('message').innerText = data.message;
                }
            } catch (error) {
                document.getElementById('message').innerText = 'Error logging in.';
                console.error(error);
            }
        });
    }

    // Handle Signup
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                });
                const data = await res.json();
                if (data.success) {
                    document.getElementById('message').innerText = 'Signup successful!';
                } else {
                    document.getElementById('message').innerText = data.message;
                }
            } catch (error) {
                document.getElementById('message').innerText = 'Error during signup.';
                console.error(error);
            }
        });
    }

    // Handle Admin CRUD Actions
    const claimsSection = document.getElementById('claims-section');
    if (claimsSection) {
        const token = localStorage.getItem('token');

        // Fetch Claims for Admin
        fetch('/api/admin/claims', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            const claimsDiv = document.getElementById('claims');
            if (data.success) {
                data.claims.forEach(claim => {
                    claimsDiv.innerHTML += `<p>Claim ID: ${claim.ClaimID} - ${claim.InjuryDescription}</p>`;
                });
            } else {
                claimsDiv.innerHTML = 'Error fetching claims.';
            }
        })
        .catch(err => console.error('Error fetching claims:', err));
    }

    // Handle Logout
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        });
    }
});
