import React from 'react'
import {ProgressBar, Row, Col} from 'react-bootstrap'
//import lodash from 'lodash'
//import d3 from 'd3'


export default class GraphGovernment extends React.Component {

  getNumbOfUsers() { // prepared for selection of some country
    let numbOfUsers = 0
    for (let id in this.props.state.statistics) {
      if (this.props.state.statistics[id] !== null) {
        {
          numbOfUsers += 1
        }
      }
    }
    return numbOfUsers
  }

  numberToString(number) { //transform 11000000 -> Smer + SaS
    let array = []
    for (let id in this.props.state.parties) {
      for (let i = 0; i < 8; i++) {
        if (i === this.props.state.parties[id].number) {
          array[i] = this.props.state.parties[id].name
        }
      }
    }
    //console.log('pole stran', array)
    let s = ''
    for (let i = 0; i < 8; i++) {
      //console.log('number[i]', number[i])
      if (number[i] === '1') {
        //console.log('cislo sa rovna 1')
        if (s == '') {

          s = array[i]
        } else {
        //  console.log('pridavam ', array[i])
          s = s + ' + ' + array[i]
        }
      }
    }
    console.log('pretavene cislo na strany', s, ' ', number)
    return s
  }


  render() {
    console.log(this.props.state.statistics)
    let data = []
    let dataParties = []
    let i = 0
    let numbOfUsers = this.getNumbOfUsers()
    for (let id in this.props.state.statistics) {
      let s = this.numberToString(id)
      dataParties[i] = {name: s, votes: Number(this.props.state.statistics[id].votes)}
      console.log(dataParties[i].votes)
      if (this.props.state.statistics[id].votes > 0) {
        data[i] = [s, 100 * this.props.state.statistics[id].votes / numbOfUsers]
      } else {
        data[i] = [s, 0]
      }
      i += 1
    }
    console.log(data)

    let color = ['', 'info']
    let res = []
    for (let i = 0; i < data.length; i++) {
      res.push(<div>{data[i][0]}</div>)
      res.push(<ProgressBar bsStyle ={color[i % 2]} now={data[i][1]} label="%(percent)s%" />)
    }

    return(
      <div>
        <Row>
          <Col md={2}/>
          <Col md={8}>
            {res}
          </Col>
        </Row>
      </div>
    )
  }
}
