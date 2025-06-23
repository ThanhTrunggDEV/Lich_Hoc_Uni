export function setupLogout() {
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      localStorage.removeItem('studentName');
      localStorage.removeItem('examScheduleCache');
      localStorage.removeItem('password');
      localStorage.removeItem('studentID');
      localStorage.removeItem('timetableData');
      localStorage.removeItem('autolichhoc');
      window.location.href = 'login.html';
    });
  }
}
