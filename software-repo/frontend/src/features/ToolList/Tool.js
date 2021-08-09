import React from 'react'
import '../../styles/Tool.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Tool (props) {
  const { data } = props
  return (
    <div className="tool card">
      <header className="tool-header card-header" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link to={`/tool/${data.id}`}>
        <p className="title is-4">{data.name}  {data.version && <span className="tag is-light is-rounded">{data.version}</span>}</p>
        </Link>
        <a href={data.website} target="_blank" rel="noreferrer" className="card-repo">
            {data.website}
        </a>
      </header>
      <div className="tool-content card-content">
        <Link style={{ color: 'black' }} to={`/tool/${data.id}`}>
          <div className="tool-text content">
              {data.shortDesc}
          </div>
        </Link>
      </div>
      <footer className="tool-buttons card-footer">
      </footer>
    </div>
  )
}

Tool.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    shortDesc: PropTypes.string,
    version: PropTypes.string,
    id: PropTypes.string,
    repo: PropTypes.string,
    git_url: PropTypes.url,
    download_link: PropTypes.url,
    website: PropTypes.url
  })
}

export default Tool
