import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import IssueCredential from './pages/IssueCredential';
import VerifyCredential from './pages/VerifyCredential';
import './App.css';

function App() {
  const [issuedCount, setIssuedCount] = useState(0);
  const [verifiedCount, setVerifiedCount] = useState(0);

  return (
    <Router>
      <Navbar />

      <div className="layout">
        <div className="sidebar">
          <h2 style={{ color: 'white', marginBottom: '20px' }}>🎓 ACVS</h2>

          <Link to="/">Dashboard</Link>
          <Link to="/issue">Issue</Link>
          <Link to="/verify">Verify</Link>
        </div>

        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Home issuedCount={issuedCount} verifiedCount={verifiedCount} />
              }
            />

            <Route
              path="/issue"
              element={<IssueCredential setIssuedCount={setIssuedCount} />}
            />

            <Route
              path="/verify"
              element={<VerifyCredential setVerifiedCount={setVerifiedCount} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
