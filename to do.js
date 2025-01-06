document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => createTaskElement(task.text, task.completed));
    };
    const saveTasks = () => {
        const tasks = Array.from(taskList.children).map((li) => ({
            text: li.querySelector('.task-text').textContent,
            completed: li.classList.contains('completed'),
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
    const createTaskElement = (text, completed = false) => {
        const li = document.createElement('li');
        li.className = completed ? 'completed' : '';

        // Task text
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = text;

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });
        li.addEventListener('click', (e) => {
            if (e.target !== deleteBtn) {
                li.classList.toggle('completed');
                saveTasks();
            }
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    };

    // Add a task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }
        createTaskElement(taskText);
        saveTasks();
        taskInput.value = ''; // Clear input field
    };

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Load tasks on page load
    loadTasks();
});
