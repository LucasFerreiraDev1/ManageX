
document.addEventListener('DOMContentLoaded', function() {
    // TOGGLE SIDEBAR
  const sidebarToggle = document.querySelector('.sidebar-toggle'); // Botão menu
    const sidebar = document.querySelector('.sidebar'); // Sidebar
    const overlay = document.getElementById('overlay');
    const filtersToggle = document.querySelector('.filters-toggle'); // Botão filter
    const filters = document.querySelector('.filters');

    sidebarToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
    });

    filtersToggle?.addEventListener('click', () => {
        filters.classList.toggle('show');
        overlay.classList.toggle('show');
    });

    overlay?.addEventListener('click', () => {
        sidebar.classList.remove('show');
        filters.classList.remove('show');
        overlay.classList.remove('show');
    });
    
    // TOGGLE DE OPÇÕES DAS TAREFAS
    function closeAllOptions() {
        const allOptions = document.querySelectorAll('.options');
        const allButtons = document.querySelectorAll('.show-options');

        allOptions.forEach(option => {
            option.classList.remove('show');
        });

        allButtons.forEach(button => {
            button.classList.remove('active');
        });
    }

    const showOptionsButtons = document.querySelectorAll('.show-options');
    showOptionsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();

            const task = button.closest('.task');
            if (!task) return;

            const options = task.querySelector('.options');
            const isActive = button.classList.contains('active');
            closeAllOptions();

            if (!isActive) {
                options.classList.add('show');
                button.classList.add('active');
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.task')) {
            closeAllOptions();
        }
    });
});
