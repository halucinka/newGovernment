import {Promise} from 'bluebird'

export function read(ref) {
  return new Promise(
    (resolve, reject) => ref.once('value', (snap) => {resolve(snap.val())}, reject)
  )
}

export function set(ref, val) {
  return new Promise((resolve, reject) => {
    ref.set(val, (err) => {
      if (err == null) {
        resolve(null)
      } else {
        reject(err)
      }
    })
  })
}
