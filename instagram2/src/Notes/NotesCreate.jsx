import React, { useState } from 'react';
import { createNote } from '../Services/noteService';
import { useNavigate } from 'react-router-dom';

const NotesCreate = () => {
  const [note, setNote] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNote(note); // Call the createNote service
      navigate('/'); // Redirect to the home page after successful creation
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  return (
    <div>
      <h1>Create Note</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NotesCreate;
