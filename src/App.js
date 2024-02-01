import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [inputContent, changeInputContent] = useState("");
  const [memosData, addMemosData] = useState([]);


  const addNewMemo = () => {
    if(inputContent.trim() !== "") {

      // send a POST request to create a new memo in the MongoDB database - using axios
      axios.post("http://localhost:5001/memos", {content: inputContent})
        .then((response) => {
          addMemosData([...memosData, response.data]);
          // addNewMemoIDToArray([...memoIDs, response.data._id]);
          changeInputContent("");
        })
          .catch((error) => {console.error("Error adding new memo: ", error)});
        
    }
  }

  const deleteMemo = (id) => {

    console.log(id);

    axios.delete(`http://localhost:5001/memos/${id}`)
      .then(() => {
        const updatedMemosArray = memosData.filter((memo) => memo._id !== id);
        addMemosData(updatedMemosArray);
      })
        .catch((error) => {console.error("Error deleting memo: ", error)});
  };


  const editMemo = () => {
    
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
    <div className='container'>
      <div className="inputContainer">
        <label>Enter Memo: </label>
        <input type='text' value={inputContent} onChange={(event) => changeInputContent(event.target.value)}/>
        <button onClick={addNewMemo}>Add</button>
      </div>
      
      <div className='memosContainer'>
        {memosData.map((memo) => {

          return(
            <div className='memo' key={memo._id}> 
              <button onClick={editMemo()}>edit</button>
              <ul>{memo.content}</ul>
              <button onClick={() => deleteMemo(memo._id)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
