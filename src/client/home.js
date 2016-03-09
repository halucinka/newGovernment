import React from 'react'
import {Jumbotron, Button, Row, Col} from 'react-bootstrap'

export class Home extends React.Component {

  render() {
    return(
      <div>
        <Row>
          <Col md={1}/>
          <Col md={10}>
    <Jumbotron>
    <center>
    <h2>Aká bude nová vláda?</h2>
    </center>
    <p>Tento prieskum spočítava obľúbenosť vlád, ktoré môžu vzísť z
    volebných výsledkov do slovenského parlamentu 2016.
    Na tejto stránke si každý vyberie strany, ktoré by chcel,
    aby tvorili vládu. Jediná podmienka, ktorá musí byť splnená je, že musia tvoriť parlamentnú väčšínu.
    Zahlasujte, a pozrite si, ktorý scenár je pre Slovákov najprijateľnejší.</p>
    <p><Button
    bsStyle="success"
    onClick = {(e) => {
      this.props.dispatch((state) => {
        return {...state,
        status: 'dotaznik'}
      })
    }}
    >Prejsť na dotazník</Button></p>
    </Jumbotron>
   </Col>
   </Row>
   </div>
    )
  }
}
