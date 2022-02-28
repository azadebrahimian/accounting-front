import { useState } from "react";
import {
    Navbar,
    Nav,
    Container,
    Button,
    Dropdown,
    Form,
} from "react-bootstrap";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Home from "./Home.tsx";
import CreateTxn from "./CreateTxn.tsx";
import History from "./History.tsx";
import SignUp from "./SignUp.tsx";
import setAuthorizationToken from "./util/setAuthorizationToken";
import { UserContext } from "./UserContext";

function NavBar() {
    const [usernameLogin, setUsernameLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [userInfo, setUserInfo] = useState(null);

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
                            <Dropdown autoClose="outside" align="end">
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
                                            // type="submit"
                                            className="mx-3 my-2 w-auto"
                                            onClick={() => {
                                                axios
                                                    .post("/api/users/login", {
                                                        username: usernameLogin,
                                                        password: passwordLogin,
                                                    })
                                                    .then((res) => {
                                                        if (res.data.token) {
                                                            const { token } =
                                                                res.data;
                                                            localStorage.setItem(
                                                                "jwtToken",
                                                                token
                                                            );
                                                            setAuthorizationToken(
                                                                token
                                                            );
                                                            const decoded =
                                                                jwt_decode(
                                                                    token
                                                                );
                                                            // setUserInfo();
                                                            console.log(
                                                                decoded
                                                            );
                                                        }
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
                <UserContext.Provider value={userInfo}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<CreateTxn />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                </UserContext.Provider>
            </div>
        </>
    );
}

export default NavBar;
