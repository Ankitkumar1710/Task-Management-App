"use client";
import { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

export default function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask, id: Date.now() }]);
  };

  // Toggle completion status of a task
  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Edit a task
  const handleEditTask = (editedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
  };

  // Define priority values for sorting
  const getPriorityValue = (priority) => {
    switch (priority) {
      case 'high':
        return 1;
      case 'medium':
        return 2;
      case 'low':
        return 3;
      default:
        return 4; // Default for tasks without a defined priority
    }
  };

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate tasks into incomplete and completed
  const incompleteTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  // Sort the incomplete tasks by priority
  const sortedIncompleteTasks = incompleteTasks.sort((a, b) => getPriorityValue(a.priority) - getPriorityValue(b.priority));

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Task Management App</h1>

      {/* Add Task Form - displayed only once */}
      <TaskForm onAddTask={handleAddTask} />

      {/* Search bar for filtering tasks */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '20px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ddd',
        }}
      />

      {/* Display the list of incomplete tasks */}
      {sortedIncompleteTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      ))}

      {/* Display message if no incomplete tasks are found */}
      {sortedIncompleteTasks.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>No pending tasks</p>
      )}

      {/* Completed tasks heading */}
      {completedTasks.length > 0 && (
        <h2 style={{ marginTop: '30px' }}>Completed Tasks</h2>
      )}

      {/* Display the list of completed tasks */}
      {completedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      ))}

      {/* Display message if no completed tasks are found */}
      {completedTasks.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>No completed tasks</p>
      )}
    </div>
  );
}
