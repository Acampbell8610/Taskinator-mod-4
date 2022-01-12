var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl= document.querySelector("#page-content");

var taskFormHandler = function(event){

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']"). value;
    

    if(!taskNameInput || !taskTypeInput){
        alert("You need to fill out the task form!");
        return false
    }
    formEl.reset();

    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
      };
    

    //send it as an argument to creatTaskEl
    createTaskEl(taskDataObj)

};
var createTaskEl = function(tasksDataObj) {
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

// add task id as a custom atribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

//create div to hold task info abd add to list item
    var taskInfoEl= document.createElement("div");

    // create a class name
    taskInfoEl.className = "task-info";

    //add html content to div
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + tasksDataObj.name + "</h3><span class='task-type'>" + tasksDataObj.type + "</span>";
   
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    taskIdCounter++;
}

var createTaskActions = function(taskId){

    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btm edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create a delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn"
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i=0; i< statusChoices.length; i++){
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //appent select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl
    

};

var taskButtonHandler = function(event){
    // get target element from event
    var targetEl = event.target;

    //edit button was clicked
    if(targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId)
    }


    if (event.target.matches(".delete-btn")) {
       //get the elements task id
       var taskId = targetEl.getAttribute("data-task-id");
       deleteTask(taskId)
    }
}

var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var editTask = function(taskId) {
    

    // get task list item element
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// get content from task name and type
var taskName = taskSelected.querySelector("h3.task-name").textContent;
console.log(taskName);

var taskType = taskSelected.querySelector("span.task-type").textContent;
console.log(taskType);

document.querySelector("input[name='task-name']").value = taskName;
document.querySelector("select[name='task-type']").value = taskType;
document.querySelector("#save-task").textContent= "Save Task";
formEl.setAttribute("data-task-id", taskId);
  
};







formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
