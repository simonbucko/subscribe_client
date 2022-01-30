import React from 'react';
import {Modal, Button, InputGroup, FormControl} from "react-bootstrap" 

interface ModalProps {
 text: String;
 variant: "primary" | "danger"
}

const ModalComponent = ({text,variant}:ModalProps) => {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)
  return <>
  <Button onClick={handleOpen} variant={variant} size="lg" style={{marginRight: "1rem", padding:"0.5rem 3rem"}}>{text}</Button>
  <Modal show={show} onHide={handleClose}>
    <Modal.Header>
      <Modal.Title>
        {text}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <InputGroup className="mb-3">
        <InputGroup.Text>
        Email
        </InputGroup.Text>
        <FormControl type="email"></FormControl>
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>
        Password
        </InputGroup.Text>
        <FormControl type="password"></FormControl>
      </InputGroup>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>Close</Button>
      <Button variant="primary" >{text}</Button>
    </Modal.Footer>
  </Modal>
  </>;
};

export default ModalComponent;
