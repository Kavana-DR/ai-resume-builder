import React from 'react'
import '../styles/score-card.css'

export default function ScoreCard({ score, suggestions }) {
  // Determine score level
  const getScoreLevel = (score) => {
    if (score >= 80) return 'excellent'
    if (score >= 60) return 'good'
    if (score >= 40) return 'fair'
    return 'needs-improvement'
  }

  const scoreLevel = getScoreLevel(score)

  return (
    <div className="score-card">
      <div className="score-container">
        <div className={`score-meter ${scoreLevel}`}>
          <div className="score-circle">
            <span className="score-number">{score}</span>
            <span className="score-max">/100</span>
          </div>
          <div className="score-bar">
            <div 
              className={`score-fill ${scoreLevel}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        <div className="score-label">ATS Readiness Score</div>
        <p className="score-description">
          {scoreLevel === 'excellent' && 'Your resume has excellent ATS readiness.'}
          {scoreLevel === 'good' && 'Your resume has good ATS readiness.'}
          {scoreLevel === 'fair' && 'Your resume has fair ATS readiness.'}
          {scoreLevel === 'needs-improvement' && 'Your resume needs improvement for better ATS readiness.'}
        </p>
      </div>

      {suggestions.length > 0 && (
        <div className="suggestions">
          <h3 className="suggestions-title">Suggestions</h3>
          <ul className="suggestions-list">
            {suggestions.map((suggestion, idx) => (
              <li key={idx} className="suggestion-item">
                <span className="suggestion-icon">💡</span>
                <span className="suggestion-text">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
