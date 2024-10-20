"use client";
import { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({ title, description, priority, completed: false });
    setTitle('');
    setDescription('');
    setPriority('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        style={inputStyle}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        style={textareaStyle}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        required
        style={selectStyle}
      >
        <option value="" disabled>Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit" style={buttonStyle}>Add Task</button>
    </form>
  );
}

// Inline styles for the form and elements
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  maxWidth: '500px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#F7F7F7',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '2px solid #4A90E2',
  width: '100%',
  boxSizing: 'border-box',
};

const textareaStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '2px solid #4A90E2',
  width: '100%',
  boxSizing: 'border-box',
  minHeight: '80px',
};

const selectStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '2px solid #4A90E2',
  width: '100%',
  boxSizing: 'border-box',
};

const buttonStyle = {
  backgroundColor: '#4A90E2',
  color: '#fff',
  padding: '10px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

// Hover effect for button
buttonStyle[':hover'] = {
  backgroundColor: '#3E78B3',
};
