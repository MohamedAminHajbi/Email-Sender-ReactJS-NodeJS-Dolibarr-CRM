import React from 'react'
import './CustomButton.css'

function CustomButton({onClick}) {
  return (
    <div>
        <button className="fancy" type='submit' onClick={onClick}>
        <span className="top-key"></span>
        <span className="text">Send</span>
        <span className="bottom-key-1"></span>
        <span className="bottom-key-2"></span>
        </button>
    </div>
  )
}

export default CustomButton