import React from 'react'
import PropTypes from 'prop-types'
import '../styles/ArgBox.css'

const ArgDesc = (props) => {
  return (
    <label className="panel-block">
      <div className="arg-desc-container">
        <p>{props.title}</p>
        <p>{props.desc}</p>
        <p>{props.example}</p>
      </div>
    </label>
  )
}

const ArgBox = (props) => {
  const { title, data } = props
  return (
    <article className={`argbox-container panel ${props.type}`}>
      <p className="panel-heading">
        {title}
      </p>
      {data.map(arg => {
        return (
          <ArgDesc title={arg.title} key={title} desc={arg.desc} example={arg.example} />
        )
      })}
    </article>
  )
}

ArgBox.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.array
}

ArgDesc.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  example: PropTypes.string
}

export default ArgBox
