export function initDonateModal() {
  const donateButton = document.getElementById('donate-button');
  const donateModal = document.getElementById('donate-modal');
  const modalClose = document.getElementById('modal-close');

  donateButton.addEventListener('click', () => donateModal.classList.add('active'));
  modalClose.addEventListener('click', () => donateModal.classList.remove('active'));
  donateModal.addEventListener('click', e => {
    if (e.target === donateModal) donateModal.classList.remove('active');
  });
}
