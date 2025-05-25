document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const passwordToggle = document.getElementById('password-toggle');
  const passwordInput = document.getElementById('password');
  const errorMessage = document.getElementById('error-message');
  const studentIdInput = document.getElementById('studentId');
  const rememberCheckbox = document.getElementById('remember');
  

  const savedStudentId = localStorage.getItem('savedStudentId');
  const savedPassword = localStorage.getItem('savedPassword');
  const isRemembered = localStorage.getItem('rememberLogin') === 'true';
  
  if (isRemembered && savedStudentId && savedPassword) {
    studentIdInput.value = savedStudentId;
    passwordInput.value = savedPassword;
    rememberCheckbox.checked = true;
  }
  

  passwordToggle.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      passwordToggle.classList.remove('fa-eye');
      passwordToggle.classList.add('fa-eye-slash');
    } else {
      passwordInput.type = 'password';
      passwordToggle.classList.remove('fa-eye-slash');
      passwordToggle.classList.add('fa-eye');
    }
  });
  
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const studentId = studentIdInput.value;
    const password = passwordInput.value;
    const remember = rememberCheckbox.checked;

    if (!studentId || !password) {
      errorMessage.style.display = 'flex';
      errorMessage.querySelector('span').textContent = 'Vui lòng nhập đầy đủ thông tin!';
      return;
    }
    
    errorMessage.style.display = 'none';
    

    const loginButton = document.getElementById('login-button');
    loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    loginButton.disabled = true;
    
    if (remember) {
      localStorage.setItem('savedStudentId', studentId);
      localStorage.setItem('savedPassword', password);
      localStorage.setItem('rememberLogin', 'true');
    } else {
      
      localStorage.removeItem('savedStudentId');
      localStorage.removeItem('savedPassword');
      localStorage.removeItem('rememberLogin');
    }
    
    
    localStorage.setItem('studentID', studentId);
    localStorage.setItem('password', password);
    
    setTimeout(async function() {
      try {
        const response = await fetch(`https://api.nguyenthanhtrung.online/login`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: studentId,
            password: password
            })
        });
        let data = await response.json();
        const studentName = data['data'];
        localStorage.setItem('studentName', studentName);
        
        if(studentName !== "Khách"){
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