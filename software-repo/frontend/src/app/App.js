import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import '../styles/App.css'
import ToolList from '../features/ToolList/ToolList'
import ToolPage from '../features/ToolPage/ToolPage'
import NoMatch from '../components/NoMatch'
function App () {
  return (
    <Router >
      <div className="App">
        <Switch>
          <Route path="/tool/:id" component={ToolPage}/>
          <Route exact path="/">
            <ToolList />
          </Route>
          <Route path="*">
            <NoMatch/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
