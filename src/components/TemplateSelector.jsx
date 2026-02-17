import React from 'react'
import { TEMPLATES, getStoredTemplate, saveTemplate } from '../utils/templates'
import '../styles/template-selector.css'

export default function TemplateSelector({ onTemplateChange }) {
  const [selected, setSelected] = React.useState(getStoredTemplate())

  const handleTemplateChange = (templateId) => {
    setSelected(templateId)
    saveTemplate(templateId)
    if (onTemplateChange) {
      onTemplateChange(templateId)
    }
  }

  return (
    <div className="template-selector">
      <label className="template-label">Resume Template</label>
      <div className="template-options">
        {Object.entries(TEMPLATES).map(([key, template]) => (
          <button
            key={key}
            type="button"
            className={`template-option ${selected === key ? 'active' : ''}`}
            onClick={() => handleTemplateChange(key)}
            title={template.description}
          >
            <span className="template-name">{template.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
