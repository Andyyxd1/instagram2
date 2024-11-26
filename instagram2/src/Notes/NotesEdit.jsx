import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteById, editNote } from '../Services/noteService';

const NotesEdit = () => {
  const { id } = useParams(); // Get the note ID from the URL
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  // Fetch the note data when the component loads
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await getNoteById(id);
        setNote(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching note:', err);
        setError('Failed to load the note.');
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await editNote(id, note);
      navigate('/'); // Redirect to the home page or notes list
    } catch (err) {
      console.error('Error updating note:', err);
      setError('Failed to save changes.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Edit Note</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={note.content}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate('/')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NotesEdit;
