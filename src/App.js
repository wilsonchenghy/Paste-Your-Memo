import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [inputContent, changeInputContent] = useState("");
  const [memosData, addMemosData] = useState([]);

  const [isMemoInEditing, toggleIsMemoInEditing] = useState(false);
  const [memoInEditingData, changeMemoInEditingData] = useState([]);
  const [editedMemoContent, changeEditedMemoContent] = useState("");


  const addNewMemo = () => {
    if(inputContent.trim() !== "") {

      // send a POST request to create a new memo in the MongoDB database - using axios
      axios.post("http://localhost:5001/memos", {content: inputContent})
        .then((response) => {
          addMemosData([...memosData, response.data]);
          changeInputContent("");
        })
          .catch((error) => {console.error("Error adding new memo: ", error)});
        
    }
  }

  const deleteMemo = (id) => {

    axios.delete(`http://localhost:5001/memos/${id}`)
      .then(() => {
        const updatedMemosArray = memosData.filter((memo) => memo._id !== id);
        addMemosData(updatedMemosArray);
      })
        .catch((error) => {console.error("Error deleting memo: ", error)});
  };


  const editMemo = (memoData) => {
    toggleIsMemoInEditing(true);
    changeMemoInEditingData(memoData);
  }


  const confirmEdit = () => {
    
    axios.put(`http://localhost:5001/memos/${memoInEditingData._id}`, {content: editedMemoContent})
      .then((response) => {
        const updatedMemosArray = memosData.map((memo) => memo._id === memoInEditingData._id ? {...memo, content: response.data.content} : memo)
        addMemosData(updatedMemosArray);
      })
        .catch((error) => {console.error("Error in editing memo: ", error)});

    toggleIsMemoInEditing(false);
    changeMemoInEditingData([]);
  };


  const cancelEdit = () => {
    toggleIsMemoInEditing(false);
    changeMemoInEditingData([]);
  }


  useEffect(() => {

    axios.get("http://localhost:5001/memos")
      .then((response) => {
        addMemosData(response.data)
      })
        .catch((error) => {console.error("Error fetching pre-existing memos: ", error)});
  }, []);


  // useEffect for logging the change in the memosData array- trigger everytime the memosData array change
  useEffect(() => {
    console.log(memosData.map((memo) => memo.content));
  }, [memosData]);




  
  return (
    <div className={"container"}>
      <div className={`container2 ${isMemoInEditing ? "blurryBackground" : ""}`}>
        <div className="inputContainer">
          <label>Enter Memo: </label>
          <input type='text' value={inputContent} onChange={(event) => changeInputContent(event.target.value)}/>
          <button className='addButton' onClick={addNewMemo}>Add</button>
        </div>
        
        <div className='memosContainer'>
          {memosData.map((memo) => {

            return(
              <div className='memo' key={memo._id}> 
                <button onClick={() => editMemo(memo)}>edit</button>
                <ul>{memo.content}</ul>
                <button onClick={() => deleteMemo(memo._id)}>X</button>
              </div>
            );
          })}
        </div>
      </div>

      {isMemoInEditing && (
        <div className='editingAreaContainer'>
          <label>Edit Memo: </label>
          <input type='text' value={editedMemoContent} onChange={(event) => changeEditedMemoContent(event.target.value)}/>
          <button onClick={() => confirmEdit()}>ok</button>
          <button onClick={() => cancelEdit()}>X</button>
        </div>
      )}
    </div>
  );
}

export default App;
