import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class GameModal extends Component {
  static propTypes = {
    showModal: PropTypes.bool,
    keyboard: PropTypes.bool,
    animation: PropTypes.bool
  }

	constructor(...args) {
		super(...args);

		this.state = { showModal: this.props.showModal };
	}

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showModal !== this.props.showModal) {
      this.setState((prevState) => {
        return { showModal: this.props.showModal }
      });
    }
  }

	render() {

		return (
				<Modal show={this.state.showModal} onHide={ this.props.callback }>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h4>Text in a modal</h4>
            Test text bla bla
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={ this.props.callback }>Close</Button>
					</Modal.Footer>
				</Modal>
		);
	}
};
