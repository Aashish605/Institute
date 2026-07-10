import { useEffect } from 'react'
import { SITE } from '../config/site'

export default function useDocumentTitle(title) {
  useEffect(() => {
    const prev = document.title
    document.title = title ? `${title} — ${SITE.pageTitle}` : SITE.pageTitle
    return () => { document.title = prev }
  }, [title])
}
