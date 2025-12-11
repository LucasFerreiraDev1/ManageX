

document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');

    board.addEventListener('click', e => {
        if(e.target.closest('.edit')) {
            const cardTask = e.target.closest('.task');
            const taskID = cardTask.dataset.taskId;
            console.log(taskID);
        }
    });
});
