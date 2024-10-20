// app/page.js
"use client";
import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import styles from '../app/styles/TaskManager.module.css'

export default function Home() {
  const initialTasks = [
    
  ];

  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  return (
    <div className={styles.container}>
      {/* <h1>Task Manager</h1>
      <TaskForm onAddTask={addTask} /> */}
      <TaskList 
        tasks={tasks} 
        onToggleComplete={toggleComplete} 
        onDelete={deleteTask} 
        onEdit={editTask} 
      />
    </div>
  );
}
