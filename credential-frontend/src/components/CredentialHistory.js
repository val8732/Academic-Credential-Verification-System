import React from 'react';

function CredentialHistory({ records }) {
  return (
    <div>
      <h3 className="history-title">Issued Credential History</h3>

      {records.length === 0 ? (
        <p>No credentials issued yet.</p>
      ) : (
        records.map((record, index) => (
          <div key={index} className="history-card">
            <p>
              <strong>ID:</strong> {record.id}
            </p>
            <p>
              <strong>Name:</strong> {record.studentName}
            </p>
            <p>
              <strong>Institution:</strong> {record.institution}
            </p>
            <p>
              <strong>Course:</strong> {record.course}
            </p>
            <p>
              <strong>Hash:</strong> {record.hash}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default CredentialHistory;
