const API_URL = "/tasks";


// Fetch all tasks
async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    renderTasks(tasks);
    updateProgress(tasks);
}


// Add new task
async function addTask() {
    const input = document.getElementById("taskInput");
    const title = input.value.trim();

    if (!title) return;

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    });

    input.value = "";
    fetchTasks();
}


// Toggle task completion
async function toggleTask(taskId) {
    await fetch(`${API_URL}/${taskId}`, {
        method: "PUT"
    });

    fetchTasks();
}


// Delete task
async function deleteTask(taskId) {
    await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE"
    });

    fetchTasks();
}


// Render tasks
function renderTasks(tasks) {

    const taskList = document.getElementById("taskList");
    const emptyState = document.getElementById("emptyState");

    taskList.innerHTML = "";

    // Empty state handling
    if (tasks.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }

    tasks.forEach(task => {

        const priorityColor = {
            High: "bg-red-100 text-red-700",
            Medium: "bg-yellow-100 text-yellow-700",
            Low: "bg-green-100 text-green-700"
        };

        const categoryColor = {
            Work: "bg-blue-100 text-blue-700",
            Learning: "bg-purple-100 text-purple-700",
            Personal: "bg-pink-100 text-pink-700",
            General: "bg-gray-100 text-gray-700"
        };

        const taskCard = document.createElement("div");

        taskCard.className = `
            flex items-center justify-between
            bg-white border border-gray-100
            rounded-2xl p-4 shadow-md
            hover:shadow-xl hover:-translate-y-1
            transition-all duration-300
        `;

        taskCard.innerHTML = `
            <div class="flex items-center gap-3">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})"
                    class="w-5 h-5 cursor-pointer"
                >

                <div>
                    <p class="font-medium ${
                        task.completed
                            ? 'line-through text-gray-400'
                            : 'text-gray-800'
                    }">
                        ${task.title}
                    </p>

                    <div class="flex gap-2 mt-1">

                        <span class="text-xs px-2 py-1 rounded-full ${priorityColor[task.priority]}">
                            ${task.priority} Priority
                        </span>

                        <span class="text-xs px-2 py-1 rounded-full ${categoryColor[task.category]}">
                            ${task.category}
                        </span>

                    </div>
                </div>
            </div>

            <button
                onclick="deleteTask(${task.id})"
                class="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 py-1 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
                Delete
            </button>
        `;

        taskList.appendChild(taskCard);
    });
}


// Update progress + statistics
function updateProgress(tasks) {

    const completedTasks = tasks.filter(
        task => task.completed
    ).length;

    const pendingTasks = tasks.length - completedTasks;

    const progress = tasks.length
        ? Math.round((completedTasks / tasks.length) * 100)
        : 0;

    // Statistics
    document.getElementById("totalTasks").innerText =
        `Total: ${tasks.length}`;

    document.getElementById("completedTasks").innerText =
        `Completed: ${completedTasks}`;

    document.getElementById("pendingTasks").innerText =
        `Pending: ${pendingTasks}`;

    // Progress bar
    document.getElementById("progressBar").style.width =
        `${progress}%`;

    document.getElementById("progressText").innerText =
        `${progress}%`;
}


// Enter key support
document.getElementById("taskInput")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            addTask();
        }
    });


// Load tasks on startup
fetchTasks();