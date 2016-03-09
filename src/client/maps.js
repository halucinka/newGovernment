import React from 'react'
import GoogleMapsLoader from 'google-maps'
import {performRequest} from './helpers'
import MapsRender from './mapsRender'

export class Maps extends React.Component {

  render() {
    if (this.props.state.loc == null) {
      return(<div>Loading...</div>)
    }  else {
      //console.log('kreslim mapu, loc je: ', this.props.state.loc)
      return (
      <div>
      <h3><center>Ľudia hlasujú z celého sveta: </center></h3>
      <MapsRender {...this.props}/>
      </div>
    )
    }
  }
}
