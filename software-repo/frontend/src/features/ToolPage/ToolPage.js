import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../styles/ToolPage.css'
import ArgBox from '../../components/ArgBox'
import Loader from '../../components/Loader'

function ToolPage (props) {
  const { tools, loading } = useSelector((state) => state.toolList)

  const { params } = props.match
  const tool = tools.find(elem => elem.id === params.id)
  const output = tool !== undefined ? [{ name: `${tool.name} Example Output`, source: tool.portalOutput }] : []
  return (
   <div className="tool-page-container container">
      {loading === 'fetching' &&
        <Loader/>
      }
     {loading === 'idle' &&
           <div className="tool-page-content">
              <div className="tool-page-header">
                  <div className="tool-page-title">
                    <Link to={'/'}>
                    <button className="button is-info is-light">
                        <span className="icon is-small">
                          <i className="fas fa-arrow-circle-left"></i>
                        </span>
                        <span>Back To List</span>
                      </button>
                    </Link>
                    <div className="tool-page-title-container">
                      <h1 className="tool-page-child tool-name title is-3">
                        {tool.name}
                      </h1>
                      {tool.version && <span className="tag tool-version is-light is-normal">{tool.version}</span>}
                    </div>
                    <a href={tool.website} target="_blank" rel="noreferrer" className="tool-page-child subtitle is-4">
                      {tool.website}
                    </a>
                  </div>
                  <div className="tool-page-donwload">
                    <a href={tool.download_link} download className="button is-info">
                      <span className="icon is-small">
                        <i className="fas fa-arrow-circle-down"></i>
                      </span>
                      <span>Download</span>
                    </a>
                  </div>
              </div>
              <div className="details-container container">
                  <div className="page-desc">
                    <section className=" section">
                      <div className="content">
                        <h1 className="title">Description</h1>
                        {tool.desc}
                        {tool.website !== '' &&
                          <div>
                            Please visit <a href={tool.website} target="_blank" rel="noreferrer">{tool.website}</a> for source code and documentation
                          </div>}
                      </div>
                    </section>
                    <div className="input-output" >
                      <section className="section">
                        <div className="content">
                          <h1 className="title">Inputs</h1>
                          <p>Below are links to example input {'file(s)'} that can be used to with {tool.name}</p>
                          <div className="input-files">
                            <ArgBox type="is-info" title="Input Files" data={tool.data}/>
                          </div>
                        </div>
                        <div className="content portal-params">
                          <h2 className='subtitle'>NSG Portal Parameters</h2>
                          <p>These are the required parameters need to run {tool.name} on the NSG Portal.</p>
                          <img className='portal-params-image' src={tool.portalImageParams} alt="Portal Params"></img>
                        </div>
                        <div className="content rest-params">
                          <h2>NSG REST API Parameters</h2>
                          <h3>Required Parameters</h3>
                          <ul>
                            <li><code>username</code>: Your NSG Username</li>
                            <li><code>$PASSWORD</code>: Your NSG Password</li>
                            <li><code>$KEY</code>: Appplication ID</li>
                            <li><code>$URL</code>: The job submission url is of the form <i>https://nsgr.sdsc.edu:8443/cipresrest/v1/job/username</i> </li>
                            <li><code>tool</code>:The tool field identifies the tool to be used, in this case, {tool.toolName}. Job submissions must always include a tool. </li>
                            <li><code>input.infile_</code>:This field identifies the main data file to be operated on. The input file should be of <code>zip</code> file format</li>
                          </ul>
                          <h3>Optional Parameters</h3>
                          <ul>
                            <li><code>metadata.statusEmail</code>: If <code>true</code>, email will be sent on job completion. </li>
                          </ul>
                          <h3>Example REST API Usage </h3>
                          <pre>
                            {tool.apiCommand}
                          </pre>
                        </div>
                      </section>
                      <section className='section'>
                        <div className="content">
                          <h1>Ouput</h1>
                          <ArgBox type="is-success" title={`Output Files From ${tool.name}`} data={output}/>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
            </div>
     }
   </div>
  )
}

ToolPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string

    })
  })
}

export default ToolPage
