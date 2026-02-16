import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ViewBook from './pages/ViewBook';
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';

function App() {
  return (
    <div className="app-root">
      <Router>
        <header className="app-header">
          <div className="app-header-inner">
            <h1 className="app-title">Library Management</h1>
          </div>
        </header>

        <main className="app-main">
          <div className="app-main-inner">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateBook />} />
              <Route path="/edit/:id" element={<EditBook />} />
              <Route path="/book/:id" element={<ViewBook />} />
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;
