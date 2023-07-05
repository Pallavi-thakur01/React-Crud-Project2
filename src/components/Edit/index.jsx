import React from "react";
import { Modal,Button } from "react-bootstrap";
import  {GrUpdate} from 'react-icons/gr';

const SimpleModal = (props) => {
  const { show2, handleClose2, size, modalTitle1 ,handleSubmit,handleUpdate,text} = props;
  return (
    <Modal onClose={handleClose2} size={size} show={show2} onHide={handleClose2}>
      <Modal.Header closeButton>
        <Modal.Title><GrUpdate/>  {modalTitle1}</Modal.Title>
        <p className="btn-modal-close" onClick={() => handleClose2()}>
          <i className="fa fa-times text-danger"></i>
        </p>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button> 
            <Button
              variant="primary"
              type="submit"
              onClick={() => handleUpdate()}
            >
            {text}
            </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SimpleModal;