import React from 'react'
import '../styles/preview.css'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import { useResumeData } from '../hooks/useResumeData'
import { getStoredTemplate } from '../utils/templates'

export default function Preview() {
  const { formData, isLoaded } = useResumeData()
  const [selectedTemplate, setSelectedTemplate] = React.useState(getStoredTemplate())

  if (!isLoaded) {
    return <div className="preview-container"><p>Loading...</p></div>
  }

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h1>Resume Preview</h1>
        <p className="preview-subtitle">Clean, professional layout optimized for ATS</p>
        <div className="preview-template-selector">
          <TemplateSelector onTemplateChange={setSelectedTemplate} />
        </div>
      </div>

      <div className="preview-content">
        <ResumePreview data={formData} template={selectedTemplate} showHeader={false} />
      </div>

      <div className="preview-footer">
        <p>Navigate to Builder to customize your resume</p>
      </div>
    </div>
  )
}
