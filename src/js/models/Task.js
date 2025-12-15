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
        setTimeout(() => { location.href = '../Pending/' }, 1300);
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
                case 'completed':
                    return 'Não há tarefas concluídas';
            }
        }
    }

    updateTask(id) {
        for(let task of this.allTasks) {
            if(task.id === Number(id)) {
                return task;
            }
        }
    }

    editTask(id, newTask) {
        for(let task of this.allTasks) {
            if(id === task.id) {
                task.nameTask = newTask.nameTask;
                task.responsible = newTask.responsible;
                task.nameProject = newTask.nameProject;
                task.description = newTask.description;
                task.dueDate = newTask.dueDate;
                task.priority = newTask.priority;
            }
        }
        this.tasks.setLocalStorage(this.allTasks);
        reloadPage('Atualizando tarefa...', 1300);
    }

    duplicateTask(id) {
        const taskDuplicate = this.allTasks.find(task => task.id === id);
        if(!taskDuplicate) {
            console.error('Tarefa não encontrada!');
            return;
        }
        const duplicate = { ...taskDuplicate, id: this.allTasks.at(-1).id + 1, status: 'pending' };
        this.allTasks.push(duplicate);
        this.tasks.setLocalStorage(this.allTasks);
        reloadPage('Duplicando tarefa...', 1000);
    }

    deleteTask(id) {
        this.allTasks = this.allTasks.filter(task => task.id !== Number(id));
        this.tasks.setLocalStorage(this.allTasks);
        reloadPage('Deletando tarefa...', 1300);
    }

    filterTasks(search) {
        if(!search || search.trim() === '') {
            return;
        }
        if(this.allTasks.length === 0) {
            console.log("Nenhuma tarefa encontrada!");
            return;
        }
        const searchLower = search.toLowerCase().trim();
        const filteredTasks = this.allTasks.filter(task => {
            if(task.createdBy == this.getSession[0].email) {
                const matchName = task.nameTask?.toLowerCase().includes(searchLower);
                const matchProject = task.nameProject?.toLowerCase().includes(searchLower);
                const matchResponsible = task.responsible?.toLowerCase().includes(searchLower);
                const matchDescription = task.description?.toLowerCase().includes(searchLower);

                return matchName || matchProject || matchResponsible || matchDescription;
            }
        });
        
        return { filteredTasks: filteredTasks, search: search };
    }
}

function reloadPage(desc, time) {
    loading('../../assets/loading.gif', desc);
    setTimeout(() => { location.reload() }, time);
}