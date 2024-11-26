import React, { useEffect, useState } from 'react';
import { getNoteById } from '../Services/noteService';
import { useParams, useNavigate } from 'react-router-dom';

const NotesDetails = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await getNoteById(id);
        setNote(data);
      } catch (error) {
        console.error("Failed to fetch note:", error);
      }
    };
    fetchNote();
  }, [id]);

  if (!note) return <div>Loading...</div>;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <button onClick={() => navigate(`/notes/edit/${id}`)}>Edit</button>
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
};

export default NotesDetails;
