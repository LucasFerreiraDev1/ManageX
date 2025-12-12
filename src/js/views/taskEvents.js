import { Task } from "../models/Task.js";
document.addEventListener('DOMContentLoaded', () => {
    const task = new Task();
    const board = document.getElementById('board');

    board.addEventListener('click', e => {
        // if(e.target.closest('.edit')) {
        //     const taskData = getTaskFromEvent(e);
        //     if(taskData) {
        //         task.updateTask(taskData.id);
        //     }
        // }

        // if(e.target.closest('.duplicate')) {
        //     const taskData = getTaskFromEvent(e);
        //     if(taskData) {
        //         task.duplicateTask(taskData.id);
        //     }
        // }

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
});

