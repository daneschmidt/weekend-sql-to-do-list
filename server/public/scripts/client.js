$(document).ready(init);

console.log('js ready');

function init() {
    getTasks();

    $('#new-task').on('submit', getValuesFromForm);
    $('.container').on('click', '.js-btn-delete', deleteTask);
}

function getValuesFromForm(event) {
    event.preventDefault();
    const newTask = {
        task: $('#js-new-task-input').val(),
        complete: $('#js-new-complete-input').val(),
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

function render(tasks) {
    $('.container').empty();
    for(let task of tasks) {
        $('.container').append(`
            <div>
                <p>${task.task} - <span><button class="js-btn-complete" data-id="${task.id}">COMPLETE</button><button class="js-btn-delete" data-id="${task.id}">DELETE</button></p>
            </div>
        `)
    }
}