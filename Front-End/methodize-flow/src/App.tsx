import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage } from './Components/HomePage';
import { TaskContext } from './TaskContext';

export default function App() {
    return (
      <TaskContext>
        <Router>
            <Routes>
              <Route path="/" element={<Homepage />} />
            </Routes>
        </Router>
      </TaskContext>

    );
  }