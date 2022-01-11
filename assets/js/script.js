var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");



var taskFormHandler = function(event){

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']"). value;
    
    //package up data as an object
    var tasksDataObj = {
        name: taskNameInput,
        type: taskTypeInput

    };
    //send it as an argument to creatTaskEl
    createTaskEl(tasksDataObj)

};
var createTaskEl = function(tasksDataObj) {
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

//create div to hold task info abd add to list item
    var taskInfoEl= document.createElement("div");

    // create a class name
    taskInfoEl.className = "task-info";

    //add html content to div
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + tasksDataObj.name + "</h3><span class='task-type'>" + tasksDataObj.type + "</span>";
   
    listItemEl.appendChild(taskInfoEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);
