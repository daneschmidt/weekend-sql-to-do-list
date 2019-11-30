$(document).ready(init);

console.log('js ready');

function init() {
    getTasks();
    
    $('#new-task').on('submit', getValuesFromForm,);
    $('.container').on('click', '.js-btn-delete', deleteTask);
    $('.container').on('click', '.js-btn-complete', completeTask);
}

function getValuesFromForm(event) {
    event.preventDefault();
    const newTask = {
        task: $('#js-new-task-input').val(),
        complete: "no",
        delete: $('#js-new-delete-input').val(),
    }
    postTask(newTask);
}

function postTask(newTask) {
    $.ajax({
        method: "POST",
        url: "/api/tasks",
        data: newTask
    })
    .then((response) => {
        getTasks();
        clearInputs();
    })
    .catch((err) => {
        console.warn(err);
    })
}

function getTasks() {
    $.ajax({
        method: "GET",
        url: "/api/tasks",
    })
    .then((response) => {
        render(response);
    })
    .catch((err) => {
        console.warn(err);     
    })
}

function deleteTask() {
    const idNumber = $(this).data('id');

    $.ajax({
        method: "DELETE",
        url: '/api/tasks/' + idNumber
    })
    .then((response) => {
        getTasks();
    })
    .catch((response) => {
        console.warn(response);
    })

}

function completeTask() {
    updateTask('yes', $(this).data('id'));
    console.log('you clicked the complete button', $(this).data('id'));
}

function updateTask(completedStatus, id) {
    $.ajax({
        method: 'PUT',
        url: '/api/tasks/' + id,
        data: {
            complete: completedStatus
        }
    })
        .then((response) => {
            getTasks();
        })
        .catch((err) => {
            console.warn(err);
        })
}

function clearInputs() {
    $('#js-new-task-input').val('');
}

function render(tasks) {
    $('.container').empty();
    for(let task of tasks) {
        $('.container').append(`
            <tr>
            <div>
                <td>${task.task}</td>
                <td>${task.complete}<td>
                 <td><button class="js-btn-complete completeButton" data-id="${task.id}">COMPLETE</button></td>
                 <td><button class="js-btn-delete deleteButton" data-id="${task.id}">DELETE</button><span></td>
            </div>
            </tr>
        `)
    }
}