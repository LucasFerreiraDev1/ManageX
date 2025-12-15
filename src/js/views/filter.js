import { Task } from "../models/Task.js";

document.addEventListener('DOMContentLoaded', () => {
    const task = new Task();
    if (document.getElementById('filterTask')) {
        document.getElementById('filterTask').addEventListener('click', () => {
            const search = document.getElementById('searchInput').value;
            const filteredTasks = task.filterTasks(search);
            if(filteredTasks) {
                renderFilteredTasks(filteredTasks.filteredTasks, filteredTasks.search);
            }
        });
    }

    if (document.getElementById('searchInput')) {
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const search = e.target.value;
                const filteredTasks = task.filterTasks(search);
                renderFilteredTasks(filteredTasks.filteredTasks, filteredTasks.search);
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (e.target.id === 'clearSearch' || e.target.closest('#clearSearch')) {
            clearSearch();
        }
    });
});

function renderFilteredTasks(filteredTasks, search) {
    const board = document.getElementById('board');
    board.innerHTML = "";
    if(filteredTasks.length === 0) {
        board.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h2>😕 Nenhuma tarefa encontrada</h2>
                <p>Nenhum resultado para "<strong>${search}</strong>"</p>
                <button class="btn" id="clearSearch" style="margin-top: 5px;">Limpar busca</button>
            </div>
        `;
        return;
    }

    filteredTasks.forEach(task => {
        const priorityMap = {
            "Baixa": "low",
            "Média": "medium",
            "Alta": "high"
        };
        const classPriority = priorityMap[task.priority] || "low";

        board.innerHTML += `
            <article class="task" data-task-id="${task.id}">
                <div class="task-header">
                    <div class="title">${task.nameTask}</div>
                    <div class='priority-badge ${classPriority}'>${task.priority}</div>
                </div>

                <div class="description">${task.description}</div>

                <div class="meta">
                    <div class="meta-item">
                        <i class="fas fa-user"></i>
                        <span>${task.responsible}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>${task.dueDate}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-tag"></i>
                        <span>${task.nameProject}</span>
                    </div>

                    <button class="show-options" aria-label="Mostrar opções">
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>
                </div>

                <div class="options">
                    <div class="options-content">
                        <div class="status-section">
                            <label>Alterar Status:</label>
                            <select name="status" class="status-select ${task.status}">
                                <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>🕒 Pendente</option>
                                <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>✅ Concluída</option>
                            </select>
                        </div>

                        <div class="action-buttons">
                            <button class="action-btn edit" data-id="${task.id}">
                                <i class="fas fa-edit"></i>
                                Editar
                            </button>
                            <button class="action-btn duplicate" data-id="${task.id}">
                                <i class="fas fa-copy"></i>
                                Duplicar
                            </button>
                            <button class="action-btn delete" data-id="${task.id}">
                                <i class="fas fa-trash"></i>
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `;
    });

    board.insertAdjacentHTML('afterbegin', `
        <div style="padding: 20px; background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent); border-radius: 8px; margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, 0.05);">
            <p>
                <strong>${filteredTasks.length}</strong> tarefa(s) encontrada(s) para "<strong>${search}</strong>"
                <button id="clearSearch" class="btn" style="margin-left: 10px;">Limpar busca</button>
            </p>
        </div>
    `);
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    location.reload();
}