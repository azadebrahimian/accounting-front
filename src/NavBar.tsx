import { useState, useEffect } from "react";
import {
    Navbar,
    Nav,
    Container,
    Button,
    Dropdown,
    Form,
} from "react-bootstrap";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Home from "./Home.tsx";
import CreateTxn from "./CreateTxn.tsx";
import History from "./History.tsx";
import SignUp from "./SignUp.tsx";
import { UserContext } from "./UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NavBar() {
    const [usernameLogin, setUsernameLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem("jwtToken") || "";
        const tokenString = userToken;

        axios
            .get("/api/users/auth", {
                headers: { "x-access-token": tokenString },
            })
            .then((res) => {
                const validToken = res.data.success;
                if (validToken) {
                    const validTokenString = userToken.split(" ")[1];
                    const decoded = jwt_decode(validTokenString);
                    setUserInfo(decoded);
                } else {
                    setUserInfo(null);
                }
            });
    }, []);

    return (
        <>
            <div>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Nav>
                            <Nav.Link as={Link} to="/">
                                Home &nbsp; &nbsp;
                            </Nav.Link>
                            {userInfo && (
                                <>
                                    <Nav.Link as={Link} to="/create">
                                        Create a Transaction &nbsp; &nbsp;
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/history">
                                        View Transaction History &nbsp; &nbsp;
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            {!userInfo && (
                                <>
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
                                                    value={usernameLogin}
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
                                                    value={passwordLogin}
                                                    onChange={(e) => {
                                                        setPasswordLogin(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                <Button
                                                    variant="primary"
                                                    className="mx-3 my-2 w-auto"
                                                    disabled={
                                                        !usernameLogin ||
                                                        !passwordLogin
                                                    }
                                                    onClick={(e) => {
                                                        axios
                                                            .post(
                                                                "/api/users/login",
                                                                {
                                                                    username:
                                                                        usernameLogin,
                                                                    password:
                                                                        passwordLogin,
                                                                }
                                                            )
                                                            .then((res) => {
                                                                if (
                                                                    res.data
                                                                        .token
                                                                ) {
                                                                    const {
                                                                        token,
                                                                    } =
                                                                        res.data;
                                                                    const decoded =
                                                                        jwt_decode(
                                                                            token.split(
                                                                                " "
                                                                            )[1]
                                                                        );
                                                                    localStorage.setItem(
                                                                        "jwtToken",
                                                                        token
                                                                    );
                                                                    setUserInfo(
                                                                        decoded
                                                                    );
                                                                    navigate(
                                                                        "/"
                                                                    );
                                                                } else {
                                                                    if (
                                                                        res.data
                                                                            .error
                                                                    ) {
                                                                        e.preventDefault();
                                                                        toast.error(
                                                                            "Invalid credentials."
                                                                        );
                                                                        setUsernameLogin(
                                                                            ""
                                                                        );
                                                                        setPasswordLogin(
                                                                            ""
                                                                        );
                                                                    }
                                                                }
                                                            });
                                                    }}
                                                >
                                                    Log in!
                                                </Button>
                                            </Form>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                            )}
                            {userInfo && (
                                <Button
                                    onClick={() => {
                                        localStorage.removeItem("jwtToken");
                                        setUserInfo(null);
                                        navigate("/");
                                    }}
                                >
                                    Sign out
                                </Button>
                            )}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <ToastContainer
                    position="top-right"
                    theme="colored"
                    autoClose={2500}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                />
            </div>
            <div>
                <UserContext.Provider value={{ userInfo, setUserInfo }}>
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
