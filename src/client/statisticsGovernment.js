import React from 'react'
import lodash from 'lodash'
import d3 from 'd3'
import GraphGovernment from './graphGovernment'

export class StatisticsGovernment extends React.Component {
  isEmpty(object) {
    for(let key in object) {
      if(object.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }

  getNumbOfUsers() { // prepared for selection of some country
    let numbOfUsers = 0
    for (let id in this.props.state.statistics) {
      if (this.props.state.statistics[id] !== null) {
        {
          numbOfUsers += this.props.state.statistics[id].votes
          //console.log(this.props.state.statistics[id].votes)
        }
      }
    }
    //console.log(this.props.state.statistics)
    return numbOfUsers
  }


  render() {
  //  console.log('paries', this.props.state.parties)
  //  console.log('statistics', this.props.state.statistics)
  //  console.log('paries', this.isEmpty(this.props.state.parties))
  //  console.log('statistics', this.isEmpty(this.props.state.statistics))
    if ((this.isEmpty(this.props.state.statistics)) || (this.isEmpty(this.props.state.parties))) {
      return (
        <div>
          <center>
          Loading...
          </center>
        </div>
      )
    } else {
      let numbOfUsers = this.getNumbOfUsers()
      //console.log('idem kreslit graf')
      return (
      <div>

      <h3><center>
      Výsledky hlasovania akú vládu si želajú slovenskí občania:
        </center>
      </h3>
      <center>
        <GraphGovernment {...this.props}/>
      </center>
      <h3>
      <center>
        Doposiaľ hlasovalo {numbOfUsers} Slovákov. Ďakujeme.
      </center>
      </h3>
      </div>
    )

    }
  }
}
