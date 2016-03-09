import React from 'react'
import {Nav, NavItem, Navbar} from 'react-bootstrap'

export class NavBar extends React.Component {

  render() {
    return(
      <div>
        <Navbar inverse>
          <Nav>
          <NavItem
            eventKey={0}
            onClick = {(e) => {
              this.props.dispatch((state) => {
                return {...state,
                         status: 'home'}
              })
            }}
          >Prieskum</NavItem>
            <NavItem
              eventKey={1}
              onClick = {(e) => {
                this.props.dispatch((state) => {
                  return {...state,
                           status: 'dotaznik'}
                })
              }}
            >Dotazník</NavItem>
            <NavItem
              eventKey = {2}
              onClick = {(e) => {
                this.props.dispatch((state) => {
                  return {...state,
                           status: 'preferencie'}
                })
              }}
            >Preferencie možných vlád</NavItem>
            <NavItem
              eventKey = {2}
              onClick = {(e) => {
                this.props.dispatch((state) => {
                  return {...state,
                           status: 'strany'}
                })
              }}
            >Šance jednotlivých strán</NavItem>
            <NavItem eventKey={3}
              onClick = {(e) => {
                this.props.dispatch((state) => {
                  return {...state,
                          status: 'mapa'}
                })
              }}
            > Mapa</NavItem>

          </Nav>
          <Nav pullRight>
          <NavItem
            eventKey = {1}
            href=
            "http://volby.vacuumlabs.com"
          >Predchádzajúci projekt - zahraničný predvolebný prieskum
        </NavItem>
            <NavItem
              eventKey = {2}
              href=
              "http://fici.sme.sk/c/20110985/"
            >Užitočný link
          </NavItem>
                  </Nav>
        </Navbar>
      </div>
      )
  }

}
