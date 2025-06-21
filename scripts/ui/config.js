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

  if(!autoLichhocConfig) localStorage.setItem('autolichhoc', 'on');
  if(!saobangConfig) localStorage.setItem('saobang', 'on');
  

  autoLichhocConfig = localStorage.getItem('autolichhoc');
  saobangConfig = localStorage.getItem('saobang');

  let autoLoad = document.querySelector(`input[name="isAuto"][value=${autoLichhocConfig}]`);
  let saobang = document.querySelector(`input[name="saobang"][value=${saobangConfig}]`);
  autoLoad.checked = true;
  saobang.checked = true;
}

export function initSaveConfigButton(){
  const btn = document.getElementById('config-save-btn');
  btn.addEventListener('click',() => {
   let isAutoSelected = document.querySelector('input[name="isAuto"]:checked');
   let saobangSelected = document.querySelector('input[name="saobang"]:checked');
   if(isAutoSelected) localStorage.setItem('autolichhoc', isAutoSelected.value);
   if(saobangSelected) localStorage.setItem('saobang', saobangSelected.value);
   alert("Đã lưu cài đặt");
  });
}