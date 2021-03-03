import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Link } from 'react-router-dom'
import '../../styles/ToolPage.css'
import { fetchReadme } from './toolPageSlice'
import ArgBox from '../../components/ArgBox'
import Loader from '../../components/Loader'

function ToolPage (props) {
  const { tools, loading: toolLoading } = useSelector((state) => state.toolList)
  const { tool: toolData, loading } = useSelector((state) => state.toolPage)

  const { params } = props.match
  const tool = tools.find(elem => elem.id === params.id)
  const [contentMode, setContentMode] = useState('details')
  const dispatch = useDispatch()
  useEffect(() => {
    if (toolLoading === 'idle') {
      dispatch(fetchReadme({ owner: tool.owner, repoName: tool.repoName }))
    }
  }, [tool])

  const input = [
    {
      title: 'Input 1',
      desc: 'Description of input 1',
      example: 'Ex: input1.zip'
    },
    {
      title: 'Input 2',
      desc: 'Description of input 2',
      example: 'Ex: input2.png'
    },
    {
      title: 'Input 3',
      desc: 'Description of input 3',
      example: 'Ex: input3.py'
    }
  ]

  const output = [
    {
      title: 'Output 1',
      desc: 'Description of output 1',
      example: 'Ex: out1.zip'
    },
    {
      title: 'Output 2',
      desc: 'Description of output 2',
      example: 'Ex: out2.png'
    }
  ]

  return (
   <div className="tool-page-container">
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
              <h1 className="tool-page-child title is-3">{tool.title}</h1>
              <a href={tool.git_url} target="_blank" rel="noreferrer" className="tool-page-child subtitle is-4">
                {tool.repo}
                {tool.version && <span className="tag is-light is-normal">{tool.version}</span>}
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
        <div className="tool-page-child tabs is-medium">
          <ul>
            <li onClick={() => { setContentMode('details') }} className={contentMode === 'details' ? 'is-active' : ''}><a>Details</a></li>
            <li onClick={() => { setContentMode('readme') }} className={contentMode === 'readme' ? 'is-active' : ''}><a>README</a></li>
          </ul>
        </div>
        <div className="details-container container markdown-body ">
          {contentMode === 'details' &&

              <div className="page-desc">
                <section className="section">
                  <h1 className="title">Description</h1>
                  {tool.description}
                </section>
                <section className="section">
                  <h1 className="title">Input/Output</h1>
                  <div className="in-n-out">
                    <ArgBox type="is-info" title="Input" data={input}/>
                    <span className="icon in-out-arrow has-text-grey">
                      <i className="fas fa-arrow-circle-right fa-3x"></i>
                    </span>
                    <ArgBox type="is-success" title="Output" data={output}/>
                  </div>
                </section>
              </div>
          }
          {contentMode === 'readme' && toolData.hasReadme === true && <ReactMarkdown plugins={gfm}>{toolData.readmeString}</ReactMarkdown>}
          {contentMode === 'readme' && toolData.hasReadme === false && 'No README file for this repo'}
        </div>
      </div>
     }
     {(loading === 'fetching' || toolLoading === 'fetching') &&
        <Loader/>
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
