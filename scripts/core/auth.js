export function checkAuth() {
  const studentID = localStorage.getItem('studentID');
  const password = localStorage.getItem('password');
  const studentName = localStorage.getItem('studentName');
  if (!studentID || !password || !studentName) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}
