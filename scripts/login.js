document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const passwordToggle = document.getElementById('password-toggle');
  const passwordInput = document.getElementById('password');
  const errorMessage = document.getElementById('error-message');
  const studentIdInput = document.getElementById('studentId');
  const loginButton = document.getElementById('login-button');

  passwordToggle.addEventListener('click', function() {
    const isPwd = passwordInput.type === 'password';
    passwordInput.type = isPwd ? 'text' : 'password';
    passwordToggle.classList.toggle('fa-eye', !isPwd);
    passwordToggle.classList.toggle('fa-eye-slash', isPwd);
  });

  function skipLogin(){
    const studentID = localStorage.getItem("studentID");
    const password = localStorage.getItem("password");
    const studentName = localStorage.getItem("studentName");
    
    if(studentID != null && password != null && studentName != null) {
      window.location.href = 'lichhoc.html';
    }

  }

  skipLogin();
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const studentId = studentIdInput.value;
    const password = passwordInput.value;

    if (!studentId || !password) {
      errorMessage.style.display = 'flex';
      errorMessage.querySelector('span').textContent = 'Vui lòng nhập đầy đủ thông tin!';
      return;
    }
    errorMessage.style.display = 'none';
    loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    loginButton.disabled = true;
    setTimeout(async function() {
      try {
        const response = await fetch(`https://api.nguyenthanhtrung.online/login`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: studentId, password: password })
        });
        const data = await response.json();
        const studentName = data['data'];
        

        if (studentName !== "Khách" && studentName != "Guest") {
          localStorage.setItem('studentName', studentName);
          localStorage.setItem('studentID', studentId);
          localStorage.setItem('password', password);
          window.location.href = 'lichhoc.html';
        } else {
          throw new Error('Đăng nhập thất bại vui lòng kiểm tra lại');
        }
      } catch (error) {
        errorMessage.style.display = 'flex';
        errorMessage.querySelector('span').textContent = error.message || 'Đăng nhập thất bại vui lòng kiểm tra lại';
        loginButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Đăng Nhập';
        loginButton.disabled = false;
      }
    }, 1500);
  });

  studentIdInput.focus();
});