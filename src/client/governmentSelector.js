import React from 'react'
import {Button, ButtonToolbar, Grid} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'

export default class GovernmentSelector extends React.Component {

  getButton(id) {
    let res = []
    let color = 'btn btn-default'
    if (this.props.state.votedParties.indexOf(id) > -1) {
      color = 'btn btn-primary'
    }
    res.push(
          <Button
            type="button"
            className = {color}
            key={`${id}`}
            value = {id}
            checked={this.props.state.votedParties.indexOf(id) > -1}
            onClick={(e) => {
              let selected = this.props.state.votedParties
              let sum = this.props.state.sum
              let pair  = this.handleChange(e, selected, sum)
              //console.log(pair)
              selected = pair[0]
              sum = pair[1]
              let disabled = true
              if (sum > 75) {
                disabled = false
              }
              //console.log('sum', sum)
              this.props.dispatch((state) => {
                return {...state,
                        votedParties: selected,
                         sum: sum,
                         disabled: disabled
                       }
              })
            }}
          >{this.props.state.parties[id].name}
          </Button>
      )
    return res
  }

  componentWillMount() {
    this.props.dispatch((state) => {return {...state,  sum: 0, votedParties:[]}})
  }
  isEmpty(object) {
    for(let key in object) {
      if(object.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }


  handleChange(e, selected, sum) {
    let id = e.target.value
    if (selected.indexOf(id) === -1) {
      if (selected.indexOf(-1) !== -1) {
        selected[selected.indexOf(-1)] = id
        sum += this.props.state.parties[id].hlasy
      } else {
        selected.push(id)
        sum += this.props.state.parties[id].hlasy
      }
    } else {
      selected[selected.indexOf(id)] = -1
      sum -= this.props.state.parties[id].hlasy
    }
    let selected2 = []
    for (let k = 0; k < selected.length; k++) {
      if (selected[k] !== -1) {
        selected2.push(selected[k])
      }
    }
    selected = selected2
    console.log('vypisujem selected v handleChange', selected)
    let result = []
    result[0] = selected2
    result[1] = sum
    return result
  }

  render() {
    console.log(this.props.state.parties)
    if (this.isEmpty(this.props.state.parties)) {
      return (<div> <h3><center>Loading...</center></h3></div>)
    } else {
      let resUp = []
      let resDown = []
      let popisUp = []
      let popisDown = []
      let ids = []
      let f = 0
      for (let id in this.props.state.parties) {
        ids[f] = id
        f += 1
      }
      popisUp.push(
        <div>
          <Col xs={5} md={3}>{
            <div>
              <img height={100} src={require('../images/smer.png')}/>
              <h3>
                <center>
                  {this.props.state.parties[ids[0]].hlasy} kresiel
                </center>
              </h3>
            {this.getButton(ids[0])}
            </div>
          }</Col>
          <Col xs={5} md={3}>{
            <div>
              <img height={100} src={require('../images/sas.png')}/>
              <h3>
                <center>
                  {this.props.state.parties[ids[1]].hlasy} kresiel
                </center>
              </h3>
              {this.getButton(ids[1])}
            </div>
          }</Col>
          <Col xs={5} md={3}>{
            <div>
              <img height={100} src={require('../images/obyc-nova.png')}/>
              <h3>
                <center>
                  {this.props.state.parties[ids[2]].hlasy} kresiel
                </center>
              </h3>
             {this.getButton(ids[2])}
            </div>
          }</Col>
          <Col xs={5} md={3}>{
            <div>
              <img height={100} src={require('../images/sns.png')}/>
              <h3>
                <center>
                  {this.props.state.parties[ids[3]].hlasy} kresiel
                </center>
              </h3>
             {this.getButton(ids[3])}
            </div>
          }</Col>
        </div>
      )
      popisDown.push(
       <div>
         <Col xs={5} md={3}>{
           <div>
             <img height={100} src={require('../images/kotleba.png')}/>
             <h3>
               <center>
                 {this.props.state.parties[ids[4]].hlasy} kresiel
               </center>
             </h3>
             {this.getButton(ids[4])}
           </div>
         }</Col>
         <Col xs={5} md={3}>{
           <div>
             <img height={100} src={require('../images/smerodina.png')}/>
             <h3>
               <center>
                 {this.props.state.parties[ids[5]].hlasy} kresiel
               </center>
             </h3>
             {this.getButton(ids[5])}
           </div>
         }</Col>
         <Col xs={5} md={3}>{
           <div>
             <br/>
             <img height={60} src={require('../images/most.png')}/>
             <br/>
             <br/>
             <h3>
               <center>
                 {this.props.state.parties[ids[6]].hlasy} kresiel
               </center>
             </h3>
             {this.getButton(ids[6])}
           </div>
         }</Col>
         <Col xs={5} md={3}>{
           <div>
             <br/>
             <img height={60} src={require('../images/siet.png')}/>
             <br/>
             <br/>
             <h3>
               <center>
                 {this.props.state.parties[ids[7]].hlasy} kresiel
               </center>
             </h3>
             {this.getButton(ids[7])}
           </div>
         }</Col>
        </div>
      )



      return (
      <div>
      <h2>
      <center>
        Vyberte strany, ktoré tvoria Vami najprijateľnejšiu vládu:
      </center>
      </h2>
      <h4>
      <br/>
      <center>
        Zvoľte strany, ktoré majú v súčte viac ako polovicu kresiel v parlamente, tzn. viac ako 76.
      </center>
      </h4>
        <Grid>
              <Row>
              <center>
                  <div>
                  <br/>
                    {popisUp}
                  </div>
              </center>
              </Row>
              <Row>
                <Col xs={5} md={3}><br/></Col>
              </Row>
              <Row>
                  <center>
                      <ButtonToolbar>
                        {resUp}
                      </ButtonToolbar>
              </center>
              </Row>
              <Row>
                <Col xs={5} md={3}><br/><br/> </Col>
              </Row>
              <Row>
              <center>
                  <div>
                    {popisDown}
                  </div>
              </center>
              </Row>
              <Row>
                <Col xs={5} md={3}><br/> </Col>
              </Row>
              <Row>
                  <center>
                      <ButtonToolbar>
                        {resDown}
                      </ButtonToolbar>
              </center>
              </Row>
              <Row>
                <Col xs={5} md={3}><br/><br/> </Col>
              </Row>
              <Row>
                <h2>
                <center>
                Súčet kresiel v parlamente: {this.props.state.sum}
                </center>
                </h2>
              </Row>
              <Row>
                <Col xs={5} md={3}><br/><br/> </Col>
              </Row>
        </Grid>
            </div>
          )
    }
  }
}
