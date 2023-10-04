// import Button from "react-bootstrap/Button";
import {
  Container,
  Form,
  // FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

function Header({setSearch}) {
  const history=useNavigate();

  const dispatch=useDispatch();
  const userLogin=useSelector(state=>state.userLogin)
  const {userInfo}= userLogin;
  const logoutHandler=()=>{
    dispatch(logout());
    history("/");
  }
   
  return (
    <Navbar
      bg="primary"
      expand="lg"
      variant="dark"
      className="bg-body-tertiary"
    >
      <Container>
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">Note Taking App</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {userInfo ? (
              <Nav
                className="me-auto my-2 my-lg-0 m-auto ms-20"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link>
                  <Link to="/mynotes">My Notes</Link>
                </Nav.Link>
                <NavDropdown
                  title={userInfo?.name}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="/profile">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav>
                  <Form className="d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Form>
                </Nav>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link>
                  <Link to="/login">Login</Link>
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Container>
    </Navbar>
  );
}

export default Header;
