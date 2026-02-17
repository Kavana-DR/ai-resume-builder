import React, { useEffect } from 'react'
import '../styles/builder.css'
import ResumePreview from '../components/ResumePreview'
import ScoreCard from '../components/ScoreCard'
import { useResumeData } from '../hooks/useResumeData'
import { calculateATSScore, generateSuggestions } from '../utils/atsScoring'

export default function Builder() {
  const { formData, setFormData, isLoaded } = useResumeData()
  const [atsScore, setAtsScore] = React.useState(0)
  const [suggestions, setSuggestions] = React.useState([])

  // Calculate ATS score and suggestions whenever formData changes
  useEffect(() => {
    if (isLoaded) {
      const score = calculateATSScore(formData)
      setAtsScore(score)
      setSuggestions(generateSuggestions(formData, score))
    }
  }, [formData, isLoaded])

  const handlePersonalInfoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
  }

  const handleSummaryChange = (value) => {
    setFormData(prev => ({ ...prev, summary: value }))
  }

  const handleEducationChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', field: '', year: '' }]
    }))
  }

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }))
  }

  const handleExperienceChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', duration: '', description: '' }]
    }))
  }

  const removeExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }))
  }

  const handleProjectsChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }))
  }

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', description: '', link: '' }]
    }))
  }

  const removeProject = (index) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }))
  }

  const handleSkillsChange = (value) => {
    setFormData(prev => ({ ...prev, skills: value }))
  }

  const handleLinksChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      links: { ...prev.links, [field]: value }
    }))
  }

  const loadSampleData = () => {
    setFormData({
      personalInfo: {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA'
      },
      summary: 'Full-stack developer with 5+ years of experience building scalable web applications. Passionate about clean code and user experience.',
      education: [
        { school: 'Stanford University', degree: 'BS', field: 'Computer Science', year: '2019' }
      ],
      experience: [
        { company: 'Tech Corp', position: 'Senior Software Engineer', duration: '2021 - Present', description: 'Led development of microservices architecture serving 1M+ users. Improved system performance by 40% resulting in 2x faster response times.' },
        { company: 'StartupXYZ', position: 'Full-Stack Developer', duration: '2019 - 2021', description: 'Built and maintained React and Node.js applications. Reduced deployment time from 30m to 5m through CI/CD optimization.' }
      ],
      projects: [
        { title: 'AI Resume Builder', description: 'Smart resume generation tool with real-time ATS scoring feedback. Achieved 95% accuracy in parsing.' , link: 'github.com/project' },
        { title: 'Analytics Dashboard', description: 'Real-time data visualization platform processing 10k+ events/sec', link: 'github.com/project2' }
      ],
      skills: 'React, Node.js, JavaScript, TypeScript, PostgreSQL, MongoDB, AWS, Docker, Git, Python, SQL, REST APIs',
      links: {
        github: 'github.com/alexjohnson',
        linkedin: 'linkedin.com/in/alexjohnson'
      }
    })
  }

  if (!isLoaded) {
    return <div className="builder-container"><p>Loading...</p></div>
  }

  return (
    <div className="builder-container">
      <div className="builder-header">
        <h1>Resume Builder</h1>
        <button className="btn-secondary" onClick={loadSampleData}>Load Sample Data</button>
      </div>

      <div className="builder-layout">
        {/* Left: Form Sections */}
        <div className="builder-form">
          {/* Personal Info */}
          <section className="form-section">
            <h2>Personal Information</h2>
            <div className="form-row">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.personalInfo.name}
                onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.personalInfo.email}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              />
            </div>
            <div className="form-row">
              <input
                type="tel"
                placeholder="Phone"
                value={formData.personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.personalInfo.location}
                onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
              />
            </div>
          </section>

          {/* Summary */}
          <section className="form-section">
            <h2>Professional Summary</h2>
            <textarea
              placeholder="Write a brief professional summary..."
              rows="4"
              value={formData.summary}
              onChange={(e) => handleSummaryChange(e.target.value)}
            />
          </section>

          {/* Education */}
          <section className="form-section">
            <h2>Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="form-group">
                <input
                  type="text"
                  placeholder="School/University"
                  value={edu.school}
                  onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                />
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Degree (e.g., BS, MA)"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={edu.field}
                    onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                  />
                </div>
                {formData.education.length > 1 && (
                  <button
                    className="btn-remove"
                    onClick={() => removeEducation(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button className="btn-add" onClick={addEducation}>+ Add Education</button>
          </section>

          {/* Experience */}
          <section className="form-section">
            <h2>Experience</h2>
            {formData.experience.map((exp, index) => (
              <div key={index} className="form-group">
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                />
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g., 2021 - 2023)"
                    value={exp.duration}
                    onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                  />
                </div>
                <textarea
                  placeholder="Job description and achievements..."
                  rows="3"
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                />
                {formData.experience.length > 1 && (
                  <button
                    className="btn-remove"
                    onClick={() => removeExperience(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button className="btn-add" onClick={addExperience}>+ Add Experience</button>
          </section>

          {/* Projects */}
          <section className="form-section">
            <h2>Projects</h2>
            {formData.projects.map((proj, index) => (
              <div key={index} className="form-group">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={proj.title}
                  onChange={(e) => handleProjectsChange(index, 'title', e.target.value)}
                />
                <textarea
                  placeholder="Project description..."
                  rows="2"
                  value={proj.description}
                  onChange={(e) => handleProjectsChange(index, 'description', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Link (GitHub, live demo, etc.)"
                  value={proj.link}
                  onChange={(e) => handleProjectsChange(index, 'link', e.target.value)}
                />
                {formData.projects.length > 1 && (
                  <button
                    className="btn-remove"
                    onClick={() => removeProject(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button className="btn-add" onClick={addProject}>+ Add Project</button>
          </section>

          {/* Skills */}
          <section className="form-section">
            <h2>Skills</h2>
            <textarea
              placeholder="Enter skills separated by commas (e.g., React, Python, AWS, ...)"
              rows="3"
              value={formData.skills}
              onChange={(e) => handleSkillsChange(e.target.value)}
            />
          </section>

          {/* Links */}
          <section className="form-section">
            <h2>Links</h2>
            <input
              type="url"
              placeholder="GitHub URL"
              value={formData.links.github}
              onChange={(e) => handleLinksChange('github', e.target.value)}
            />
            <input
              type="url"
              placeholder="LinkedIn URL"
              value={formData.links.linkedin}
              onChange={(e) => handleLinksChange('linkedin', e.target.value)}
            />
          </section>
        </div>

        {/* Right: Score Card + Live Preview */}
        <div className="builder-sidebar">
          <ScoreCard score={atsScore} suggestions={suggestions} />
          <div className="builder-preview">
            <ResumePreview data={formData} />
          </div>
        </div>
      </div>
    </div>
  )
}
