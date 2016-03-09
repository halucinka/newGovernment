import React from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'

export default class GovernmentSelector extends React.Component {

  render() {
    let res = []
    for (let id in this.props.state.parties) {

      res.push(
        <Button
          type="button"
          key={`${id}`}
          identificator = {id}
          checked={this.props.state.idOfVotedParty === id}
          onClick={(e) => {
            this.props.dispatch((state) => {
              return {...state,
                      status: 'dotaznikCandidates',
                      idOfVotedParty: id}
            })
          }}
        >{this.props.state.parties[id].name}
        </Button>
      )
    }
    return (
      <div className="container">
        <h3>
          <center>
          Zvoľte politickú stranu, ktorú ste volili:
          </center>
        </h3>
        <div className="text-center">
          <ButtonGroup vertical>
            {res}
          </ButtonGroup>
        </div>
      </div>
    )
  }
}
