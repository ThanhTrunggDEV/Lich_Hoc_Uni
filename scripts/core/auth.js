export function checkAuth() {
  const studentID = localStorage.getItem('studentID');
  const password = localStorage.getItem('password');
  if (!studentID || !password) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}
