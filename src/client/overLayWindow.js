import React from 'react'
import {Button, Modal} from 'react-bootstrap'

export class OverLayWindow extends React.Component {

  componentWillMount() {
    this.setState({showModal: true})

  }
  close() {
    this.setState({showModal: false})
  }

  open() {
    this.setState({showModal: true})
  }
  render() {
    //let close = () => this.setState({show: false})
    return (
      <div className="static-modal">
      <Modal show = {this.state.showModal} onHide={this.close}>
      <Modal.Header closeButton>
       <Modal.Title>Upozornenie!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Z Vašej IP adresy už bohužial bolo viac krát odhlasované.
            Ak ste ešte nehlasovali, prosím hlasujte z inej IP adresy
            alebo nás kontaktujte na emaili novavlada2016@gmail.com. Ďakujeme.
            </Modal.Body>
            <Modal.Footer>
            <Button bsStyle="primary"
            onClick = {(e) => {
              this.props.dispatch((state) => {
                return {...state,
                        status: 'preferencie'}
              })
              this.close()
            }}
            >Zatvoriť</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
