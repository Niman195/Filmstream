document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    if (registerForm) { 
        registerForm.addEventListener("submit", async function (e) {
            e.preventDefault(); 

            const email = this.email.value.trim();
            const password = this.password.value.trim();

            if (!email || !password) {
                alert("Please fill in both email and password fields.");
                return;
            }

            try {

                const res = await fetch("http://localhost:3000/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password }) 
                });

                const data = await res.json(); 

                if (res.ok) { 
                    alert("Registration successful! You can now log in.");
                    window.location.href = "log-in.html"; 
                } else {
                   
                    alert("Error: " + (data.message || "Something went wrong."));
                }
            } catch (err) {
              
                console.error("Fetch error during registration:", err);
                alert("Server connection error. Please try again later.");
            }
        });
    } else {
        console.error("Error: The 'registerForm' element was not found in the DOM.");
    }
});