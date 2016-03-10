import React from 'react'
import lodash from 'lodash'
import d3 from 'd3'
import GraphParties from './graphParties'

export class StatisticsParties extends React.Component {
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
      Preferencie jednotlivých strán
        </center>
      </h3>
      <h4>
      <center>
      Hoci to, ako bude vyzerať vláda závisí od vzťahov a dohôd medzi stranami,
      tu sa môžeme pozrieť na graf, ktorú stranu si ľudia vybrali do vlády
      najčastejšie. Percento zodpovedá podielu vlád, za ktoré ľudia hlasovali, v ktorých sa nachádza daná strana.
      </center>
      </h4>
      <center>
        <GraphParties {...this.props}/>
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
