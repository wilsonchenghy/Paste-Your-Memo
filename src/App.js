import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [inputNote, changeInputNote] = useState("");
  const [notes, addNewNotesToArray] = useState([]);

  const addNewNotes = () => {
    if(inputNote.trim() !== "") {
      addNewNotesToArray([...notes, inputNote]);
      changeInputNote("");
    }
  }

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  return (
    <div className='container'>
      <div className="inputContainer">
        <label>Enter Notes: </label>
        <input type='text' value={inputNote} onChange={(event) => changeInputNote(event.target.value)}/>
        <button onClick={addNewNotes}>Add</button>
      </div>
      
      <div className='notesContainer'>
        {notes.map((note, index) => (
          <ul key={index} className='note'>{note}</ul>
        ))}
      </div>
    </div>
  );
}

export default App;
