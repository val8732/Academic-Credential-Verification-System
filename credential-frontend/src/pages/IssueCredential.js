import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { getContract } from '../blockchain/contract';
import { ethers } from 'ethers';
import axios from 'axios';

function IssueCredential({ setIssuedCount }) {
  const [studentName, setStudentName] = useState('');
  const [course, setCourse] = useState('');
  const [institution, setInstitution] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [message, setMessage] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [generatedHash, setGeneratedHash] = useState('');
  const [fileHash, setFileHash] = useState('');
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleIssue = async () => {
    if (!studentName || !course || !institution || !credentialId) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const contract = await getContract();

      const baseHash = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(
          `${credentialId}-${studentName}-${course}-${institution}`,
        ),
      );

      const finalHash = fileHash || baseHash;
      setGeneratedHash(finalHash);

      // BLOCKCHAIN
      if (!isEditing) {
        try {
          const tx = await contract.issueCredential(
            credentialId,
            studentName,
            institution,
            course,
            finalHash,
          );
          await tx.wait();
          setIssuedCount((prev) => prev + 1);
        } catch (err) {
          setError('Credential already exists on blockchain!');
          return;
        }
      }

      // BACKEND (FILE UPLOAD)
      const formData = new FormData();
      formData.append('credentialId', credentialId);
      formData.append('studentName', studentName);
      formData.append('institution', institution);
      formData.append('course', course);
      formData.append('hash', finalHash);
      formData.append('isEditing', isEditing);

      if (file) {
        formData.append('file', file);
      }

      await axios.post('http://localhost:5000/credentials', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage('Credential Issued Successfully');
      setError('');
      setShowQR(true);

      const newCredential = {
        credentialId,
        studentName,
        course,
        institution,
        hash: finalHash,
      };

      if (isEditing) {
        const updated = history.map((item) =>
          item.credentialId === editingId ? newCredential : item,
        );
        setHistory(updated);
      } else {
        setHistory([...history, newCredential]);
      }

      // RESET
      setIsEditing(false);
      setEditingId(null);
      setCredentialId('');
      setStudentName('');
      setCourse('');
      setInstitution('');
      setFile(null);
      setFileHash('');
    } catch (err) {
      setError('Failed to save to database!');
      setShowQR(false);
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      const buffer = new Uint8Array(reader.result);
      const hash = ethers.utils.keccak256(buffer);
      setFileHash(hash);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleEdit = (item) => {
    setCredentialId(item.credentialId);
    setStudentName(item.studentName);
    setCourse(item.course);
    setInstitution(item.institution);
    setEditingId(item.credentialId);
    setIsEditing(true);
  };

  return (
    <div className="card">
      <h2>Issue Credential</h2>
      {/* EDIT */}
      {isEditing && (
        <div style={{ color: '#f39c12', fontWeight: 'bold' }}>
          Editing Mode...
        </div>
      )}
      <div className="form-row">
        <input
          placeholder="Credential ID"
          value={credentialId}
          onChange={(e) => setCredentialId(e.target.value)}
        />

        <input
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        <input
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
      </div>

      <div className="form-row">
        <input
          placeholder="Institution"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
        />

        <input type="file" onChange={handleFileUpload} />
      </div>

      <button onClick={handleIssue}>{isEditing ? 'Update' : 'Issue'}</button>

      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* SIMPLE QR */}
      {showQR && (
        <QRCodeCanvas
          value={`ID:${credentialId}
           Name:${studentName}
           Course:${course}
           Institution:${institution}
           Hash:${fileHash}`}
          size={150}
        />
      )}
      {/* HASHING */}
      {generatedHash && (
        <div className="hash-box">
          <strong>🔐 Credential Hash:</strong>
          <p style={{ wordBreak: 'break-all' }}>{generatedHash}</p>
        </div>
      )}
      {/* HISTORY */}
      {history.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>History</h3>

          {history.map((item, index) => (
            <div key={index} className="history-card">
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default IssueCredential;
