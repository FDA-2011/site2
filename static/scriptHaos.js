// Игровые переменные
let money = 10000;
let income = 0;
let month = 1;
let assets = [];

// DOM элементы
const moneyEl = document.getElementById('money');
const incomeEl = document.getElementById('income');
const monthEl = document.getElementById('month');
const assetsEl = document.getElementById('assets');
const eventLogEl = document.getElementById('event-log');

// Покупка бизнеса
function buyBusiness(name, cost, monthlyIncome) {
    if (money >= cost) {
        money -= cost;
        income += monthlyIncome;
        assets.push({ name, monthlyIncome });
        updateAssets();
        addLog(`✅ Куплен ${name}! Доход +${monthlyIncome} ₽/мес`);
        updateStats();
    } else {
        addLog(`❌ Недостаточно денег для ${name}!`);
    }
}

// Покупка криптовалюты (рискованно!)
function buyCrypto() {
    const cost = 3000;
    if (money >= cost) {
        money -= cost;
        addLog("🪙 Куплена криптовалюта... Ждём результата.");
        
        // Случайный исход (50/50)
        setTimeout(() => {
            if (Math.random() > 0.5) {
                const profit = cost * 2;
                money += profit;
                addLog(`🎉 Крипта выросла 2x! +${profit} ₽`);
            } else {
                addLog(`💸 Крипта упала... Потеряли ${cost} ₽`);
            }
            updateStats();
        }, 500);
    } else {
        addLog(`❌ Нужно минимум ${cost} ₽ для крипты!`);
    }
}

// Следующий месяц
function nextMonth() {
    money += income;
    month++;
    
    // Случайные события
    if (Math.random() < 0.3) {
        triggerRandomEvent();
    }
    
    updateStats();
    checkGameOver();
}

// Случайные события
function triggerRandomEvent() {
    const events = [
        { text: "📉 Кризис! Все активы приносят на 20% меньше.", effect: () => { income = Math.floor(income * 0.8); } },
        { text: "📈 Экономический рост! Доход +30%.", effect: () => { income = Math.floor(income * 1.3); } },
        { text: "🔥 Пожар на заводе! Потеряли один актив.", effect: () => { 
            if (assets.length > 0) {
                const lostAsset = assets.pop();
                income -= lostAsset.monthlyIncome;
                addLog(`🔥 Потерян ${lostAsset.name}! Доход -${lostAsset.monthlyIncome} ₽`);
            }
        }},
        { text: "🎁 Нашли инвестора! +5000 ₽.", effect: () => { money += 5000; } }
    ];
    
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    randomEvent.effect();
    addLog(randomEvent.text);
}

// Обновление статистики
function updateStats() {
    moneyEl.textContent = money;
    incomeEl.textContent = income;
    monthEl.textContent = month;
}

// Обновление списка активов
function updateAssets() {
    assetsEl.innerHTML = assets.length === 0 
        ? "<p>У вас пока нет активов.</p>" 
        : assets.map(asset => `
            <div class="asset">
                ${asset.name} (+${asset.monthlyIncome} ₽/мес)
            </div>
        `).join('');
}

// Добавление сообщения в лог
function addLog(message) {
    const logEntry = document.createElement('p');
    logEntry.textContent = `Месяц ${month}: ${message}`;
    eventLogEl.appendChild(logEntry);
    eventLogEl.scrollTop = eventLogEl.scrollHeight;
}

// Проверка конца игры
function checkGameOver() {
    if (money <= 0) {
        addLog("💸 БАНКРОТСТВО! Игра окончена.");
        document.querySelector('.next-btn').disabled = true;
    } else if (money >= 100000) {
        addLog("🎉 ПОБЕДА! Вы стали финансовым магнатом!");
        document.querySelector('.next-btn').disabled = true;
    }
}

// Инициализация
updateStats();
updateAssets();