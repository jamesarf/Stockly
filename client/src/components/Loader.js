import React from "react";

const Loader = (props) => {
    return (
        <div className="overlay">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
            {props.text ? (
                <div 
                className={`processing-text ${
                    props.text.includes('Error') 
                        ? 'text-red-700' 
                        : props.text === 'Processing' 
                            ? 'text-blue-500' 
                            : 'text-green-500'
                }`}
                >
                    {props.text}
                    <span className="blinking">...</span>
                </div>
            ) : (
                <div className="processing-text">
                    Processing
                    <span className="blinking">...</span>
                </div>
            )}
        </div>
    );
};

export default Loader;
