"use client";
import { useState } from 'react';

export default function TaskItem({ task, onToggleComplete, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  // Define styles inline based on priority
  const getBorderStyle = (priority) => {
    switch (priority) {
      case 'high':
        return { border: '2px solid #ff4d4d' }; // Red for high priority
      case 'medium':
        return { border: '2px solid #ffa500' }; // Yellow for medium priority
      case 'low':
        return { border: '2px solid #90ee90' }; // Green for low priority
      default:
        return { border: '2px solid #ddd' }; // Default gray
    }
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return {color: '#ff4d4d'}; // Red for high priority
      case 'medium':
        return {color: '#ffa500' }; // Yellow for medium priority
      case 'low':
        return {color: '#90ee90' }; // Green for low priority
      default:
        return {color:"#ddd" }; // Default gray
    }
  };
  // Handle the changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  // Save the edited task and close the edit mode
  const handleSave = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  return (
    <div style={{
      ...getBorderStyle(task.priority),
      padding: '10px',
      borderRadius: '5px',
      background: '#fff',
      marginBottom: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    }}>
      {isEditing ? (
        <div>
          <input 
            type="text" 
            name="title" 
            value={editedTask.title} 
            onChange={handleChange}
            style={{ width: '100%', padding: '5px', marginBottom: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <textarea 
            name="description" 
            value={editedTask.description} 
            onChange={handleChange}
            style={{ width: '100%', padding: '5px', marginBottom: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <select 
            name="priority" 
            value={editedTask.priority} 
            onChange={handleChange}
            style={{ width: '100%', padding: '5px', marginBottom: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button 
            style={{
              backgroundColor: '#0070f3',
              color: '#fff',
              padding: '5px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '5px',
              border: 'none',
            }}
            onClick={handleSave}
          >
            Save
          </button>
          <button 
            style={{
              backgroundColor: '#e0e0e0',
              color: '#333',
              padding: '5px',
              borderRadius: '4px',
              cursor: 'pointer',
              border: 'none',
            }}
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h3 style={{ 
            margin: 0, 
            fontSize: '1.2rem', 
            color: task.completed ? '#999' : '#333', 
            textDecoration: task.completed ? 'line-through' : 'none' 
          }}>
            {task.title}
          </h3>
          <p style={{ margin: '5px 0', color: 'gray',fontSize: 16 }}>{task.description}</p>
          <p style={{margin: '5px 0', color: '#666', fontSize: 14,fontWeight:800 }}>Priority: <span style={{...getPriorityColor(task.priority),}}>{task.priority}</span></p>
          <button 
            style={{
              backgroundColor: '#e0e0e0',
              color: '#333',
              padding: '5px',
              borderRadius: '4px',
              marginTop: '5px',
              cursor: 'pointer',
              border: 'none',
            }}
            onClick={() => onToggleComplete(task.id)}
          >
            {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
          </button>
          <button 
            style={{
              backgroundColor: '#0070f3',
              color: '#fff',
              padding: '5px',
              borderRadius: '4px',
              marginTop: '5px',
              marginLeft: '5px',
              cursor: 'pointer',
              border: 'none',
            }}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button 
            style={{
              backgroundColor: '#ff4d4d',
              color: 'white',
              padding: '5px',
              borderRadius: '4px',
              marginTop: '5px',
              marginLeft: '5px',
              cursor: 'pointer',
              border: 'none',
            }}
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
