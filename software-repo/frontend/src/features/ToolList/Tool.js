import React from 'react'
import '../../styles/Tool.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Tool (props) {
  const { data } = props
  return (
    <div className="tool card">
      <header className="tool-header card-header">
        <p className="title is-6">{data.title}</p>
        <a href={data.git_url} target="_blank" rel="noreferrer" className="card-repo">
            {data.repo}
            {data.version && <span className="tag is-light is-rounded">{data.version}</span>}
        </a>
      </header>
      <div className="tool-content card-content">
        <div className="tool-text content">
            {data.description}
        </div>
      </div>
      <footer className="tool-buttons card-footer">
        <Link className="card-footer-item" to={`/tool/${data.id}`}>View</Link>
        <a href={data.download_link} download className="card-footer-item">Download</a>
      </footer>
    </div>
  )
}

Tool.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    version: PropTypes.string,
    id: PropTypes.string,
    repo: PropTypes.string,
    git_url: PropTypes.url,
    download_link: PropTypes.url
  })
}

export default Tool
