import React from 'react'
import '../styles/preview.css'

export default function Preview() {
  // Placeholder resume data structure
  const resumeData = {
    personalInfo: {
      name: 'Your Name',
      email: 'your.email@example.com',
      phone: '+1 (555) 000-0000',
      location: 'City, State'
    },
    summary: 'Your professional summary will appear here.',
    experience: [],
    education: [],
    projects: [],
    skills: [],
    links: {}
  }

  const skills = resumeData.skills.length > 0 
    ? resumeData.skills 
    : []

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h1>Resume Preview</h1>
        <p className="preview-subtitle">Clean, professional layout optimized for ATS</p>
      </div>

      <div className="preview-content">
        <div className="resume-page">
          {/* Header */}
          <div className="resume-header">
            <h1 className="resume-name">{resumeData.personalInfo.name}</h1>
            <div className="resume-contact">
              <span>{resumeData.personalInfo.email}</span>
              <span>•</span>
              <span>{resumeData.personalInfo.phone}</span>
              <span>•</span>
              <span>{resumeData.personalInfo.location}</span>
            </div>
          </div>

          {/* Summary */}
          <section className="resume-section">
            <h2 className="section-title">Professional Summary</h2>
            <p className="section-text">{resumeData.summary}</p>
          </section>

          {/* Experience Placeholder */}
          <section className="resume-section">
            <h2 className="section-title">Experience</h2>
            <div className="placeholder-content">
              <div className="placeholder-line"></div>
              <div className="placeholder-line"></div>
            </div>
          </section>

          {/* Education Placeholder */}
          <section className="resume-section">
            <h2 className="section-title">Education</h2>
            <div className="placeholder-content">
              <div className="placeholder-line"></div>
              <div className="placeholder-line"></div>
            </div>
          </section>

          {/* Skills Placeholder */}
          <section className="resume-section">
            <h2 className="section-title">Skills</h2>
            <div className="placeholder-content">
              <div className="placeholder-line"></div>
            </div>
          </section>
        </div>
      </div>

      <div className="preview-footer">
        <p>Navigate to Builder to customize your resume</p>
      </div>
    </div>
  )
}
