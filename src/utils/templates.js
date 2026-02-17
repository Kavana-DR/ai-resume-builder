// Template configuration system
export const TEMPLATES = {
  classic: {
    name: 'Classic',
    description: 'Traditional, ATS-optimized layout',
    id: 'classic',
  },
  modern: {
    name: 'Modern',
    description: 'Contemporary minimal design',
    id: 'modern',
  },
  minimal: {
    name: 'Minimal',
    description: 'Clean, focused layout',
    id: 'minimal',
  },
}

export const DEFAULT_TEMPLATE = 'classic'

// Get template from localStorage or return default
export function getStoredTemplate() {
  const stored = localStorage.getItem('resumeTemplate')
  return stored && TEMPLATES[stored] ? stored : DEFAULT_TEMPLATE
}

// Save template to localStorage
export function saveTemplate(templateId) {
  if (TEMPLATES[templateId]) {
    localStorage.setItem('resumeTemplate', templateId)
  }
}
