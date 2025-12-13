import { Task } from "../models/Task.js";
import { notify } from "../utils.js";

document.addEventListener('DOMContentLoaded', () => {
    const task = new Task();
    const board = document.getElementById('board');
    let id = null;

    board.addEventListener('click', e => {
        if(e.target.closest('.edit')) {
            const taskData = getTaskFromEvent(e);
            if(taskData) {
                openEditModal(task.updateTask(taskData.id));
                id = taskData.id;   
            }
        }

        if(e.target.closest('.duplicate')) {
            const taskData = getTaskFromEvent(e);
            if(taskData) {
                task.duplicateTask(taskData.id);
            }
        }

        if(e.target.closest('.delete')) {
            const taskData = getTaskFromEvent(e);
            if(taskData) {
                task.deleteTask(taskData.id);
            }
        }
    });

    function getTaskFromEvent(e) {
        const cardTask = e.target.closest('.task');
        if(!cardTask) return null;
        return {
            element: cardTask, 
            id: Number(cardTask.dataset.taskId)
        };
    }

    async function getHtml() {
        try {
            const response = await fetch('../Newtask/editTask.html');            
            if(!response.ok) {
                throw new Error(`[status: ${response.status}] - Erro ao realizar a requisição. Tente novamente em instantes.`);
            }
            return await response.text();
        } catch(error) {
            console.error(error);
        }
    }

    async function openEditModal(taskData) {
        const isObject = typeof taskData === 'object';
        if(!taskData && !isObject) {
            console.error("[status: 404] - Erro ao processar a solicitação: os dados da tarefa não foram localizados.");
            notify('Atenção!', 'Não foi possível abrir o modal de edição. Tente novamente.', 'error');
            return;
        }
        document.body.insertAdjacentHTML('beforeend', await getHtml());
        populateEditForm(taskData);
    }

    function populateEditForm(taskData) {
        document.querySelector("#taskName").value = taskData.nameTask || '';
        document.querySelector("#responsible").value = taskData.responsible || '';
        document.querySelector("#projectName").value = taskData.nameProject || '';
        document.querySelector("#description").value = taskData.description || '';
        document.querySelector("#dueDate").value = taskData.dueDate || '';
        document.querySelector("#priority").value = taskData.priority || 'Baixa';
    }

    document.addEventListener('click', (event) => {
        if(event.target.id === 'updateTask' || event.target.closest('#updateTask')) {
            event.preventDefault();
            const nameTask = document.getElementById('taskName');
            const responsible = document.getElementById('responsible');
            const nameProject = document.getElementById('projectName');
            const description = document.getElementById('description');
            const dueDate = document.getElementById('dueDate');
            const priority = document.getElementById('priority');
            const fields = [
                { element: nameTask, Label: "Nome da Tarefa" },
                { element: responsible, Label: "Responsável" },
                { element: nameProject, Label: "Nome do Projeto" },
                { element: description, Label: "Descrição" },
                { element: dueDate, Label: "Data de Vencimento" },
                { element: priority, Label: "Prioridade" }
            ];

            for (let field of fields) {
                if (field.element.value.length > 0) {
                    field.element.style.borderColor = "#6be3a6";
                }

                if(field.element.value.trim() === '') {
                    notify('Atenção!', `Por favor, preencha o campo ${field.label}!`, 'warning');
                    field.element.style.borderColor = "red";
                    return;
                }
            }

            let newTask = {
                nameTask: nameTask.value,
                responsible: responsible.value,
                nameProject: nameProject.value,
                description: description.value,
                dueDate: dueDate.value,
                priority: priority.value
            };
            task.editTask(id, newTask);
        }

        if(event.target.id === 'cancelTask' || event.target.closest('#cancelTask')){
            const modalEdit = document.getElementById('editTaskModal');
            if(modalEdit) {
                modalEdit.remove();
            }
        }
    });
    
});