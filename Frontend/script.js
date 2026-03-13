document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.getElementById("navLinks");
  const registerBtn = document.querySelector(".register-btn");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Change the "Register" button → "Elections" when logged in
  if (registerBtn) {
    if (isLoggedIn) {
      registerBtn.textContent = "Elections";
      registerBtn.href = "elections.html";
    } else {
      registerBtn.textContent = "Register";
      registerBtn.href = "register.html";
    }
  }

  // Update navbar based on login state
  if (isLoggedIn) {
    navLinks.innerHTML = `
      <ul class="nav-tabs">
        <li><a href="index.html" class="${location.pathname.includes('index.html') ? 'active' : ''}">Home</a></li>
        <li><a href="dashboard.html" class="${location.pathname.includes('dashboard.html') ? 'active' : ''}">Personal Info</a></li>
        <li><a href="elections.html" class="${location.pathname.includes('elections.html') ? 'active' : ''}">Elections</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    `;

    // Apply logged-in navbar styles
    const style = document.createElement("style");
    style.innerHTML = `
      /* Navigation Tabs */
      .nav-tabs {
        list-style: none;
        display: flex;
        justify-content: flex-end;
        gap: 20px;
        margin: 0;
        padding: 6px 40px;
        background-color: #000000ff;
      }
      .nav-tabs a {
        text-decoration: none;
        font-size: 16px;
        color: #fff;
        transition: 0.3s;
      }
      .nav-tabs a:hover,
      .nav-tabs .active {
        border-bottom: 2px solid #007bff;
        padding-bottom: 4px;
      }
    `;
    document.head.appendChild(style);

    // Logout functionality
    document.getElementById("logoutLink").addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    });
  } else {
    // Default navbar for non-logged-in users
    navLinks.innerHTML = `
      <a href="index.html" class="${location.pathname.includes('index.html') ? 'active' : ''}">Home</a>
      <a href="#about">About Us</a>
      <a href="#features">Features</a>
      <a href="#contact">Contact</a>
      <a href="login.html" class="login-btn">Login</a>
    `;

    // Blue style only for login button
    const style = document.createElement("style");
    style.innerHTML = `
      nav a.login-btn {
        background: dodgerblue;
        border-radius: 5px;
        padding: 6px 12px;
        color: white;
      }
    `;
    document.head.appendChild(style);
  }
});
