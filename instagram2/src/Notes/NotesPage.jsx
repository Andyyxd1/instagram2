import React, { useEffect, useState } from 'react';
import { getNotes, deleteNote } from '../Services/noteService';
import { useNavigate } from 'react-router-dom';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNote(id);
        setNotes(notes.filter((note) => note.noteId !== id));
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => navigate('/notes/create')}>Create Note</button>
      <ul>
        {notes.map((note) => (
          <li key={note.noteId}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => navigate(`/notes/edit/${note.noteId}`)}>Edit</button>
            <button onClick={() => handleDelete(note.noteId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesPage;
