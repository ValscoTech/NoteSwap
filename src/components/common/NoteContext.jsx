import React, { createContext, useState, useContext } from 'react';

const NoteContext = createContext();

export function NoteProvider({ children }) {
  const [notesData, setNotesData] = useState([]);

  const addNote = (newNote) => {
    setNotesData((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <NoteContext.Provider value={{ notesData, addNote }}>
      {children}
    </NoteContext.Provider>
  );
}

export function useNotes() {
  return useContext(NoteContext);
}
