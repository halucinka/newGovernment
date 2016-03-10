import React from 'react'
import {ProgressBar, Row, Col} from 'react-bootstrap'
import lodash from 'lodash'

export default class GraphParties extends React.Component {

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

  render() {
    let numbOfUsers = this.getNumbOfUsers()
    //console.log(this.props.state.statistics)
    let data = []
    let dataParties = {}
    for (let id in this.props.state.parties) {
      dataParties[id] = {name: this.props.state.parties[id].name, number: this.props.state.parties[id].number, votes: 0}
    }
    for (let number in this.props.state.statistics) {
      for (let id of this.props.state.statistics[number].parties) {
        dataParties[id].votes += 1
      }
    }
    //console.log(dataParties)
    dataParties = lodash.sortBy(dataParties, (obj) => -obj.votes)
    let i = 0
    for (let id in dataParties) {
      if (100 * dataParties[id].votes / numbOfUsers > 1) {
        data[i] = [dataParties[id].name, 100 * dataParties[id].votes / numbOfUsers]
      } else {
        data[i] = [dataParties[id].name, 0]
      }
      i += 1
    }

    let color = ['warning', 'success']
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
