import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Home from "./Home.tsx";
import CreateTxn from "./CreateTxn.tsx";
import History from "./History.tsx";
import SignUp from "./SignUp.tsx";

function NavBar() {
  return (
    <>
      <div>
        <Navbar bg="primary" variant="dark">
          <Container className="cont">
            <Nav>
              <Nav.Link href="/">Home &nbsp; &nbsp;</Nav.Link>
              <Nav.Link href="/create">
                Create a Transaction &nbsp; &nbsp;
              </Nav.Link>
              <Nav.Link href="/history">
                View Transaction History &nbsp; &nbsp;
              </Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Button href="/signup">Sign up</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTxn />} />
          <Route path="/history" element={<History />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

export default NavBar;
