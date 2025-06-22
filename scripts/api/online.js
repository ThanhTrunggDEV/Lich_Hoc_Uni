export function updateOnlineUsers() {
  fetch('https://api.nguyenthanhtrung.online/online-users')
    .then(res => res.json())
    .then(data => {
      const text = `Đang online: ${data.online_users}`;
      const headerCount = document.getElementById('online-count');
      if (headerCount) headerCount.innerText = text;
      const floatingCount = document.getElementById('online-count-floating');
      if (floatingCount) floatingCount.innerText = text;
    })
    .catch(err => {
      const floatingCount = document.getElementById('online-count-floating');
      if (floatingCount) floatingCount.innerText = 'Đang online: ...';
      console.error("Lỗi khi lấy số lượng online:", err);
    });
}
