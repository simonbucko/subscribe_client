import React,{useContext} from 'react';
import {Modal, Button, InputGroup, FormControl} from "react-bootstrap" 
import axios from "axios"
import styled from 'styled-components';
import {useNavigate} from "react-router-dom"
import { UserContext } from '../../context';
import {SERVER_URL} from "../../constants"

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
    const [state, setState] = useContext(UserContext);
    const navigate = useNavigate()

    console.log(state)


    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)
    const handleClick = async () => {
      let response;
      if(isSignupFlow){
        const {data:signupData} = await axios.post(`${SERVER_URL}/auth/signup`,{
          email,
          password
        })
        response=signupData
      }else{
        const {data:loginData} = await axios.post(`${SERVER_URL}/auth/login`,{
          email,
          password
        })
        response=loginData
      }

      //check for errors
      if(response.errors.length){
       return setErrorMsg(response.errors[0].msg)
      }

      setState({
        data:{
          id: response.data.user.id,
          email: response.data.user.email,
          customerStripeId: response.data.user.customerStripeId
        },
        loading:false,
        error:null
      })
      localStorage.setItem("token",response.data.token)
      axios.defaults.headers.common["authorization"] = `Bearer ${response.data.token}`
      navigate("/articles")
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
