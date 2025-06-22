export function setupLogout() {
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      localStorage.clear();
      window.location.href = 'login.html';
    });
  }
}
