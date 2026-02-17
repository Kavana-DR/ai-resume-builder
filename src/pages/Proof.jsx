import React from 'react'
import '../styles/proof.css'

export default function Proof() {
  return (
    <div className="proof-container">
      <div className="proof-header">
        <h1>Artifacts & Proof</h1>
        <p className="proof-subtitle">Project artifacts and validation materials</p>
      </div>

      <div className="proof-content">
        <div className="proof-placeholder">
          <div className="placeholder-icon">📦</div>
          <h2>No artifacts yet</h2>
          <p>Build your resume to generate and view artifacts here.</p>
        </div>
      </div>
    </div>
  )
}
