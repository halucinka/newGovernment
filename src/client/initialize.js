import {set} from '../common/firebaseHelpers'
import Firebase from 'firebase'
import {listOfParties} from './dataParties.js'
//import {url} from './main'
const url = 'https://governmentsk.firebaseio.com/'

const firebase = new Firebase(url)



export function initialize() {

  set(firebase, null)
  for (let i in listOfParties) {
    let id = firebase.push().key()
    let party = {name:listOfParties[i].name, number: listOfParties[i].number, hlasy: listOfParties[i].hlasy}
    set(firebase.child('parties').child(id), party)
  }
  console.log('hotovo.')
}
