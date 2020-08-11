import React from "react";
import Modal from "react-bootstrap/Modal";
import './styles.scss';
const PopUp = ({ header, size, body, children, shown, onClose, centered }) => {
  return (
    <div>
      <Modal size={size} centered={centered} show={shown} onHide={() => onClose()}>
        <Modal.Header style={size === 'lg' ? { padding: "2rem", paddingBottom: "0rem" } : null}>{header}</Modal.Header>
        <Modal.Body style={size === 'lg' ? { padding: "2rem" } : null}>{body}</Modal.Body>
        <Modal.Footer>{children}</Modal.Footer>
      </Modal>
    </div>
  );
};
export default PopUp;
