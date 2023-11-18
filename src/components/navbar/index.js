import { Col, Form, Row, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function CustomNavBar() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "logout" });
    navigate("/");
  }

  const openPage = (path) => {
    navigate(path)
  }


  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand className="fw-bold">

          <Nav.Link onClick={() => {
            openPage("/")
          }}>
            NEVT
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {!user && <NavDropdown title="LOGIN" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => {openPage("/login")}}>Log In</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => {openPage("/signup")}}>Sign Up</NavDropdown.Item>
            </NavDropdown>}
            {user && 
             <Nav.Link onClick={() => {openPage("/cart")}} className="bi bi-cart fw-bold">
              CART
            </Nav.Link>
            }
            {user &&
              <NavDropdown className="fw-bold" title={(user.firstName + " " + user.lastName).toUpperCase()} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => {openPage("/orders")}}>Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
              </NavDropdown>}


          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

