// Utility function to calculate ATS Score (0-100)
export function calculateATSScore(formData) {
  let score = 0

  // +15 if summary length is 40–120 words
  if (formData.summary) {
    const wordCount = formData.summary.trim().split(/\s+/).length
    if (wordCount >= 40 && wordCount <= 120) {
      score += 15
    }
  }

  // +10 if at least 2 projects
  const projectsWithContent = formData.projects.filter(p => p.title && p.title.trim())
  if (projectsWithContent.length >= 2) {
    score += 10
  }

  // +10 if at least 1 experience entry
  const experienceWithContent = formData.experience.filter(e => e.company && e.company.trim())
  if (experienceWithContent.length >= 1) {
    score += 10
  }

  // +10 if skills list has ≥ 8 items
  const skillsArray = formData.skills
    .split(',')
    .map(s => s.trim())
    .filter(s => s)
  if (skillsArray.length >= 8) {
    score += 10
  }

  // +10 if GitHub or LinkedIn link exists
  if ((formData.links.github && formData.links.github.trim()) || 
      (formData.links.linkedin && formData.links.linkedin.trim())) {
    score += 10
  }

  // +15 if any experience/project bullet contains a number (%, X, k, etc.)
  const allExperienceText = formData.experience
    .map(e => e.description)
    .join(' ')
  const allProjectText = formData.projects
    .map(p => p.description)
    .join(' ')
  const combinedText = (allExperienceText + ' ' + allProjectText).toLowerCase()
  
  const numberPattern = /(\d+\%|\d+k|\d+m|\d+x|[\d]+(?:\.\d+)?)/i
  if (numberPattern.test(combinedText)) {
    score += 15
  }

  // +10 if education section has complete fields
  const educationComplete = formData.education.filter(
    e => e.school && e.school.trim() && e.degree && e.degree.trim()
  )
  if (educationComplete.length > 0) {
    score += 10
  }

  // Cap at 100
  return Math.min(score, 100)
}

// Generate suggestions based on missing data
export function generateSuggestions(formData, atsScore) {
  const suggestions = []

  // Check projects
  const projectsWithContent = formData.projects.filter(p => p.title && p.title.trim())
  if (projectsWithContent.length < 2) {
    suggestions.push('Add at least 2 projects to boost your ATS score.')
  }

  // Check for measurable impact
  const allText = [
    ...formData.experience.map(e => e.description),
    ...formData.projects.map(p => p.description),
  ].join(' ')
  const numberPattern = /(\d+\%|\d+k|\d+m|\d+x|[\d]+(?:\.\d+)?)/i
  if (!numberPattern.test(allText)) {
    suggestions.push('Add measurable impact with numbers (%, growth, revenue, etc.) in your experience and projects.')
  }

  // Check skills
  const skillsArray = formData.skills
    .split(',')
    .map(s => s.trim())
    .filter(s => s)
  if (skillsArray.length < 8) {
    suggestions.push(`Add more skills (target 8+, you have ${skillsArray.length}).`)
  }

  // Check summary
  if (formData.summary) {
    const wordCount = formData.summary.trim().split(/\s+/).length
    if (wordCount < 40 || wordCount > 120) {
      suggestions.push(`Refine your summary (target 40–120 words, you have ${wordCount}).`)
    }
  } else {
    suggestions.push('Write a professional summary (40–120 words) to strengthen your profile.')
  }

  // Return max 3 suggestions
  return suggestions.slice(0, 3)
}
