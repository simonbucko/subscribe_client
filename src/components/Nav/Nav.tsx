import {Navbar, NavItem} from "react-bootstrap"
import {Link} from "react-router-dom" 
import { useContext } from "react";
import { UserContext } from "../../context";

const Nav = () => {
const [state,setState] = useContext(UserContext)

console.log(state)

  return (
    <Navbar>
      <NavItem>
          <Link to="/" className="nav-link">
            Home
          </Link>
      </NavItem>
      {localStorage.getItem("token") && (
        <NavItem>
        <Link to="/" className="nav-link">
          Logout
        </Link>
    </NavItem>
      )}
    </Navbar>
  );
};

export default Nav;
