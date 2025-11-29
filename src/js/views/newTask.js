import { Task } from "../models/Task.js";
import { notify } from "../utils.js";

document.addEventListener('DOMContentLoaded', () => {
    const nameTask = document.getElementById('taskName');
    const responsible = document.getElementById('responsible');
    const nameProject = document.getElementById('projectName');
    const description = document.getElementById('description');
    const dueDate = document.getElementById('dueDate');
    const priority = document.getElementById('priority');


    document.querySelector("#createTask").addEventListener('click', (event) => {
        event.preventDefault();
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

        let newTask = new Task(
            nameTask.value,
            responsible.value,
            nameProject.value,
            description.value,
            dueDate.value,
            priority.value
        );
        newTask.createTask();

    });
});