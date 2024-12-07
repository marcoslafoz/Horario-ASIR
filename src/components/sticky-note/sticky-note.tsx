import React, { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import './sticky-note.css'
import stickyNotesData from '../../assets/json/sticky-notes.json'

interface Note {
  note: string
}

export const StickyNote: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [falling, setFalling] = useState(false)
  const stickyNoteRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setNotes(stickyNotesData)
  }, [])

  const handleDivClick = () => {
    setFalling(true)
  }

  const handleLinkClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }


  useEffect(() => {
    const element = stickyNoteRef.current
    if (!element) return

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName === 'opacity' && falling) {
        element.style.display = 'none'
      }
    }

    element.addEventListener('transitionend', handleTransitionEnd)
    return () => {
      element.removeEventListener('transitionend', handleTransitionEnd)
    }
  }, [falling])

  return (
    <div
      ref={stickyNoteRef}
      className={clsx('sticky-note', { falling })}
      onClick={handleDivClick}
    >
      <ul className="sticky-list">
        {notes.map((note, index) => (
          <li key={index}>{note.note}</li>
        ))}
      </ul>
    </div>
  )
}
