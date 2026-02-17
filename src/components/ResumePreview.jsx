import React from 'react'
import '../styles/resume-preview.css'

export default function ResumePreview({ data }) {
  const skills = data.skills.split(',').map(s => s.trim()).filter(s => s)
  
  return (
    <div className="resume-preview-panel">
      <div className="resume-preview-header">
        <p className="preview-label">Live Preview</p>
      </div>

      <div className="resume-content">
        {/* Header */}
        <div className="resume-header">
          {data.personalInfo.name && (
            <h1 className="resume-name">{data.personalInfo.name}</h1>
          )}
          <div className="resume-contact">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <section className="resume-section">
            <h2 className="resume-section-title">Summary</h2>
            <p className="resume-text">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.some(exp => exp.company || exp.position) && (
          <section className="resume-section">
            <h2 className="resume-section-title">Experience</h2>
            {data.experience.map((exp, idx) => (
              (exp.company || exp.position) && (
                <div key={idx} className="resume-entry">
                  <div className="resume-entry-header">
                    <strong className="resume-title">{exp.position || 'Position'}</strong>
                    {exp.duration && <span className="resume-meta">{exp.duration}</span>}
                  </div>
                  {exp.company && <div className="resume-company">{exp.company}</div>}
                  {exp.description && <p className="resume-text">{exp.description}</p>}
                </div>
              )
            ))}
          </section>
        )}

        {/* Education */}
        {data.education.some(edu => edu.school || edu.degree) && (
          <section className="resume-section">
            <h2 className="resume-section-title">Education</h2>
            {data.education.map((edu, idx) => (
              (edu.school || edu.degree) && (
                <div key={idx} className="resume-entry">
                  <div className="resume-entry-header">
                    <strong className="resume-title">
                      {edu.degree && `${edu.degree}`}
                      {edu.field && ` in ${edu.field}`}
                    </strong>
                    {edu.year && <span className="resume-meta">{edu.year}</span>}
                  </div>
                  {edu.school && <div className="resume-company">{edu.school}</div>}
                </div>
              )
            ))}
          </section>
        )}

        {/* Projects */}
        {data.projects.some(proj => proj.title) && (
          <section className="resume-section">
            <h2 className="resume-section-title">Projects</h2>
            {data.projects.map((proj, idx) => (
              proj.title && (
                <div key={idx} className="resume-entry">
                  <div className="resume-entry-header">
                    <strong className="resume-title">{proj.title}</strong>
                  </div>
                  {proj.description && <p className="resume-text">{proj.description}</p>}
                  {proj.link && <div className="resume-link">{proj.link}</div>}
                </div>
              )
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Skills</h2>
            <div className="resume-skills">
              {skills.map((skill, idx) => (
                <span key={idx} className="skill-badge">{skill}</span>
              ))}
            </div>
          </section>
        )}

        {/* Links */}
        {(data.links.github || data.links.linkedin) && (
          <section className="resume-section">
            <div className="resume-links">
              {data.links.github && <p className="resume-link-item">GitHub: {data.links.github}</p>}
              {data.links.linkedin && <p className="resume-link-item">LinkedIn: {data.links.linkedin}</p>}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
