import React from "react";

function Invitation() {
    let welcomeNote = "Welcome to React"
    return <>
        <div className="d-flex justify-content-center align-items-center flex-column">
        {/* <p>Hello world !!!</p> */}
        <b>{welcomeNote}</b>
        </div>
        
    </>
}

export default Invitation;