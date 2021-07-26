import React from 'react'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Test } from './Test'
import { Chess } from './components/Chess'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={'/test'} component={Test} />
          <Route exact path={'/'} component={Chess} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
