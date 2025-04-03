document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('schedule-form');
    const scheduleTable = document.getElementById('schedule-table');

    loadSavedData();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const days = parseInt(document.getElementById('days').value);
        const maxLessons = parseInt(document.getElementById('max-lessons').value);
        const language = document.getElementById('language').value;

        const table = generateScheduleTable(days, maxLessons, language);

        scheduleTable.innerHTML = table;

        addCellEditListeners();

        saveFormData(days, maxLessons, language);
    });
});

function generateScheduleTable(days, maxLessons, language) {
    const daysOfWeek = {
        ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    };

    const headers = daysOfWeek[language].slice(0, days);

    let table = '<table>';
    table += '<thead><tr>';

    headers.forEach(header => {
        table += `<th>${header}</th>`;
    });
    table += '</tr></thead>';

    table += '<tbody>';

    for (let i = 0; i < maxLessons; i++) {
        table += '<tr>';
        headers.forEach((_, dayIndex) => {
            const savedData = loadCellData(dayIndex, i);
            table += `<td>${savedData || ''}</td>`;
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
            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('cell-input');
            input.value = cell.textContent;

            cell.innerHTML = '';
            cell.appendChild(input);

            input.focus();

            input.addEventListener('blur', function () {
                cell.textContent = input.value;
                saveCellData(index, input.value);
            });

            input.addEventListener('keypress', function (event) {
                if (event.key === 'Enter') {
                    cell.textContent = input.value;
                    saveCellData(index, input.value);
                }
            });
        });
    });
}

function saveFormData(days, maxLessons, language) {
    const formData = {
        days,
        maxLessons,
        language,
    };
    localStorage.setItem('formData', JSON.stringify(formData));
}

function loadFormData() {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        const { days, maxLessons, language } = JSON.parse(savedData);
        document.getElementById('days').value = days;
        document.getElementById('max-lessons').value = maxLessons;
        document.getElementById('language').value = language;
    }
}

function saveCellData(cellIndex, value) {
    localStorage.setItem(`cell_${cellIndex}`, value);
}

function loadCellData(dayIndex, lessonIndex) {
    const cellIndex = dayIndex + lessonIndex * document.getElementById('days').value;
    return localStorage.getItem(`cell_${cellIndex}`);
}

function loadSavedData() {
    loadFormData();
}