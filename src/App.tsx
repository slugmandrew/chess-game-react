import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Col, Container, Row } from "reactstrap";
import { Board } from "./components/Board";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Test } from "./Test";

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
            <Col className={'d-flex justify-content-center'}>
              <Switch>
                <Route path={"/test"} component={Test} />
                <Route exact path={"/"} component={Board} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
