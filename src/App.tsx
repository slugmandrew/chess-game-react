import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Col, Container, Row} from "reactstrap";
import {Board} from "./components/Board";


function App() {
  return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <h1>Chess Game</h1>
            </Col>
          </Row>
          <Row>
            <Col className={'d-flex justify-content-center'}>
              <Board/>
            </Col>
          </Row>
        </Container>
      </div>
  );
}

export default App;
