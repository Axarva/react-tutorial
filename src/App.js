import "./styles.css";
import Header from "./components/Header.js";
import Tasks from "./components/Tasks.js";
import AddTask from "./components/AddTask.js";
import Footer from "./components/Footer.js";
import About from "./components/About.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

export default function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [btnColor, setBtnColor] = useState("green");
  const [btnText, setBtnText] = useState("Add");
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer);
    }
    getTasks();
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json();
    return data
  }
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json();
    return data
  }
  const toggleAddButton = () => {
    if (!showAddTask) {
      setBtnColor("red");
      setBtnText("Close");
    } else {
      setBtnColor("green");
      setBtnText("Add");
    }
  };
  const toggleAddForm = () => {
    setShowAddTask(!showAddTask);
    toggleAddButton();
  };
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json(updTask);

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  const removeTask = async (id) => {
    await fetch (`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTask = async (newText, newDay, newReminder) => {
    const newTask = {
      id: tasks.length + 1,
      text: newText,
      day: newDay,
      reminder: newReminder
    };
    const res = await fetch (`http://localhost:5000/tasks`, {
                        method: 'POST',
                        headers: {
                          'Content-type': 'application/json'
                        },
                        body: JSON.stringify(newTask)
                      })
    const data = await res.json()
    setTasks([...tasks, data]);
  };

  return (
    <Router>
      <div className="container">
        <Header
          btnColor={btnColor}
          btnText={btnText}
          toggleAddForm={toggleAddForm}
          title="Task Tracker"
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask ? <AddTask onAdd={addTask} /> : <></>}
                {tasks.length === 0 ? (
                  "No more tasks today!"
                ) : (
                  <Tasks
                    tasks={tasks}
                    toggleReminder={toggleReminder}
                    removeTask={removeTask}
                  />
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
