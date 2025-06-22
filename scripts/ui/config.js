export function initConfigButton() {
  const btn = document.getElementById('floating-config-btn');
  if (!btn) return;
  let isDragging = false, offsetX = 0, offsetY = 0, startX = 0, startY = 0;

  function stickToEdge(x, y) {
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    y = Math.max(0, Math.min(screenH - btnHeight, y));
    if (x + btnWidth / 2 < screenW / 2) {
      btn.style.left = '12px';
      btn.style.right = 'auto';
    } else {
      btn.style.left = 'auto';
      btn.style.right = '12px';
    }
    btn.style.top = y + 'px';
    btn.style.bottom = 'auto';
  }

  btn.addEventListener('mousedown', function(e) {
    isDragging = true;
    offsetX = e.clientX - btn.getBoundingClientRect().left;
    offsetY = e.clientY - btn.getBoundingClientRect().top;
    startX = e.clientX;
    startY = e.clientY;
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;
    x = Math.max(0, Math.min(window.innerWidth - btn.offsetWidth, x));
    y = Math.max(0, Math.min(window.innerHeight - btn.offsetHeight, y));
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    btn.style.right = 'auto';
    btn.style.bottom = 'auto';
  });
  document.addEventListener('mouseup', function(e) {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.userSelect = '';
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;
    x = Math.max(0, Math.min(window.innerWidth - btn.offsetWidth, x));
    y = Math.max(0, Math.min(window.innerHeight - btn.offsetHeight, y));
    stickToEdge(x, y);
  });

  btn.addEventListener('touchstart', function(e) {
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - btn.getBoundingClientRect().left;
    offsetY = touch.clientY - btn.getBoundingClientRect().top;
    startX = touch.clientX;
    startY = touch.clientY;
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    const touch = e.touches[0];
    let x = touch.clientX - offsetX;
    let y = touch.clientY - offsetY;
    x = Math.max(0, Math.min(window.innerWidth - btn.offsetWidth, x));
    y = Math.max(0, Math.min(window.innerHeight - btn.offsetHeight, y));
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    btn.style.right = 'auto';
    btn.style.bottom = 'auto';
  });
  document.addEventListener('touchend', function(e) {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.userSelect = '';
    let lastTouch = (e.changedTouches && e.changedTouches[0]) || {clientX: startX, clientY: startY};
    let x = lastTouch.clientX - offsetX;
    let y = lastTouch.clientY - offsetY;
    x = Math.max(0, Math.min(window.innerWidth - btn.offsetWidth, x));
    y = Math.max(0, Math.min(window.innerHeight - btn.offsetHeight, y));
    stickToEdge(x, y);
  });

  btn.addEventListener('click', function(e) {
    if (isDragging) return;
    document.getElementById('config-modal').classList.add('active');
  });

  document.getElementById('config-modal-close').onclick = function() {
    document.getElementById('config-modal').classList.remove('active');
  };
  document.getElementById('config-modal').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('active');
  });
  //load các giá trị cho bảng config từ local storage nếu chưa có thì khởi tạo tất cả là on
  let autoLichhocConfig = localStorage.getItem('autolichhoc');
  let saobangConfig = localStorage.getItem('saobang');
  let autoLichthiConfig = localStorage.getItem('autolichthi');

  if(!autoLichhocConfig) localStorage.setItem('autolichhoc', 'on');
  if(!saobangConfig) localStorage.setItem('saobang', 'on');
  if(!autoLichthiConfig) localStorage.setItem('autolichthi', 'on');

  autoLichhocConfig = localStorage.getItem('autolichhoc');
  saobangConfig = localStorage.getItem('saobang');
  autoLichthiConfig = localStorage.getItem('autolichthi');

  let autoLoad = document.querySelector(`input[name="isAuto"][value=${autoLichhocConfig}]`);
  let saobang = document.querySelector(`input[name="saobang"][value=${saobangConfig}]`);
  let autoLoadLichthi = document.querySelector(`input[name="isAutoLichThi"][value=${autoLichthiConfig}]`);

  autoLoadLichthi.checked = true;
  autoLoad.checked = true;
  saobang.checked = true;
}

export function initSaveConfigButton(){
  const btn = document.getElementById('config-save-btn');
  btn.addEventListener('click',() => {
   let isAutoSelected = document.querySelector('input[name="isAuto"]:checked');
   let saobangSelected = document.querySelector('input[name="saobang"]:checked');
   let isAutoLichThiSelected = document.querySelector('input[name="isAutoLichThi"]:checked');

   if(isAutoSelected) localStorage.setItem('autolichhoc', isAutoSelected.value);
   if(saobangSelected) localStorage.setItem('saobang', saobangSelected.value);
   if(isAutoLichThiSelected) localStorage.setItem('autolichthi', isAutoLichThiSelected.value);

   showConfigToast("Đã lưu cài đặt thành công!");
  });

  function showConfigToast(message) {
    let toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.left = '50%';
    toast.style.top = '50%';
    toast.style.transform = 'translate(-50%, -50%)';
    toast.style.background = 'linear-gradient(135deg,#21c7a8,#7c4dff)';
    toast.style.color = '#fff';
    toast.style.padding = '12px 28px';
    toast.style.borderRadius = '24px';
    toast.style.fontWeight = '600';
    toast.style.fontSize = '1rem';
    toast.style.boxShadow = '0 2px 12px rgba(33,199,168,0.13)';
    toast.style.zIndex = '99999';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '1'; }, 10);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => { toast.remove(); }, 350);
    }, 2000);
  }
}