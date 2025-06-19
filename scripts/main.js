import { checkAuth } from './core/auth.js';
import { sendHeartBeat } from './core/heartbeat.js';
import { updateOnlineUsers } from './core/online.js';

import { fetchAndShowQuote } from './api/quote.js';
import { renderFullTimetable } from './api/timetable.js';

import { showGreeting } from './ui/greeting.js';
import { initDarkMode } from './ui/darkmode.js';
import { initDonateModal } from './ui/donateModal.js';
import { setupTabs } from './ui/tabs.js';
import { setupLogout } from './ui/logout.js';
import { setupRefresh } from './ui/refresh.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!checkAuth()) return;
  showGreeting();
  fetchAndShowQuote();
  renderFullTimetable();
  initDonateModal();
  initDarkMode(document.getElementById('change-mode-button'));
  setupTabs();
  setupLogout();
  setupRefresh(false);
  sendHeartBeat();
  updateOnlineUsers();
  setInterval(updateOnlineUsers, 10000);
  setInterval(sendHeartBeat, 60000);
});
