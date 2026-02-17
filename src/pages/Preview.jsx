import React from 'react'
import '../styles/preview.css'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import { useResumeData } from '../hooks/useResumeData'
import { getStoredTemplate } from '../utils/templates'
import { generateResumePlainText, isResumePotentiallyIncomplete } from '../utils/resumeExport'

export default function Preview() {
  const { formData, isLoaded } = useResumeData()
  const [selectedTemplate, setSelectedTemplate] = React.useState(getStoredTemplate())
  const [exportWarning, setExportWarning] = React.useState('')
  const [copyStatus, setCopyStatus] = React.useState('')

  const showCompletenessWarningIfNeeded = () => {
    if (isResumePotentiallyIncomplete(formData)) {
      setExportWarning('Your resume may look incomplete.')
    } else {
      setExportWarning('')
    }
  }

  const handlePrint = () => {
    showCompletenessWarningIfNeeded()
    window.print()
  }

  const handleCopyText = async () => {
    showCompletenessWarningIfNeeded()
    const plainText = generateResumePlainText(formData)

    try {
      await navigator.clipboard.writeText(plainText)
      setCopyStatus('Resume text copied to clipboard.')
    } catch (error) {
      setCopyStatus('Unable to copy automatically. Please copy manually.')
    }
  }

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
        <div className="preview-actions no-print">
          <button type="button" className="preview-action-btn" onClick={handlePrint}>
            Print / Save as PDF
          </button>
          <button type="button" className="preview-action-btn" onClick={handleCopyText}>
            Copy Resume as Text
          </button>
        </div>
        {exportWarning && <p className="preview-warning no-print">{exportWarning}</p>}
        {copyStatus && <p className="preview-copy-status no-print">{copyStatus}</p>}
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
