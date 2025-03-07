function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    const sidebar = document.querySelector('.sidebar');
    if (sectionId === 'products') {
        sidebar.style.display = 'block';
    } else {
        sidebar.style.display = 'none';
    }
}

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        showSection(sectionId);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    showSection('products');
});

(function () {
    window.addEventListener('load', function () {
        setTimeout(function () {
            const loadStatsElement = document.getElementById('load-stats');

            const [navigationEntry] = performance.getEntriesByType('navigation');

            if (navigationEntry) {
                const isDataValid =
                    navigationEntry.duration > 0 &&
                    navigationEntry.domContentLoadedEventEnd > 0 &&
                    navigationEntry.loadEventEnd > 0;

                if (isDataValid) {
                    const loadTime = navigationEntry.duration.toFixed(2);

                    const domLoadTime = (navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime).toFixed(2);

                    const resourcesLoadTime = (navigationEntry.loadEventEnd - navigationEntry.domContentLoadedEventEnd).toFixed(2);

                    const statsText = `
            Время загрузки страницы: ${loadTime} мс
          `;

                    loadStatsElement.textContent = `${statsText}`;
                }
            }
        }, 100);
    });
})();

(function () {
    function setActiveMenuItem() {
        const currentPath = document.location.pathname;

        console.log('Текущий путь:', currentPath);

        const menuItems = document.querySelectorAll('.nav__link');

        menuItems.forEach(item => {
            let itemPath = new URL(item.href, document.location.origin).pathname;

            // Убедимся, что путь начинается с "/"
            if (!itemPath.startsWith('/')) {
                itemPath = '/' + itemPath;
            }

            if (itemPath === currentPath) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    document.addEventListener('DOMContentLoaded', setActiveMenuItem);
})();

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        Swal.fire({
            title: 'Поздравляем! 🎉',
            text: 'Вы миллионный посетитель сайта! Заберите выигрыш тут - naeblohov.com',
            icon: 'success',
            confirmButtonText: 'Забрать выигрыш',
            confirmButtonColor: '#df8d16',
        });
    }, 5000);
});