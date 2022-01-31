import React from 'react';
import {Modal, Button, InputGroup, FormControl} from "react-bootstrap" 
import axios from "axios"
import styled from 'styled-components';

interface ModalProps {
 text: String;
 variant: "primary" | "danger";
 isSignupFlow: boolean
}

const ErrorMessage = styled.p`
color:red;
`

const ModalComponent = ({text,variant,isSignupFlow}:ModalProps) => {
    const [show, setShow] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)
    const handleClick = async () => {
      let data;
      if(isSignupFlow){
        const {data:signupData} = await axios.post("http://localhost:8080/auth/signup",{
          email,
          password
        })
        data=signupData
      }else{
        const {data:loginData} = await axios.post("http://localhost:8080/auth/login",{
          email,
          password
        })
        data=loginData
      }

      //check for errors
      if(data.errors.length){
        setErrorMsg(data.errors[0].msg)
      }

      localStorage.setItem("token",data.data.token)
    }


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
        <FormControl type="email" value={email} onChange={e => setEmail(e.target.value)}></FormControl>
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>
        Password
        </InputGroup.Text>
        <FormControl type="password" value={password} onChange={e => setPassword(e.target.value)}></FormControl>
      </InputGroup>
      {
        errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>
      }
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>Close</Button>
      <Button variant="primary" onClick={handleClick}>{text}</Button>
    </Modal.Footer>
  </Modal>
  </>;
};

export default ModalComponent;
