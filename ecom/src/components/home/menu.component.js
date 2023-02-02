import { useState } from "react";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";

const MenuComponent = () => {
  let [keyword, setKeyword] = useState();
  let [query, setQuery] = useSearchParams();

  let loggedInUser = useSelector((state) => {
    return state.user.userDetail;
  });

  const counter = useSelector((store) => {
    // this store refers to the root store
    let cart = store.cart.detail;
    let qty = 0;
    if (cart && cart.length) {
      cart.forEach((item) => {
        qty += Number(item.qty);
      });
    }
    return qty;
  });

  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(keyword);
    // navigate("/search?q=" + keyword);
    if (keyword === undefined) {
      navigate("/search?q=");
    } else {
      navigate("/search?q=" + keyword);
    }
  };
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" className="test">
        <Container>
          <NavLink className={"navbar-brand"} to="/">
            Logo Here
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className={"nav-link"} to="/">
                Home
              </NavLink>
              <NavLink className={"nav-link"} to="/products">
                Products
              </NavLink>
              <NavLink className={"nav-link"} to="/contact-us">
                Contact Us
              </NavLink>
              <NavLink className={"nav-link"} to="/about-us">
                About Us
              </NavLink>
            </Nav>
          </Navbar.Collapse>

          <Nav>
            <Form action="/search" onSubmit={handleSubmit}>
              <Form.Control
                size="sm"
                type="search"
                name="q"
                defaultValue={query.get("q")}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
            </Form>
          </Nav>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className={"nav-link text-white"} to="/cart">
                Cart ({counter})
              </NavLink>
              {loggedInUser ? (
                <></>
              ) : (
                <>
                  <NavLink className={"nav-link"} to="/register">
                    Register
                  </NavLink>
                  <NavLink className={"nav-link"} to="/login">
                    Login
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          <Nav className="right">
            <NavLink className={"nav-link"} to="/admin">
              {loggedInUser?.name}
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default MenuComponent;
