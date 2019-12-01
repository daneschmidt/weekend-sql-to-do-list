$(document).ready(init);

console.log('js ready');

function init() {
    getTasks();
    
    $('#new-task').on('submit', getValuesFromForm);
    $('.js-task-list').on('click', '.js-btn-delete', deleteTask);
    $('.js-task-list').on('click', '.js-btn-complete', completeTask);

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
    turnGreen($(this).data('id'));
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

function turnGreen(event) {
    console.log('we should be turning green here');
    console.log(event);
    $("#toggleMeGreen").toggleClass("completeButton2");
}

function render(tasks) {
    $('.js-task-list').empty();


    const tableOfTasks = tasks;


    for(let task of tasks) {
        if(task.complete == 'yes') {
        $('.js-task-list').append(`

            <tr>
                <td align="center"><h3>${task.task}</h3></td>
                <td align="center"><h3>${task.complete}<h3><td>
                <td align="center"><button class="js-btn-complete completeButton" data-id="${task.id}">COMPLETE</button></td>
                <td align="center"><button class="js-btn-delete deleteButton" data-id="${task.id}">DELETE</button><span></td>
            </tr>
            
        `)
    }
        else {
        $('.js-task-list').append(`

        <tr>
        <td align="center"><h3>${task.task}</h3></td>
        <td align="center"><h3>${task.complete}<h3><td>
        <td align="center"><button class="js-btn-complete submitButton" data-id="${task.id}">COMPLETE</button></td>
        <td align="center"><button class="js-btn-delete deleteButton" data-id="${task.id}">DELETE</button><span></td>
        </tr>
            
        `)

        }

    }
}