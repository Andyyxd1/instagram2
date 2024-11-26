import axios from 'axios';

const API_BASE_URL = 'http://localhost:5255/api/Note'; // Replace with your API URL

// Fetch all notes
export const getNotes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notes", error);
    throw error;
  }
};

// Fetch a single note by ID
export const getNoteById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching note with id ${id}`, error);
    throw error;
  }
};

// Create a new note
export const createNote = async (note) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, note);
    return response.data;
  } catch (error) {
    console.error("Error creating note", error);
    throw error;
  }
};

// Update an existing note
export const editNote = async (id, updatedNote) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedNote);
    return response.data;
  } catch (error) {
    console.error(`Error updating note with id ${id}`, error);
    throw error;
  }
};

// Delete a note
export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.status === 204; // Return true if deletion was successful
  } catch (error) {
    console.error(`Error deleting note with id ${id}`, error);
    throw error;
  }
};
