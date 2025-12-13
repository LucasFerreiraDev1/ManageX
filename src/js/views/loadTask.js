import { Task } from "../models/Task.js";

let task = new Task();
export function loadTask(typeTask) {
    let allTasks = task.loadTasks(typeTask);
    const board = document.getElementById('board');    
    board.innerHTML = '';
    if(Array.isArray(allTasks)) {
        allTasks.forEach( task => {
            const priorityMap = {
                'Baixa': 'low',
                "Média": 'medium',
                "Alta": 'high'
            }
            const classPriority = priorityMap[task.priority] || 'low';
            board.innerHTML += 
            `
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
                                <button class="action-btn edit">
                                    <i class="fas fa-edit"></i>
                                    Editar
                                </button>
                                <button class="action-btn duplicate">
                                    <i class="fas fa-copy"></i>
                                    Duplicar
                                </button>
                                <button class="action-btn delete">
                                    <i class="fas fa-trash"></i>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            `; 
        });
    } else {
        board.innerHTML = `<h2 style="text-align: center;">${allTasks}</h2>`
    }
}