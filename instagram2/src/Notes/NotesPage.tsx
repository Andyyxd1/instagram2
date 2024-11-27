import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Note } from '../Types/Note';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5255';


const NotesPage: React.FC = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]); // State for notes, typed as an array of Note
  const [loading, setLoading] = useState<boolean>(false); // State for loading, typed as boolean
  const [error, setError] = useState<string | null>(null); // State for error, typed as string or null

  const fetchNotes = async () => {
    setLoading(true); // Set loading to true when starting the fetch
    setError(null);   // Clear any previous errors

    try {
      const response = await fetch(`${API_URL}/api/NoteAPI/GetNotes`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Note[] = await response.json(); // Explicitly type the data as Note[]
      setNotes(data);
      console.log(data);
    } catch (error) {
      console.error(`There was a problem with the fetch operation: ${(error as Error).message}`);
      setError('Failed to fetch items.');
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  const handleNoteDeleted = async (noteId: number) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the item ${noteId}?`);
    if (confirmDelete) {
      try {
        const response = await fetch(`${API_URL}/api/itemapi/delete/${noteId}`, {
          method: 'DELETE',
        });
        setNotes(prevItems => prevItems.filter(note => note.noteId !== noteId));
        console.log('Item deleted:', noteId);
      } catch (error) {
        console.error('Error deleting item:', error);
        setError('Failed to delete item.');
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <Button onClick={() => navigate(`/notescreate`)} className="btn btn-secondary mt-3">Create Note</Button>
      <h1>Notes</h1>
      <Button onClick={fetchNotes} className="btn btn-primary mb-3" disabled={loading}>
        {loading ? 'Loading...' : 'Refresh Items'}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {notes.map(note => (
        <div key={note.noteId} className="card mb-4 shadow-sm note-card">
          <div className="card-body">
            <h4 className="note-title">{note.title}</h4>
            <p className="note-content">{note.content}</p>
            <p className="note-timestamp">Uploaded: {new Date(note.uploadDate).toLocaleDateString()}</p>
          </div>
          <div className="card-footer bg-light">
            <div className="note-actions">
              <Button onClick={() => navigate(`/edit/${note.noteId}`)} className="btn btn-sm btn-warning">Edit</Button>
              <Button onClick={(event) => onNoteDeleted(note.noteId)} variant="danger">Delete</Button> 
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesPage;
