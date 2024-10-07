import React from "react"
const Loader = (props) => {
    return (
        <div class="overlay">
            <div className="processing-spinner"></div>
            {props.text ? 
            <div  className="processing-text">{props.text}<span className="blinking">...</span></div> 
            : 
            <div  className="processing-text">Processing<span className="blinking">...</span></div>}
            

        </div>
    )
}
export default Loader;