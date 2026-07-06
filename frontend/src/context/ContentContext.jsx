import { createContext, useContext, useState, useEffect } from 'react'
import api from '../config/api'

const ContentContext = createContext({})

export function ContentProvider({ children }) {
  const [content, setContent] = useState({})

  useEffect(() => {
    api.get('/api/content')
      .then(res => setContent(res.data))
      .catch(() => {})
  }, [])

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => useContext(ContentContext)
