export function showGreeting() {
  const sayhiText = document.getElementById('say-hi');
  const studentName = localStorage.getItem('studentName');
  if (studentName && studentName.length >= 6) {
    sayhiText.innerHTML = `Xin Chào <strong>${studentName}</strong> !!!<br> Ngày Hôm Nay Của Bạn Thế Nào?`;
  }
}
