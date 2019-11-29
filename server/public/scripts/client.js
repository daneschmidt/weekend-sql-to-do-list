$(document).ready(init);

console.log('js ready');

function init() {
    getTasks();

    $('#new-task').on('submit', getValuesFromForm);
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


function render(tasks) {
    $('.container').empty();
    for(let task of tasks) {
        $('.container').append(`
            <div>
                <p>${task.task} - ${task.complete} - ${task.delete}</p>
            </div>
        `)
    }
}