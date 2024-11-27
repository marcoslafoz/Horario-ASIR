import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import './sticky-note.css'
import stickyNotesData from '../../assets/json/sticky-notes.json'

interface Note {
  note: string
}

export const StickyNote: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [falling, setFalling] = useState(false)

  useEffect(() => {
    setNotes(stickyNotesData)
  }, [])

  const handleDivClick = () => {
    setFalling(true)
  }

  const handleLinkClick = (event: React.MouseEvent) => {
    event.stopPropagation() 
  }

  return (
    <div
      className={clsx('sticky-note', { falling })}
      onClick={handleDivClick}
    >
      <ul className="sticky-list">
        {/*TODO: REMOVE ME AFTER 5/12*/}
        <a
          className="hover:underline"
          target="_blank"
          href="https://drive.google.com/file/d/1p-BzRWNG67sIAV6i0VBnO0ExgvnilgZs/view?usp=sharing"
          rel="noreferrer"
          onClick={handleLinkClick} 
        >
          <li>📚 Calendario Examenes</li>
        </a>
        <li>🗣️ 29 Nov Speaking Inglés</li>
        {notes.map((note, index) => (
          <li key={index}>{note.note}</li>
        ))}
      </ul>
    </div>
  )
}
