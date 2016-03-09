import React from 'react'
import GoogleMapsLoader from 'google-maps'
import {performRequest} from './helpers'
import d3 from 'd3'
import {averageCountry} from './averageCountry'

export function generateIcon(number, callback) {
  let generateIconCache = {}
  if (generateIconCache[number] !== undefined) {
    callback(generateIconCache[number])
  }

  let fontSize = 16,
    imageWidth = 35,
    imageHeight = 35

  if (number >= 1000) {
    fontSize = 10
    imageWidth = imageHeight = 55
  } else if (number < 1000 && number > 100) {
    fontSize = 14
    imageWidth = imageHeight = 45
  }

  let svg = d3.select(document.createElement('div')).append('svg')
    .attr('viewBox', '0 0 54.4 54.4')
    .append('g')

  let circles = svg.append('circle')
    .attr('cx', '27.2')
    .attr('cy', '27.2')
    .attr('r', '21.2')
    .style('fill', '#006dcc')

  let path = svg.append('path')
    .attr('d', 'M27.2,0C12.2,0,0,12.2,0,27.2s12.2,27.2,27.2,27.2s27.2-12.2,27.2-27.2S42.2,0,27.2,0z M6,27.2 C6,15.5,15.5,6,27.2,6s21.2,9.5,21.2,21.2c0,11.7-9.5,21.2-21.2,21.2S6,38.9,6,27.2z')
    .attr('fill', '#FFFFFF')

  let text = svg.append('text')
    .attr('dx', 27)
    .attr('dy', 32)
    .attr('text-anchor', 'middle')
    .attr('style', 'font-size:' + fontSize + 'px; fill: #FFFFFF; font-family: Arial, Verdana; font-weight: bold')
    .text(number)

  let svgNode = svg.node().parentNode.cloneNode(true),
    image = new Image()

  d3.select(svgNode).select('clippath').remove()

  let xmlSource = (new XMLSerializer()).serializeToString(svgNode)

  image.onload = (function(imageWidth, imageHeight) {
    let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      dataURL

    d3.select(canvas)
      .attr('width', imageWidth)
      .attr('height', imageHeight)

    context.drawImage(image, 0, 0, imageWidth, imageHeight)

    dataURL = canvas.toDataURL()
    generateIconCache[number] = dataURL

    callback(dataURL)
  }).bind(this, imageWidth, imageHeight)

  image.src = 'data:image/svg+xml;base64,' +
  btoa(encodeURIComponent(xmlSource).replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode('0x' + p1)
  }))
}







export default class MapsRender extends React.Component {

  componentDidMount() {
    let ac = averageCountry
    //console.log('ac', ac)
    let markers = {}
    for (let i = 0; i < ac.length; i++) {
      let name = ac[i].name
      markers[name] = {name: ac[i].name, lat: ac[i].lat, long: ac[i].long, value: 0}
      //console.log(markers[name])
       // value = number of people who voted
    }

    for (let id in this.props.state.loc) {
      if(this.props.state.loc[id] !== null) {
        if(this.props.state.loc[id].countryCode !== null) {
          //if (this.props.state.loc[id].countryName !== 'Slovakia') {
          let name = this.props.state.loc[id].countryCode
          //console.log(name)
          markers[name].value += 1
          //}
        }
      }
    }
    //console.log(markers)



    let map
  //console.log('this', this.props.state.loc)
    //let loc = this.props.state.loc
    let b = {lat: 48, lng: 17}
    GoogleMapsLoader.load(function(google) {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: b,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      })

      let bounds = new google.maps.LatLngBounds()
      for (let i in markers) {
        if (markers[i].value > 0) {
          generateIcon(markers[i].value, function(src) {
            let pos = new google.maps.LatLng(markers[i].lat, markers[i].long)
            bounds.extend(pos)
            new google.maps.Marker({
              position: pos,
              map: map,
              icon: src
            })
          })
        }
      }

    })
  }
  render() {

    return (<div id="map" style={{height: '100%'}}> </div>)

  }
}
