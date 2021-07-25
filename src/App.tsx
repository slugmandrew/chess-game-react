import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Col, Container, Row } from 'reactstrap'
import { Board } from './components/Board'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Test } from './Test'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container>
          <Row>
            <Col>
              <h1>Chess Game</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Switch>
                <Route path={'/test'} component={Test} />
                <Route exact path={'/'} component={Board} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </div>
  )
}

export default App
