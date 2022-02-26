import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Button } from "react-bootstrap";
import axios from "axios";

import "./SignUp.scss";

function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const invalidUsernameMessage = "Username is already taken";
    const availableUsernameMessage = "Username is available";

    return (
        <div className="signup-main">
            <h1>Sign up today!</h1>
            <form className="signup-form">
                <div className="signup-form-box">
                    <div className="signup-form-individual-item">
                        <TextField
                            variant="standard"
                            label="First Name"
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="signup-form-individual-item">
                        <TextField
                            variant="standard"
                            label="Last Name"
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="signup-form-multi-item">
                        <TextField
                            variant="standard"
                            label="Username"
                            error={invalidUsername}
                            color={usernameAvailable && "success"}
                            helperText={
                                (invalidUsername && invalidUsernameMessage) ||
                                (usernameAvailable && availableUsernameMessage)
                            }
                            onChange={(e) => {
                                setUsername(e.target.value);
                                if (invalidUsername) {
                                    setInvalidUsername(false);
                                }
                                if (usernameAvailable) {
                                    setUsernameAvailable(false);
                                }
                            }}
                        />
                        <Button
                            variant="link"
                            size="sm"
                            disabled={!username}
                            onClick={() => {
                                axios
                                    .get(
                                        `/api/users/checkUsernameAvailability/${username}`
                                    )
                                    .then((res) => {
                                        if (!res.data.available) {
                                            setInvalidUsername(true);
                                        } else {
                                            setUsernameAvailable(true);
                                        }
                                    });
                            }}
                        >
                            Check username availability
                        </Button>
                    </div>
                    <div className="signup-form-multi-item">
                        <TextField
                            type={showPassword ? "text" : "password"}
                            variant="standard"
                            label="Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Show Password"
                            onChange={(e) => {
                                setShowPassword(e.target.checked);
                            }}
                        />
                    </div>
                    <Button
                        className="signup-form-submit-button"
                        disabled={
                            !firstName ||
                            !lastName ||
                            !username ||
                            !password ||
                            invalidUsername
                        }
                        onClick={() => {
                            axios
                                .post("/api/users/create/", {
                                    firstName: firstName,
                                    lastName: lastName,
                                    username: username,
                                    password: password,
                                })
                                .then((res) => {
                                    if (
                                        res.data.error &&
                                        res.data.error === "invalid_username"
                                    ) {
                                        setInvalidUsername(true);
                                    } else {
                                        navigate("/");
                                    }
                                });
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
