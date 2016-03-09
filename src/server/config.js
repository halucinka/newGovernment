import Firebase from 'firebase'

const url = 'https://governmentsk.firebaseio.com/'
const firebase = new Firebase(url)

firebase.authWithPassword({
  email: 'government@gugugu.com',
  password: 'FicoJeKusBlbca'
}, function(error, authData) {
  if (error) {
    console.log('Login Failed!', error)
  } else {
    console.log('Authenticated successfully with payload:', authData)
  }
})
