import React from "react";
import { ArrowRight } from 'react-bootstrap-icons';
import { Modal,Button } from "react-bootstrap";

const SimpleModal = (props) => {

  
  const { show, handleClose, size, modalTitle ,handleSubmit,text} = props;
  return (
    <Modal onClose={handleClose} size={size} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}  <ArrowRight /></Modal.Title>
        <p className="btn-modal-close" onClick={() => handleClose()}>
          <i className="fa fa-times text-danger"></i>
        </p>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> 
            <Button
              variant="primary"
              type="submit"
              onClick={() => handleSubmit()}
            >
            {text}
            </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SimpleModal;