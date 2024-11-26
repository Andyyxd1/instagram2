import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const API_URL = 'http://localhost:5255'

const NotesPage= () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchNotes = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      setError(null);   // Clear any previous errors
  
      try {
        const response = await fetch(`${API_URL}/api/NoteAPI/GetNotes`); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNotes(data);
        console.log(data);
      } catch (error) {
        console.error(`There was a problem with the fetch operation: ${error.message}`);
        setError('Failed to fetch items.');
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };  
    useEffect(() => {
      fetchNotes();
    }, []);

  return (
<div>
    <h1>Notes</h1>
    <Button onClick={fetchNotes} className="btn btn-primary mb-3" disabled={loading}>
      {loading ? 'Loading...' : 'Refresh Items'}
    </Button>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Content</th>
      </tr>
    </thead>
    <tbody>
      {notes.map(note => (
        <tr key={note.noteId}>
          <td>{note.noteId}</td>
          <td>{note.Title}</td>
          <td>{note.Content}</td>
        </tr>
      ))}
    </tbody>
    </Table>
  </div>
);
};

export default NotesPage;
