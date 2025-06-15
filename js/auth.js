// Auth functionality
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.auth-form');
  const registerForm = document.getElementById('register-form');
  const showRegister = document.getElementById('show-register');
  const showLogin = document.getElementById('show-login');
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const authContainer = document.getElementById('auth-container');
  const appContainer = document.getElementById('app-container');
  
  // Switch between login and register forms
  showRegister.addEventListener('click', () => {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  });
  
  showLogin.addEventListener('click', () => {
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });
  
  // Login functionality
  loginBtn.addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (email && password) {
      // In a real app, you would validate credentials with a server
      localStorage.setItem('currentUser', email);
      authContainer.classList.add('hidden');
      appContainer.classList.remove('hidden');
      initializeApp(email);
    } else {
      alert('Please enter both email and password');
    }
  });
  
  // Register functionality
  registerBtn.addEventListener('click', () => {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    if (name && email && password) {
      // In a real app, you would send this data to a server
      localStorage.setItem('currentUser', email);
      localStorage.setItem('userName', name);
      authContainer.classList.add('hidden');
      appContainer.classList.remove('hidden');
      initializeApp(email);
    } else {
      alert('Please fill in all fields');
    }
  });
  
  // Check if user is already logged in
  if (localStorage.getItem('currentUser')) {
    authContainer.classList.add('hidden');
    appContainer.classList.remove('hidden');
    initializeApp(localStorage.getItem('currentUser'));
  }
});

function initializeApp(email) {
  // Set username in the app
  const username = localStorage.getItem('userName') || email.split('@')[0];
  document.getElementById('username-display').textContent = username;
  
  // Initialize chat functionality
  initializeChat();
}