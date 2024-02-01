import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [inputNote, changeInputNote] = useState("");
  const [notes, addNewNotesToArray] = useState([]);


  const addNewNotes = () => {
    if(inputNote.trim() !== "") {

      // send a POST request to create a new memo in the MongoDB database - using axios
      axios.post("http://localhost:5001/memos", {content: inputNote})
        .then((response) => {
          addNewNotesToArray([...notes, response.data.content]);
          changeInputNote("");
        })
          .catch((error) => {console.error("Error adding new memo: ", error)});
        
    }
  }


  useEffect(() => {

    axios.get("http://localhost:5001/memos")
      .then((response) => {
        addNewNotesToArray(response.data.map((memo) => memo.content))
      })
        .catch((error) => {console.error("Error fetching pre-existing memos: ", error)});
  }, []);


  // useEffect for logging the change in the notes array- trigger everytime the notes array change
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
      
      <div className='memosContainer'>
        {notes.map((note, index) =>
          <div className='memo'> 
            <ul key={index}>{note}</ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
