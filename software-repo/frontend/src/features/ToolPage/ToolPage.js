// import React, { useState } from 'react'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import '../../styles/ToolPage.css'
import ArgBox from '../../components/ArgBox'
import Loader from '../../components/Loader'
import Dropdown from '../../components/Dropdown'
import { setCommand } from './toolPageSlice'
function ToolPage (props) {
  const dispatch = useDispatch()
  const { tools, loading } = useSelector((state) => state.toolList)
  const { params } = props.match
  const tool = tools.find(elem => elem.linkName === params.id)

  useEffect(() => {
    if (tool) {
      dispatch(setCommand(tool.commands[0]))
    }
  }, [dispatch, loading]
  )

  const selectedCommand = useSelector((state) => state.toolPage.command)
  const output = selectedCommand !== null ? [{ name: `${selectedCommand.commandName} Example Output`, source: selectedCommand.output }] : []
  const input = selectedCommand !== null ? [{ name: selectedCommand.inputName, source: selectedCommand.inputSource }] : []
  const numCommands = tool ? tool.commands.length : 0
  const dispatchSelect = (command) => dispatch(setCommand(command))
  return (
   <div className="tool-page-container container">
      {(!tool) &&
        <Loader/>
      }
     {tool && selectedCommand &&
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
                        {/* {tool.desc} */}
                        <ReactMarkdown >
                          {tool.desc}
                        </ReactMarkdown>
                        {tool.website !== '' &&
                          <div>
                            Please visit <a href={tool.website} target="_blank" rel="noreferrer">{tool.website}</a> for source code and documentation
                          </div>}
                      </div>
                    </section>
                    {numCommands > 1 && (
                      <div className="tool-select">
                         <section className="section">
                           <div className="content">
                              <h1 className="title">Tool Selection</h1>
                              <p>Use the dropdown to View Examples For A Specific Python Tool</p>
                              <Dropdown commands={tool.commands} select={dispatchSelect} selectedCommand={selectedCommand}/>
                           </div>
                         </section>
                      </div>
                    )}
                    <div className="input-output" >
                      <section className="section">
                        <div className="content">
                          <h1 className="title">Inputs</h1>
                          <p>Below are links to example input {'file(s)'} that can be used with {selectedCommand.commandName}</p>
                          <div className="input-files">
                            <ArgBox type="is-info" title="Input Files" data={input}/>
                          </div>
                        </div>
                        <div className="content portal-params">
                          <h2 className='subtitle'>NSG Portal Parameters</h2>
                          <p>These are the required parameters need to needed to run the example input file {selectedCommand.commandName} on the NSG Portal.</p>
                          {selectedCommand.portal !== null && <img className='portal-params-image' src={selectedCommand.portal} alt="Portal Params Placeholder"></img>}
                        </div>
                        <div className="content rest-params">
                          <h2>NSG REST API Parameters</h2>
                          <h3>Required Parameters</h3>
                          <ul>
                            <li><code>username</code>: Your NSG Username</li>
                            <li><code>$PASSWORD</code>: Your NSG Password</li>
                            <li><code>$KEY</code>: Appplication ID</li>
                            <li><code>$URL</code>: The job submission url is of the form <i>https://nsgr.sdsc.edu:8443/cipresrest/v1/job/username</i> </li>
                            <li><code>tool</code>:The tool field identifies the tool to be used, in this case, <code>{tool.toolName}</code>. Job submissions must always include a tool. </li>
                            <li><code>input.infile_</code>:This field identifies the main data file to be operated on. The input file should be of <code>zip</code> file format</li>
                          </ul>
                          <h3>Optional Parameters</h3>
                          <ul>
                            <li><code>metadata.statusEmail</code>: If <code>true</code>, email will be sent on job completion. </li>
                          </ul>
                          <h3>Example REST API Usage </h3>
                          <pre>
                            {selectedCommand.api}
                          </pre>
                        </div>
                      </section>
                      <section className='section'>
                        <div className="content">
                          <h1>Ouput</h1>
                          <ArgBox type="is-success" title={`Output Files From ${selectedCommand.commandName}`} data={output}/>
                        </div>
                      </section>
                      <section className='section'>
                        <div className="content">
                          <h1>Singularity  Usage</h1>
                          <p>Below is an example of how to run the Singularity container</p>
                          <pre>
                          {selectedCommand.singularity.split('\n').map((line, index) => {
                            return (
                              <p key={line}>{index + 1}. $ { line }</p>
                            )
                          })}
                          </pre>
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
