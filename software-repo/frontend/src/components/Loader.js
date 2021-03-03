import React from 'react'
import '../styles/Loader.css'
function Loader () {
  return (
    <div className="loading-message">
      <div className="loading-bar"><progress className="progress is-large is-info" max="100">60%</progress></div>
      <div className="title">Loading</div>
    </div>
  )
}

export default Loader
