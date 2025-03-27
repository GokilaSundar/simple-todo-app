import "./App.css";

import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");

  // Only if you want to persist the tasks in the local storage
  useEffect(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      setTasks(JSON.parse(tasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="container">
      <h1>TODO List</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          disabled={!newTask}
          onClick={() => {
            setTasks([
              ...tasks,
              {
                task: newTask,
                completed: false,
              },
            ]);
            setNewTask("");
          }}
        >
          Add
        </button>
      </div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="task"
            style={{
              backgroundColor: task.completed
                ? "lightgreen"
                : "lightgoldenrodyellow",
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onClick={() => {
                const newTasks = [...tasks];
                newTasks[index].completed = !newTasks[index].completed;
                setTasks(newTasks);
              }}
            />
            <span>{task.task}</span>
            <button
              onClick={() => {
                setTasks(tasks.filter((_, i) => i !== index));
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
