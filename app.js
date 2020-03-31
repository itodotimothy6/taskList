// Declare vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector('#filter');

// Event Listeners
(function () {
    document.addEventListener("DOMContentLoaded", loadTaskListFromStorage);
    form.addEventListener("submit", addTasks);
    clearBtn.addEventListener("click", clearTasks);
    filter.addEventListener("keyup", filterTasks);
    taskList.addEventListener("click", deleteTasks);
})();

function addTasks(e) {
    e.preventDefault();

    if (taskInput.value === '') {
        alert('Add a task');
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    
    li.appendChild(link);
    taskList.appendChild(li);

    // Add to local storage
    let tasks = [];
    if (localStorage.getItem("tasks") !== null) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(taskInput.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
}

function deleteTasks(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        taskList.removeChild(e.target.parentElement.parentElement);
        
        // Delete from local storage
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach(function(task, index) {
            if(task == e.target.parentElement.parentElement.innerText) {
                tasks.splice(index, 1);
            }
        });
        if(tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        } else {
            localStorage.removeItem("tasks");
        }
    }
}

function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from local storage
    localStorage.removeItem("tasks");
}

function filterTasks() {
    const filterText = filter.value.toLowerCase();

    taskList.childNodes.forEach(function(li) {
        if (li.innerText.toLowerCase().indexOf(filterText) != -1) {
            li.style.display = "block";
        } else {
            li.style.display = "none";
        }
    });
}

function loadTaskListFromStorage() {

    if(localStorage.getItem("tasks") !== null) {
        let tasks = JSON.parse(localStorage.getItem("tasks"));

        tasks.forEach(function(task) {
            // Create li element
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.appendChild(document.createTextNode(task));
            
            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove"></i>';
            
            li.appendChild(link);
            taskList.appendChild(li);
        });
    }
}