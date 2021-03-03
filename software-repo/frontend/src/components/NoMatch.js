import React from 'react'
import Title from './Title'
import '../styles/NoMatch.css'
import { Link } from 'react-router-dom'

function NoMatch () {
  return (
    <div className="no-match">
      <Title/>
      <article className="no-match-message message is-danger">
        <div className="message-header">
          <p>Error</p>
        </div>
        <div className="message-body">
          Page Not Found <br/>
          <Link to="/">
            Click here to return to the main page
          </Link>
        </div>
      </article>
    </div>
  )
}

export default NoMatch
