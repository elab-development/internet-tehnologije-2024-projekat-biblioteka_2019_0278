import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ModalPregled({ show, onHide, title, children }) {
  return (
    <Modal show={show} onHide={onHide} size="xl" centered style={{minHeight:"90vh"}} scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Zatvori
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPregled;
