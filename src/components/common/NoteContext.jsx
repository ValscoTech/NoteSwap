import React, { createContext, useState, useContext, useEffect } from "react";

const NoteContext = createContext();

export const useNotes = () => useContext(NoteContext);

export function NoteProvider({ children }) {

  const [notesData, setNotesData] = useState(() => {
    // Retrieve notes from localStorage
    const storedNotes = localStorage.getItem("notesData");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });

  // Save notes to localStorage whenever notesData is updated
  useEffect(() => {
    localStorage.setItem("notesData", JSON.stringify(notesData));
  }, [notesData]);

  const addNote = (newNote) => {
    setNotesData((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <NoteContext.Provider value={{ notesData, addNote }}>
      {children}
    </NoteContext.Provider>
  );
}
