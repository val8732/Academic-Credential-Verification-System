import React from 'react';

function Home({ issuedCount = 0, verifiedCount = 0 }) {
  return (
    <div className="card">
      <h1 className="page-title">Academic Credential Verification System</h1>

      <p className="subtitle">
        Blockchain-based credential issuance and verification system.
      </p>

      <div className="dashboard">
        <div className="card-box blue">
          📄 Issued <br /> {issuedCount}
        </div>

        <div className="card-box green">
          ✅ Verified <br /> {verifiedCount}
        </div>

        <div className="card-box orange">
          ⏳ Pending <br /> {issuedCount - verifiedCount}
        </div>
      </div>
    </div>
  );
}

export default Home;
