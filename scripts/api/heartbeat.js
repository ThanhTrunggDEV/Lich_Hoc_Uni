export function sendHeartBeat() {
  let clientId = localStorage.getItem("client_id");
  if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem("client_id", clientId);
  }
  fetch('https://api.nguyenthanhtrung.online/heartbeat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: clientId })
  });
}
