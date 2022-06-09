import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Dropdown = ({ commands, select, selectedCommand }) => {
  const [active, setActive] = useState(false)
  return (
    <div className="field">
    <div className={active ? 'dropdown is-active' : 'dropdown'}>
    <div className="dropdown-trigger">
      <button onClick={() => setActive(!active)} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>{selectedCommand.commandName}</span>
        <span className="icon is-small">
          <i className="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div className="dropdown-menu" id="dropdown-menu" role="menu">
      <div className="dropdown-content">
        {commands.map(command => {
          return (
            (
              <a onClick={() => {
                select(command)
                setActive(false)
              }} key={command.commandName} className="dropdown-item">
                {command.commandName}
              </a>
            )
          )
        })
      }
      </div>
    </div>
  </div>
  </div>

  )
}

Dropdown.propTypes = {
  commands: PropTypes.array,
  selectedCommand: PropTypes.any,
  select: PropTypes.func
}

export default Dropdown
