

import  Alert  from "./Alert";
import { useState } from "react";
function ListElements({listStates,onSelectedItem}) {
  
  let [selctedState, setSelectedState] = useState(-1);
  

  let getErrorMessage = (list) => {
    return list == 0 && <p>No States exist</p>;
  };
  
  let handleClickEvent = (e,index) => {
    setSelectedState(index) 
    
  };


  // listStates = []
  return (
    <>
    {  selctedState != -1 && <Alert closed={() => setSelectedState(-1)}>{listStates[selctedState] + " is selected"}</Alert> }
      <ul className="list-group" style={{cursor:"pointer"}}>
        {getErrorMessage(listStates)}
        {listStates.map((state, index) => (
          <li
            className={ index == selctedState ? "list-group-item active" : "list-group-item"}
            key={state + index}
            onClick={(event) =>{
                handleClickEvent(event,index);
                onSelectedItem(state)
            }}
          >
            {state}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListElements;
