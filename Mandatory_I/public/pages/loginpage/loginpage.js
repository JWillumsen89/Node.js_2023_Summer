document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const errorType = urlParams.get('error');

  if (errorType === 'username') {
      document.getElementById('username-error').innerText = 'User not found.';
  } else if (errorType === 'password') {
      document.getElementById('password-error').innerText = 'Incorrect password.';
  }
});
