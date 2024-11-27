import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import HomePage from './Home/HomePage';
import NotesPage from './Notes/NotesPage';
import NotesCreate from './Notes/NotesCreate';
import NotesEdit from './Notes/NotesEdit';

const App: React.FC = () => {
  return (
    <Container>
        <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/notescreate" element={<NotesCreate />} />
              <Route path="/edit/:noteId" element={<NotesEdit />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    </Container>
  );
}

export default App;