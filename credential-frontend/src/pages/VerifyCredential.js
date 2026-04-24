import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';

function VerifyCredential({ setVerifiedCount }) {
  const [credentialId, setCredentialId] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const handleVerify = async () => {
    if (!credentialId) {
      alert('Enter Credential ID');
      return;
    }

    const alreadyExists = history.some(
      (item) => item.credentialId === credentialId,
    );

    if (alreadyExists) {
      setResult('Already Verified');
      setShowQR(false);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/credentials/${credentialId}`,
      );

      let verifiedCredential;

      if (!res.data || !res.data.id) {
        setResult('Invalid Credential');
        setShowQR(false);

        verifiedCredential = {
          credentialId,
          studentName: 'Not Found',
          institution: 'Not Found',
          course: 'Not Found',
          hash: 'N/A',
          status: 'Invalid Credential',
        };

        setCurrentData(null);
      } else {
        setResult('Valid Credential');
        setShowQR(true);

        if (setVerifiedCount) {
          setVerifiedCount((prev) => prev + 1);
        }

        verifiedCredential = {
          credentialId: res.data.id,
          studentName: res.data.student_name,
          institution: res.data.institution,
          course: res.data.course,
          hash: res.data.credential_hash,
          fileUrl: res.data.file_url,
          status: 'Valid Credential',
        };

        setCurrentData(verifiedCredential);
      }

      setHistory([...history, verifiedCredential]);
    } catch (err) {
      console.error('ERROR:', err);
      setResult('Error verifying');
    }
  };

  return (
    <div className="card">
      <h2 className="page-title">Verify Credential</h2>

      <div className="form-group">
        <label>Credential ID</label>
        <input
          type="text"
          value={credentialId}
          onChange={(e) => setCredentialId(e.target.value)}
          placeholder="Enter Credential ID"
        />
      </div>

      <button onClick={handleVerify}>Verify Credential</button>

      {/* STATUS */}
      {result === 'Valid Credential' && (
        <div className="success-box">Valid Credential</div>
      )}

      {result === 'Invalid Credential' && (
        <div className="error-box">Invalid Credential</div>
      )}

      {result === 'Already Verified' && (
        <div className="error-box">
          This Credential ID was already verified.
        </div>
      )}

      {/* QR CODE */}
      {showQR && currentData && (
        <div className="qr-box">
          <h3>Verification QR Code</h3>
          <QRCodeCanvas
            value={`ID:${currentData.credentialId}
            Name:${currentData.studentName}
            Course:${currentData.course}
            Institution:${currentData.institution}
            Hash:${currentData.hash}`}
            size={150}
          />
        </div>
      )}
      {/* DATA DISPLAY */}
      {currentData && (
        <div className="hash-box">
          {/* CERTIFICATE */}
          {currentData.fileUrl && (
            <div style={{ marginTop: '20px' }}>
              <strong>Certificate:</strong>
              <img
                src={`http://localhost:5000/uploads/${currentData.fileUrl}`}
                alt="certificate"
                style={{
                  width: '300px',
                  marginTop: '10px',
                  borderRadius: '10px',
                }}
              />
            </div>
          )}

          <strong>Blockchain Hash:</strong>
          <p style={{ wordBreak: 'break-all' }}>{currentData.hash}</p>
        </div>
      )}

      {/* HISTORY */}
      {history.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Credential History</h3>

          {history.map((item, index) => (
            <div key={index} className="history-card">
              <p>
                <strong>ID:</strong> {item.credentialId}
              </p>
              <p>
                <strong>Name:</strong> {item.studentName}
              </p>
              <p>
                <strong>Course:</strong> {item.course}
              </p>
              <p>
                <strong>Institution:</strong> {item.institution}
              </p>
              <p>
                <strong>Status:</strong> {item.status}
              </p>

              <p>
                <strong>Hash:</strong>
                <br />
                {item.hash}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VerifyCredential;
