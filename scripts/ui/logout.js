export function setupLogout() {
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      localStorage.removeItem('studentID');
      localStorage.removeItem('password');
      localStorage.removeItem('studentName');
      localStorage.removeItem('timetableData');
      window.location.href = 'login.html';
    });
  }
}
