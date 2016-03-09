import express from 'express'
import {Server} from 'http'
import {read, set} from '../common/firebaseHelpers'
import Firebase from 'firebase'
import bodyParser from 'body-parser'
import {getClientIp} from './helpers'
import maxmind from 'maxmind'
import credentials from './credentials'

const app = express()
const server = Server(app)

const port = 8011
const url = 'https://governmentsk.firebaseio.com/'
const firebase = new Firebase(url)


function computeStatistics() {
  let statistics = {}
  return read(firebase.child('results'))
  .then((results) => {
    for (let ip in results) {
      for (let idUser in results[ip]) {
        if (statistics[results[ip][idUser].s] == null) {
          statistics[results[ip][idUser].s] = {parties: results[ip][idUser].parties, votes: 1}
        } else {
          statistics[results[ip][idUser].s].votes += 1
        }
      }
    }
    //console.log('statistics', statistics)
    return statistics
  })
}


//structure of statistics:
// statistics: {
//   cislovlady: {
//      parties: ....ids parties
//     number: 47
//   }
// }

server.listen(port, '127.0.0.1', () => {
  console.log('Server started at port %s!', port)
})

app.use(bodyParser.json())


app.post('/results', (req, res) => {
  let id = firebase.push().key()
  set(firebase.child('results').child(getClientIp(req).replace(/\./g, '-')).child(id), req.body)
  .then(() => {
    return computeStatistics()
    .then((s) => {
      let statistics = s
      res.json(statistics)
    })
  })
})

function computeIpsArray() {
  return read(firebase.child('results'))
  .then((results) => {
    let ipsArray = {}
    for (let ip in results) {
      for (let idUser in results[ip]) {
        if (ipsArray[ip] === undefined) {
          ipsArray[ip] = 1
        } else {
          ipsArray[ip] += 1
        }
      }
    }
    return ipsArray
  })
}
app.get('/cities', (req, res) => {
  let locations = []
  maxmind.init(__dirname + '/GeoLiteCity.dat')
  return read(firebase.child('results'))
  .then((results) => {
    for (let ip in results) {
      let ip2 = String(ip.replace(/\-/g, '.'))
      //console.log(ip2)
      let location = maxmind.getLocation(ip2)
      for (let id in results[ip]) {
        locations.push(location)
      }
    }
    //console.log('loc', locations)
    res.send(locations)
  })
})


app.get('/ip', (req, res) => {
  let ip = getClientIp(req).replace(/\./g, '-')
  res.send(ip)
})

app.get('/ips', (req, res) => {
  return computeIpsArray()
    .then((ipsArray) => {
      res.json(ipsArray)
    })
})

app.get('/statistics', (req, res) => {
  return computeStatistics()
    .then((s) => {
      let statistics = s
      res.json(statistics)
    })
})


firebase.authWithPassword(credentials, function(error, authData) {
  if (error) {
    console.log('Login Failed!', error)
  } else {
    console.log('Authenticated successfully with payload:', authData)
  }
})

app.get('*', (req, res) => {
  res.send(
    '<html> <head> ' +
      '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js"> </script>' +
      '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">' +
    '<script type="text/javascript" src="http://127.0.0.1:8888/build/app.js"> </script>' +
    '</head> <body>' +
    '<div id="fb-root"></div>' +
'<script>(function(d, s, id) {' +
  'var js, fjs = d.getElementsByTagName(s)[0];' +
  'if (d.getElementById(id)) return;' +
  'js = d.createElement(s); js.id = id;' +
  'js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";' +
  'fjs.parentNode.insertBefore(js, fjs);' +
'}(document, \'script\', \'facebook-jssdk\'));</script>' +
 '<script src="https://apis.google.com/js/platform.js" async defer></script>' +
       '<div id="app"> </div>' +
       '<g:plusone></g:plusone>' +
    '</body> </html>'
  )
})
