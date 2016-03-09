import Firebase from 'firebase'
import credentials from './credentials'

const url = 'https://governmentsk.firebaseio.com/'
const firebase = new Firebase(url)

firebase.authWithPassword(credentials, function(error, authData) {
  if (error) {
    console.log('Login Failed!', error)
  } else {
    console.log('Authenticated successfully with payload:', authData)
  }
})
