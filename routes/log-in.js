document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector("button[type='submit']");

  loginButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.querySelector("input[name='Email']").value.trim();
    const password = document.querySelector("input[name='Password']").value.trim();

    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");

      } else {
        alert(data.error || "Login failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error.");
    }
  });
});
