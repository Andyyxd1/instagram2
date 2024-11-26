import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotesPage from './Notes/NotesPage';
import NotesCreate from './Notes/NotesCreate';
import NotesDetails from './Notes/NotesDetails';
import NotesEdit from './Notes/NotesEdit';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesPage />} />
        <Route path="/notes/:id" element={<NotesDetails />} />
        <Route path="/notes/create" element={<NotesCreate />} />
        <Route path="/notes/edit/:id" element={<NotesEdit />} />
      </Routes>
    </Router>
  );
}

export default App;

