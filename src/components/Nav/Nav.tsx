import {Navbar, NavItem, NavLink} from "react-bootstrap"
import {useNavigate} from "react-router-dom" 
import { useContext } from "react";
import { UserContext } from "../../context";
import styled from "styled-components"

const LeftNavContainer = styled.div`
  margin-left: auto;
`

const Nav = () => {
const [state,setState] = useContext(UserContext)
const navigate = useNavigate();

const handleLogout = () =>{
  setState({data:null,loading:false,error:null})
  localStorage.removeItem("token")
  navigate("/")
}


  return (
    <Navbar style={{backgroundColor: "#20063b", height: 56}}>
      {state.data && (
        <LeftNavContainer>
          <NavItem>
            <NavLink onClick={handleLogout} style={{color: "#fdfdfd"}}>
              Logout
            </NavLink>
        </NavItem>
        </LeftNavContainer>
        
      )}
    </Navbar>
  );
};

export default Nav;
