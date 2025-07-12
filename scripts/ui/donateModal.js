export function initDonateModal() {
  const donateButton = document.getElementById('donate-button');
  const donateModal = document.getElementById('donate-modal');
  const modalClose = document.getElementById('modal-close');

  donateButton.addEventListener('click', () => donateModal.classList.add('active'));
  modalClose.addEventListener('click', () => donateModal.classList.remove('active'));
  donateModal.addEventListener('click', e => {
    if (e.target === donateModal) donateModal.classList.remove('active');
  });
    function updateDonateQR() {
    let studentId = window.studentId || localStorage.getItem('studentID');
    let qrImg = document.getElementById('qr-code');
    if (qrImg) {
      let baseUrl = "https://api.vietqr.io/image/970422-015062005-AZvwQuX.jpg";
      let params = [
        "accountName=NGUYEN%20THANH%20TRUNG",
        "amount=10000",
        "addInfo=donate " + (studentId ? "_" + encodeURIComponent(studentId) : "")
      ].join("&");
      qrImg.src = baseUrl + "?" + params;
    }
  }
  document.getElementById('donate-button').addEventListener('click', updateDonateQR);
}
