export function performRequest(type, url, json) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status !== 200) {
          reject(`response status ${xhr.status}`)
        } else {
          resolve(xhr.responseText)
        }
      }
    }
    xhr.open(type, url, true)
    xhr.setRequestHeader('Accept', '*/*')
    if (json == null) {
      xhr.send(null)
    } else {
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.send(JSON.stringify(json))
    }
  })
}
