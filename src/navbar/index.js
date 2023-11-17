import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CustomNavBar() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "logout" });
    navigate("/");

  }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">NEVT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/login">TOP SELLING</Nav.Link>
            <Nav.Link href="/cars">BUY A CAR</Nav.Link>
            {!user && <NavDropdown title="LOGIN" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">Log In</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
            </NavDropdown>}

            {user &&
              <NavDropdown title={(user.firstName + " " + user.lastName).toUpperCase()} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
              </NavDropdown>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavBar;