$(document).ready(init);

console.log('js ready');

function init() {
    getTasks();
}

function getTasks(){
    $.ajax({
        method: "GET",
        url: "/api/tasks"
    })
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.warn(err);     
    })

}