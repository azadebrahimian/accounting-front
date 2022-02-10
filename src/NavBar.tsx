import { Navbar, Nav, Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Home from "./Home.tsx";
import CreateTxn from "./CreateTxn.tsx";
import History from "./History.tsx";

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
          </Container>
        </Navbar>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTxn />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </>
  );
}

export default NavBar;
