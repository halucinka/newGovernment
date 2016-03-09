import Firebase from 'firebase'

const url = 'https://haluc.firebaseio.com/'
const firebase = new Firebase(url)

firebase.createUser({
  email: 'gugugu@gugugu.com',
  password: 'muchpasswordwowsecurity'
}, (err, data) => {
  if (err) {
    console.log(err)
  }
  console.log(data)
})

// uid: 'c0f6246f-629e-4d4c-a3a1-7ab1f33a962a'
