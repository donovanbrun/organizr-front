import Task from "../../models/task";

let tasks: Task[] = [];

export const getTasks = (tags) => {
    return new Promise((resolve) => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("task")) {
                tasks = JSON.parse(localStorage.getItem("task"));
            }
            else {
                localStorage.setItem("task", JSON.stringify(tasks));
            }
        }
        resolve({ data: tasks });
    });
}

export const getTask = (id) => {
    return new Promise((resolve) => {
        const task = tasks.find((t) => t.id === id);
        resolve({ data: task });
    });
}

export const addTask = (task: Task) => {
    return new Promise((resolve) => {
        tasks.push(task);
        if (typeof window !== "undefined") localStorage.setItem("task", JSON.stringify(tasks));
        resolve({ data: tasks });
    });
}

export const updateTask = (task: Task) => {
    task.modificationDate = new Date();
    return new Promise((resolve) => {
        tasks = tasks.map((t) => {
            if (t.id === task.id) {
                return task;
            }
            return t;
        });
        if (typeof window !== "undefined") localStorage.setItem("task", JSON.stringify(tasks));
        resolve({ data: tasks });
    });
}

export const deleteTask = (id) => {
    return new Promise((resolve) => {
        tasks = tasks.filter((t) => t.id !== id);
        if (typeof window !== "undefined") localStorage.setItem("task", JSON.stringify(tasks));
        resolve({ data: tasks });
    });
}

export const exportTask = () => {
    return null;
}