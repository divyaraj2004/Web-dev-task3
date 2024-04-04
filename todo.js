
var todolistArray=[];

var localData = localStorage.getItem("todolistArray");
if (localData !== null) {
    todolistArray = JSON.parse(localData);
    renderTask();
    
}



function saveTask(){
    var taskName= document.getElementById("txtItem").value;
    var priority = document.getElementById("priority").value; // Get selected priority
    var todoObj={
        taskId: todolistArray.length+1,
        taskName:taskName,
        priority: priority // Save priority with task

    };
    todolistArray.push(todoObj);
    localStorage.setItem("todolistArray", JSON.stringify(todolistArray));  
    renderTask();
}


function renderTask() {

    document.getElementById("task-box").innerHTML="";

    for (var index = 0; index < todolistArray.length; index++) {
        var dynamicli = document.createElement("li");
    dynamicli.classList.add("tasks");
    var mylabel= document.createElement("label");
    var myPara= document.createElement("p");  
    myPara.textContent = todolistArray[index].taskName + " - Priority: " + todolistArray[index].priority; // Display priority
    mylabel.appendChild(myPara);
    dynamicli.appendChild(mylabel);

    document.getElementById("task-box").appendChild(dynamicli);


    var mydiv = document.createElement("div");
    mydiv.classList.add("svg");
    var editIcon= document.createElement("i");
    editIcon.classList.add("fa-solid");
    editIcon.classList.add("fa-pen-to-square");
    editIcon.addEventListener("click",editTask);
    editIcon.taskId=todolistArray[index].taskId;


    var deleteIcon= document.createElement("i");
    deleteIcon.classList.add("fa-solid");
    deleteIcon.classList.add("fa-trash");
    deleteIcon.addEventListener("click",deleteTask);
    deleteIcon.taskId=todolistArray[index].taskId;

    mydiv.appendChild(editIcon);
    mydiv.appendChild(deleteIcon);
    dynamicli.appendChild(mydiv);


    }
    
    function deleteTask(){
        var index = todolistArray.findIndex(m=>m.taskId == event.target.taskId);
        todolistArray.splice(index,1);
        renderTask();
    }
    function editTask(){
        
        var obj = todolistArray.find(m=>m.taskId == event.target.taskId);
        document.getElementById("txtItem").value= obj.taskName;
        deleteTask();




    }

   
    
}
function deleteAll(){
    todolistArray.splice(0)
    renderTask(); 
}