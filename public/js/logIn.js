const logInBtn = $('#logInBtn')

const loginFormHandler = async (event) => {

  event.preventDefault();
    const email = $('#email-login').val().trim();
  const username = $('#username-login').val().trim();
  const password = $('#password-login').val().trim();

  if (username && password) {
      const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, username, password }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          document.location.replace('/userDashboard');
      } else {
          alert('Failed to log in');
      }
  }
};

logInBtn.click(loginFormHandler);