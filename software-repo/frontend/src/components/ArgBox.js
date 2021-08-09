import React from 'react'
import PropTypes from 'prop-types'
import '../styles/ArgBox.css'

const ArgDesc = (props) => {
  return (
    <label className="panel-block">
      <div className="arg-desc-container">
        <a style={{ textDecoration: 'none', color: 'black' }} href={props.source} target="_blank" rel="noreferrer">{props.name}</a>
      </div>
    </label>
  )
}

const ArgBox = (props) => {
  const { title, data } = props
  console.log(data)
  return (
    <article className={`argbox-container panel ${props.type}`}>
      <p className="panel-heading">
        {title}
      </p>
      {data.map(arg => {
        return (
          <ArgDesc name={arg.name} source={arg.source} key={title} />
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
  name: PropTypes.string,
  source: PropTypes.string
}

export default ArgBox
