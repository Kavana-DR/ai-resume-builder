// Hook to manage resume data with localStorage persistence
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'resumeBuilderData'

const defaultFormData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: ''
  },
  summary: '',
  education: [{ school: '', degree: '', field: '', year: '' }],
  experience: [{ company: '', position: '', duration: '', description: '' }],
  projects: [{ title: '', description: '', link: '' }],
  skills: '',
  links: {
    github: '',
    linkedin: ''
  }
}

export function useResumeData() {
  const [formData, setFormData] = useState(defaultFormData)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
      } catch (error) {
        console.error('Failed to parse saved data:', error)
        setFormData(defaultFormData)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save data to localStorage whenever it changes
  const updateFormData = (newData) => {
    setFormData(newData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
  }

  const clearData = () => {
    setFormData(defaultFormData)
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    formData,
    setFormData: updateFormData,
    clearData,
    isLoaded
  }
}
