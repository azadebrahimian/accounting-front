import { useState } from "react";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Button } from "react-bootstrap";
import axios from "axios";

import "./SignUp.scss";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signup-main">
      <h1>Sign up today!</h1>
      <form className="signup-form">
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
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Button
            variant="link"
            size="sm"
            disabled={!username}
            onClick={() => {
                axios.get(`/api/checkUsernameAvailability/:${username}`).then(res => {
                    console.log(res.data.availability);
                })
            }}>
              Check username availability
          </Button>
        </div>
        <div className="signup-form-multi-item">
          <TextField
            type={showPassword ? "text" : "password"}
            variant="standard"
            label="Password"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <FormControlLabel control={<Checkbox />} label="Show Password" onChange={(e) => {
              setShowPassword(e.target.checked);
          }} />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
