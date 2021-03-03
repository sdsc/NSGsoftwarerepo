import React from 'react'
import { useSelector } from 'react-redux'
import Tool from './Tool'
import '../../styles/ToolList.css'
import Title from '../../components/Title'
import Loader from '../../components/Loader'
export default function ToolList () {
  const { tools, loading } = useSelector((state) => state.toolList)
  return (
    <div className="tool-list">
      <Title/>
      {loading === 'idle' &&
        <div className="list">
          {tools.map(tool => {
            return (
              <Tool key={tool.id} data={tool}/>
            )
          })}
        </div>
      }
      {loading === 'fetching' &&
        <Loader/>
      }
      {loading === 'error' &&
         <div className="error-message container">
            <article className="message is-danger">
            <div className="message-header">
              <p>Error</p>
            </div>
            <div className="message-body">
              Failed to fetch software list. Please refresh the page.
            </div>
          </article>
         </div>
      }
    </div>
  )
}
