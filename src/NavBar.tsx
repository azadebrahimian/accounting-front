import { useState } from "react";
import {
    Navbar,
    Nav,
    Container,
    Button,
    Dropdown,
    Form,
} from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./Home.tsx";
import CreateTxn from "./CreateTxn.tsx";
import History from "./History.tsx";
import SignUp from "./SignUp.tsx";

function NavBar() {
    const [usernameLogin, setUsernameLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    return (
        <>
            <div>
                <Navbar bg="primary" variant="dark">
                    <Container>
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
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle id="dropdown-sign-in">
                                    Sign in
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Form>
                                        <Form.Control
                                            autoFocus
                                            className="mx-3 my-2 w-auto"
                                            placeholder="Username"
                                            onChange={(e) => {
                                                setUsernameLogin(
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <Form.Control
                                            className="mx-3 my-2 w-auto"
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => {
                                                setPasswordLogin(
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <Button
                                            variant="primary"
                                            className="mx-3 my-2 w-auto"
                                            onClick={() => {
                                                axios.post("/api/users/login", {
                                                    username: usernameLogin,
                                                    password: passwordLogin,
                                                });
                                            }}
                                        >
                                            Log in!
                                        </Button>
                                    </Form>
                                </Dropdown.Menu>
                            </Dropdown>
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
