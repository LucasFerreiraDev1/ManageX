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
        let idTask = this.allTasks.length > 0 ? this.allTasks.at(-1).id + 1 : 1;
        let newTask = {
            id: idTask,
            nameTask: this.nameTask,
            createdBy: this.getSession[0].email,
            responsible: this.responsible,
            nameProject: this.nameProject, 
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            status: 'pending',
            create_date: `${this.createDate.getFullYear()}-${this.createDate.getMonth()}-${this.createDate.getDate()}`
        };

        this.allTasks.push(newTask);
        this.tasks.setLocalStorage(this.allTasks);

        loading('../../assets/loading.gif','Criando tarefa...');
        setTimeout(() => { location.href = '../Pending/' }, 2000);
    }

    loadTasks(status) {
        let listTasks = [];
        for(let task of this.allTasks) {
            if(task.status === status && task.createdBy === this.getSession[0].email) {
                listTasks.push(task);
            }
        }

        if(listTasks.length > 0) {
            return listTasks;
        } else {
            switch(status) {
                case 'pending':
                    return 'Não há tarefas pendentes';
                    break;
                case 'teste':
                    console.log('teste funcionando!');
                    break;
                case 'completed':
                    return 'Não há tarefas concluídas';
                    break;
            }
        }
    }

    // updateTask(id) {
    //     console.log(id)
    // }

    // duplicateTask(id) {
    //     console.log(id)
    // }

    deleteTask(id) {
        this.allTasks = this.allTasks.filter(task => task.id !== Number(id));
        this.tasks.setLocalStorage(this.allTasks);
        loading('../../assets/loading.gif','Deletando tarefa...');
        setTimeout(() => { location.reload() }, 1300);
    }
}