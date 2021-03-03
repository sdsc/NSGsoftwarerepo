import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './app/App'
import store from './app/store'
import { Provider } from 'react-redux'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'github-markdown-css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
