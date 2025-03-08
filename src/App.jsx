import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Settings, Editor, Article, Profile, Auth } from './pages';
import { AuthRoute, GuestRoute, Navbar } from './components';
import Terms from './pages/Terms';
import AddAnnouncement from './pages/AddAnnouncement/AddAnnouncement';
import CompanyVerification from './pages/CompanyVerification';

import './App.css';

console.log("VITE_CEIDG_API_KEY w App.jsx:", import.meta.env.VITE_CEIDG_API_KEY);

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/register" element={<Auth key="register" />} />
          <Route path="/login" element={<Auth key="login" />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/add-announcement" element={<AddAnnouncement />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/weryfikacja-firmy" element={<CompanyVerification />} />
          <Route path="/editor/:slug" element={<Editor />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/@:username" element={<Profile />} />
        </Routes>
      </main>
      
<footer>
  <div className="container">
    <div className="row">
      {/* Kolumna 1 */}
      <div className="col-md-6">
        <ul className="footer-links">
          <li><Link to="/link1">Kontakt</Link></li>
          <li><Link to="/link2">Regulamin</Link></li>
          <li><Link to="/link3">O serwisie</Link></li>
          <li><Link to="/link4">Reklama</Link></li>
        </ul>
      </div>
      {/* Kolumna 2 */}
      <div className="col-md-6">
        <ul className="footer-links">
          <li><Link to="/link5">Link 5</Link></li>
          <li><Link to="/link6">Link 6</Link></li>
          <li><Link to="/link7">Link 7</Link></li>
          <li><Link to="/link8">Link 8</Link></li>
        </ul>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 text-center">
        <Link to="/" className="logo-font">
          MSB
        </Link>
        <span className="attribution">
          Lorem ipsum
        </span>
      </div>
    </div>
  </div>
</footer>

    </Router>
  );
}

export default App;
