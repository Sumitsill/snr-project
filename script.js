// Initialize Supabase
const SUPABASE_URL = "https://YOUR_PROJECT_URL.supabase.co"; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2dWVkaGpyaWtzbnl2c3dvY29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNzMxNTQsImV4cCI6MjA3Nzg0OTE1NH0.vkTPPinPA6dttnH1Kpi9QV2CFLZMpq1rbijDw2Idydc"; // Replace with your anon key

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Elements
const loginForm = document.getElementById("login-form");
const message = document.getElementById("message");
const signupBtn = document.getElementById("signup-btn");

// Handle login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  message.textContent = "Logging in...";

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    message.textContent = "❌ " + error.message;
  } else {
    message.textContent = "✅ Login successful!";
    // Example redirect:
    setTimeout(() => (window.location.href = "dashboard.html"), 1000);
  }
});

// Handle signup
signupBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    message.textContent = "Enter email & password to sign up.";
    return;
  }

  message.textContent = "Creating account...";

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    message.textContent = "❌ " + error.message;
  } else {
    message.textContent = "✅ Account created! Check your email to verify.";
  }
});

