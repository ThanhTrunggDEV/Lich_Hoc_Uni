export function showError(message, details) {
  const scheduleContainer = document.getElementById('schedule-container');
  const loadingElement = document.getElementById('loading');
  if (loadingElement) loadingElement.style.display = 'none';
  if (scheduleContainer) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i><div>${message}</div>`;
    if (details) {
      const detailsElement = document.createElement('div');
      detailsElement.style.marginTop = '10px';
      detailsElement.style.fontSize = '0.8rem';
      detailsElement.textContent = `Chi tiết lỗi: ${details}`;
      errorDiv.appendChild(detailsElement);
    }
    scheduleContainer.appendChild(errorDiv);
  }
}
