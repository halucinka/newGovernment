import React from 'react'
import {read} from '../common/firebaseHelpers'
import {performRequest} from './helpers'
import Firebase from 'firebase'
import {StatisticsParties} from './statisticsParties'
import GovernmentSelector from './governmentSelector'
import {NavBar} from './navBar'
import {StatisticsGovernment} from './statisticsGovernment'
import {ButtonInput, Row, Col} from 'react-bootstrap'
import {OverLayWindow} from './overLayWindow'
import {Maps} from './maps'
import{Home} from './home'
//import {initialize} from './initialize'

// TODO minor: create firebase on one place, then import it to all places where it is needed.
const url = 'https://governmentsk.firebaseio.com/'

const firebase = new Firebase(url)

export default class Hello extends React.Component {

  componentWillMount() {
    //initialize()
    this.setState({})
    this.getStatistics()
    this.getCities()



    this.globalState = {
      parties: [],
      status: 'home',
      disabled: true,
      statistics: {},
      votedParties: {},
      ip: null,
      ipsArray: null,
      loc: null,
      sum: 0
    }

    this.dispatch = (fn) => {
      this.globalState = fn(this.globalState)
      this.setState({})
    }

    read(firebase.child('parties'))
    .then((parties) => {
      this.getIps()
      .then((ipsArray) => {
        this.getIp()
        .then((ip) => {
          this.dispatch((state) => {return {...state, state: 'home', parties: parties, ipsArray: ipsArray, ip: ip}})
        })
      })
    })
  }

  fromIdsToArray(ids) {
    let array = [false, false, false, false, false, false, false, false]
    for (let i of ids) {
      for (let id2 in this.globalState.parties) {
        if (i === id2) {
          array[this.globalState.parties[id2].number] = true
        }
      }
    }
    return array
  }

  fromArrayToString(array) {
    let s = ''
    for (let i of array) {
      if (i) {
        s = s + '1'
      } else {
        s = s + '0'
      }
    }
    console.log(array)
    console.log(s)
    return s
  }

  postResults() {
    console.log(this.globalState.votedParties)
    let array = this.fromIdsToArray(this.globalState.votedParties)
    let s = this.fromArrayToString(array)
    console.log(array)
    performRequest('post', '/results', {
      'parties': this.globalState.votedParties,
      'array': array,
      's': s
    })
  }

  getCities() {
    return performRequest('get', '/cities')
    .then((loc) => {
      this.dispatch((state) => {return {...state, loc: JSON.parse(loc)}})
    })
  }

  getIp() {
    return performRequest('get', '/ip')
    .then((ip) => {
      return ip
    })
  }

  getIps() {
    return performRequest('get', '/ips')
    .then((ipsArray) => {
      return JSON.parse(ipsArray)
    })
  }


  getStatistics() {
    performRequest('get', '/statistics')
    .then((statistics) => {
      this.dispatch((state) => {return {...state, statistics: JSON.parse(statistics)}})
    })
  }



  render() {
    return (
      <div>
        <NavBar state={this.globalState} dispatch={this.dispatch}/>
        {(() => {
          if (this.globalState.status === 'home') {
            return (
              <Home
                state={this.globalState}
                dispatch={this.dispatch}
             />
            )
          } else if (this.globalState.status === 'dotaznik') {
            let res = []
            res.push(
              <div>
              <GovernmentSelector
                      state={this.globalState}
                      dispatch={this.dispatch}/>
                      <center>
                      <div>
                        <Row>
                          <Col md={1}/>
                          <Col md={10}>
                        <ButtonInput
                          type="submit"
                          disabled = {this.globalState.disabled}
                          bsStyle="success"
                          bsSize="large"
                          onClick = {(e) => {
                            this.postResults()
                            this.getStatistics()
                            this.getCities()
                            this.dispatch((state) => {
                              return {...state,
                              status: 'preferencie'}
                            })
                          }}
                        > Submit
                        </ButtonInput>
                        </Col>
                        </Row>
                        </div>
                      </center>
                </div>
              )
            if((this.globalState.ip !== null) && (this.globalState.ipsArray[this.globalState.ip] > 3)) {
              res.push(
                <div>
                  <OverLayWindow
                    state={this.globalState}
                    dispatch={this.dispatch}/>
                </div>
              )
            }
            return(<div>{res}</div>)
          } else if (this.globalState.status === 'preferencie') {
            return (
              <StatisticsGovernment
                state={this.globalState}
                dispatch={this.dispatch}
             />
            )
          } else if (this.globalState.status === 'strany') {
            return (
              <div>
              <StatisticsParties
              state={this.globalState}
              dispatch={this.dispatch}
            />
            </div>
            )
          } else if (this.globalState.status === 'mapa') {
            //console.log('idem do mapy')
            return (
              <div>
                <Maps
                  state={this.globalState}
                  dispatch={this.dispatch}
               />
              </div>
             )
          }
        })()
      }


      <div className="fb-like"
      data-href="http://novavlada.vacuumlabs.com/"
      data-layout="standard" data-action="like" data-show-faces="true"
      data-share="true"></div>
    </div>)
  }
}
