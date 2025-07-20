import { checkAuth } from './core/auth.js';
import { sendHeartBeat } from './api/heartbeat.js';

import { updateOnlineUsers } from './api/online.js';
import { fetchAndShowQuote } from './api/quote.js';
import { renderFullTimetable, renderTimeTableFromCache } from './api/timetable.js';

import { showGreeting } from './ui/greeting.js';
import { initDarkMode } from './ui/darkmode.js';
import { initDonateModal } from './ui/donateModal.js';
import { setupTabs } from './ui/tabs.js';
import { setupLogout } from './ui/logout.js';
import { setupRefresh } from './ui/refresh.js';
import { initConfigButton } from './ui/config.js';
import { initSaveConfigButton } from './ui/config.js';
import { showToast } from './ui/showmessage.js';
document.addEventListener('DOMContentLoaded', () => {
  if (!checkAuth()) return;
  showGreeting();
  fetchAndShowQuote();
  initConfigButton();
  initSaveConfigButton();
  const autoLoad = localStorage.getItem('autolichhoc');
  if(autoLoad && autoLoad == 'off'){
    renderTimeTableFromCache();
    showToast("Chế độ tự động đồng bộ lịch học đang tắt!!!");
  }
  else
    renderFullTimetable();
  
  initDonateModal();
  initDarkMode();
  setupTabs();
  setupLogout();
  setupRefresh();
  sendHeartBeat();
  updateOnlineUsers();
  setInterval(updateOnlineUsers, 10000);
  setInterval(sendHeartBeat, 60000);
  
});
