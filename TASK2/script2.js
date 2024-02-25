let editTaskIndex = -1;
document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function loadTasks() {
    const tasksContainer = document.getElementById("tasks");
    tasksContainer.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (task, index) {
        createTaskElement(task, index);
    });
}

function createTaskElement(task, index) {
    const tasksContainer = document.getElementById("tasks");

    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    if (task.completed) {
        taskElement.classList.add("completed");
    }

    const taskText = document.createElement("span");
    taskText.innerText = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function () {
        deleteTask(index);
    };

    const completeButton = document.createElement("button");
    completeButton.innerText = task.completed ? "Undo" : "Complete";
    completeButton.onclick = function () {
        toggleComplete(index);
    };

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.onclick = function () {
        editTask(index);
    };

    taskElement.appendChild(taskText);
    taskElement.appendChild(completeButton);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);

    tasksContainer.appendChild(taskElement);
}

function addTask() {
    const newTaskText = document.getElementById("new-task").value;

    if (newTaskText.trim() !== "") {
        const newTask = {
            text: newTaskText,
            completed: false
        };

        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        createTaskElement(newTask, tasks.length - 1);

        document.getElementById("new-task").value = "";
    }
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskToEdit = tasks[index];

    document.getElementById("edit-task-text").value = taskToEdit.text;
    document.getElementById("edit-task-container").style.display = "block";
    document.getElementById("new-task").style.display = "none";

    editTaskIndex = index;
}

function saveEdit() {
    const editedText = document.getElementById("edit-task-text").value;

    if (editedText.trim() !== "") {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks[editTaskIndex].text = editedText;
        localStorage.setItem("tasks", JSON.stringify(tasks));

        loadTasks();
        cancelEdit();
    }
}

function cancelEdit() {
    document.getElementById("edit-task-container").style.display = "none";
    document.getElementById("new-task").style.display = "block";

    editTaskIndex = -1;
}

function toggleComplete(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
}


