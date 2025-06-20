export function initDarkMode(changeModeButton) {
  let isDarkMode = false;
  (function autoDarkModeByTime() {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 19 || hour < 5) {
      document.body.classList.add('dark-mode');
      isDarkMode = true;
      changeModeButton.innerHTML = '<i class="fas fa-moon"></i>';
      var isSaoBang = localStorage.getItem('saobang');
      if(isSaoBang && isSaoBang === 'on')
         document.body.appendChild(addShootingStars());
    } else {
      changeModeButton.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style="display:block" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="5" fill="#FFD600"/>
          <g stroke="#FFD600" stroke-width="2" stroke-linecap="round">
            <line x1="11" y1="1.5" x2="11" y2="4"/>
            <line x1="11" y1="18" x2="11" y2="20.5"/>
            <line x1="1.5" y1="11" x2="4" y2="11"/>
            <line x1="18" y1="11" x2="20.5" y2="11"/>
            <line x1="4.22" y1="4.22" x2="5.9" y2="5.9"/>
            <line x1="16.1" y1="16.1" x2="17.78" y2="17.78"/>
            <line x1="4.22" y1="17.78" x2="5.9" y2="16.1"/>
            <line x1="16.1" y1="5.9" x2="17.78" y2="4.22"/>
          </g>
        </svg>
      `;
    }
  })();

  changeModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      changeModeButton.innerHTML = '<i class="fas fa-moon"></i>';
      
      var isSaoBang = localStorage.getItem('saobang');
      if(isSaoBang && isSaoBang === 'on') document.body.appendChild(addShootingStars());
    } else {
      changeModeButton.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style="display:block" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="5" fill="#FFD600"/>
          <g stroke="#FFD600" stroke-width="2" stroke-linecap="round">
            <line x1="11" y1="1.5" x2="11" y2="4"/>
            <line x1="11" y1="18" x2="11" y2="20.5"/>
            <line x1="1.5" y1="11" x2="4" y2="11"/>
            <line x1="18" y1="11" x2="20.5" y2="11"/>
            <line x1="4.22" y1="4.22" x2="5.9" y2="5.9"/>
            <line x1="16.1" y1="16.1" x2="17.78" y2="17.78"/>
            <line x1="4.22" y1="17.78" x2="5.9" y2="16.1"/>
            <line x1="16.1" y1="5.9" x2="17.78" y2="4.22"/>
          </g>
        </svg>
      `;
      document.querySelectorAll('.stars').forEach(e => e.remove());
    }
  });
}

function addShootingStars(){
  const newDiv = document.createElement('div');
      newDiv.className = 'stars';
  for (let i = 0; i < 30; i++) {
        const tempDiv = document.createElement('div');
        tempDiv.className = 'star';
        newDiv.appendChild(tempDiv);
      }
      return newDiv;
}