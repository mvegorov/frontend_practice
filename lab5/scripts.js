document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('schedule-form');
    const scheduleTable = document.getElementById('schedule-table');

    // Загружаем сохранённые данные при загрузке страницы
    loadSavedData();

    // Обработчик отправки формы
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Отменяем стандартное поведение формы

        // Получаем данные из формы
        const days = parseInt(document.getElementById('days').value);
        const maxLessons = parseInt(document.getElementById('max-lessons').value);
        const language = document.getElementById('language').value;

        // Генерируем таблицу
        const table = generateScheduleTable(days, maxLessons, language);

        // Отображаем таблицу на странице
        scheduleTable.innerHTML = table;

        // Добавляем обработчики для редактирования ячеек
        addCellEditListeners();

        // Сохраняем параметры формы в LocalStorage
        saveFormData(days, maxLessons, language);
    });
});

function generateScheduleTable(days, maxLessons, language) {
    // Определяем заголовки для дней недели
    const daysOfWeek = {
        ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    };

    // Выбираем заголовки в зависимости от языка
    const headers = daysOfWeek[language].slice(0, days);

    // Создаём таблицу
    let table = '<table>';
    table += '<thead><tr>';

    // Добавляем заголовки
    headers.forEach(header => {
        table += `<th>${header}</th>`;
    });
    table += '</tr></thead>';

    table += '<tbody>';

    // Добавляем пустые строки с занятиями
    for (let i = 0; i < maxLessons; i++) {
        table += '<tr>';
        headers.forEach((_, dayIndex) => {
            // Загружаем сохранённые данные для ячейки
            const savedData = loadCellData(dayIndex, i);
            table += `<td>${savedData || ''}</td>`; // Пустые ячейки или сохранённые данные
        });
        table += '</tr>';
    }

    table += '</tbody></table>';

    return table;
}

function addCellEditListeners() {
    const cells = document.querySelectorAll('#schedule-table td');

    cells.forEach((cell, index) => {
        cell.addEventListener('click', function () {
            // Создаём текстовое поле для редактирования
            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('cell-input');
            input.value = cell.textContent; // Устанавливаем текущее значение ячейки

            // Заменяем содержимое ячейки на текстовое поле
            cell.innerHTML = '';
            cell.appendChild(input);

            // Фокус на текстовое поле
            input.focus();

            // Сохраняем значение при потере фокуса
            input.addEventListener('blur', function () {
                cell.textContent = input.value;
                saveCellData(index, input.value); // Сохраняем данные ячейки
            });

            // Сохраняем значение при нажатии Enter
            input.addEventListener('keypress', function (event) {
                if (event.key === 'Enter') {
                    cell.textContent = input.value;
                    saveCellData(index, input.value); // Сохраняем данные ячейки
                }
            });
        });
    });
}

// Сохраняем параметры формы в LocalStorage
function saveFormData(days, maxLessons, language) {
    const formData = {
        days,
        maxLessons,
        language,
    };
    localStorage.setItem('formData', JSON.stringify(formData));
}

// Загружаем параметры формы из LocalStorage
function loadFormData() {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        const { days, maxLessons, language } = JSON.parse(savedData);
        document.getElementById('days').value = days;
        document.getElementById('max-lessons').value = maxLessons;
        document.getElementById('language').value = language;
    }
}

// Сохраняем данные ячейки в LocalStorage
function saveCellData(cellIndex, value) {
    localStorage.setItem(`cell_${cellIndex}`, value);
}

// Загружаем данные ячейки из LocalStorage
function loadCellData(dayIndex, lessonIndex) {
    const cellIndex = dayIndex + lessonIndex * document.getElementById('days').value;
    return localStorage.getItem(`cell_${cellIndex}`);
}

// Загружаем сохранённые данные при загрузке страницы
function loadSavedData() {
    loadFormData(); // Загружаем параметры формы
}