
document.getElementById('sendButton').addEventListener('click', function(){
    const message = document.getElementById('messageBox').value;
    const chat_id = "-4692727901";

    if(!message) {
        alert("Vui Lòng Nhập Lại");
        return;
    }
    fetch('https://api.telegram.org/bot7675892682:AAEomDtFtdrUWDpIXyNt6HWHeRawikfCCpk/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'chat_id': chat_id, 'text': message })
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .finally(alert("Gửi Thành Công!!!"));
    document.getElementById('messageBox').value = "";


});

document.getElementById('btnTest').addEventListener('click', function(){
    document.getElementById('btnTest');
});