import { BDLocalStorage } from "../models/BDLocalStorage.js";
import { loading } from "../utils.js";

export class Task {
    constructor(
        nameTask = '',
        responsible = '',
        nameProject = '', 
        description = '',
        dueDate = '',
        priority = ''
    ) {
        this.nameTask = nameTask,
        this.responsible = responsible,
        this.nameProject = nameProject,
        this.description = description,
        this.dueDate = dueDate, // Data de Vencimento
        this.priority = priority,
        this.createDate = new Date(),

        this.tasks = new BDLocalStorage('tasks'),
        this.allTasks = this.tasks.getLocalStorage(),
        this.session = new BDLocalStorage('session'),
        this.getSession = this.session.getLocalStorage()
    }

    createTask() {
        const current_date = `${this.createDate.getFullYear()}-${this.createDate.getMonth()}-${this.createDate.getDate()}`;

        const newTask = {
            name_task: this.nameTask,
            createdBy: this.getSession[0].email,
            responsible: this.responsible,
            name_project: this.nameProject, 
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            status: 'Pending', // Valor padrão => (Pending);
            create_date: current_date
        }

        this.allTasks.push(newTask);
        this.tasks.setLocalStorage(this.allTasks);

        loading('../../assets/loading.gif','Criando tarefa...');
        setTimeout(() => { location.href = '../Pending/' }, 2000);
    }
}