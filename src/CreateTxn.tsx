import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { Button } from "react-bootstrap";
import { isUserInputPriceInvalid } from "./util/UserInputUtil";
import { UserContext } from "./UserContext";

import "./CreateTxn.scss";
import axios from "axios";

function CreateTxn() {
    const [amountError, setAmountError] = useState(false);
    const [amount, setAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("spent");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const { userInfo, setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const amountErrorMessage =
        "Amount entered must be a non-negative, valid price.";
    return (
        <div className="create-main">
            <h1>Create a new transaction here.</h1>
            <form className="create-form">
                <div className="create-form-individual-item">
                    <TextField
                        variant="standard"
                        label="Amount"
                        error={amountError}
                        helperText={amountError && amountErrorMessage}
                        onChange={(e) => {
                            if (isUserInputPriceInvalid(e.target.value)) {
                                setAmountError(true);
                            } else {
                                setAmount(Number(e.target.value));
                                setAmountError(false);
                            }
                        }}
                    />
                </div>
                <div className="create-form-individual-item">
                    <TextField
                        variant="standard"
                        label="Location"
                        onChange={(e) => {
                            setLocation(e.target.value);
                        }}
                    />
                </div>
                <div className="create-form-individual-item">
                    <RadioGroup
                        row
                        value={transactionType}
                        onChange={(e) => {
                            setTransactionType(e.target.value);
                        }}
                    >
                        <FormControlLabel
                            value="spent"
                            label="Spent"
                            control={<Radio />}
                        />
                        <FormControlLabel
                            value="received"
                            label="Received"
                            control={<Radio />}
                        />
                    </RadioGroup>
                </div>
                <div className="create-form-individual-item">
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                        }}
                    />
                </div>
                <Button
                    className="create-form-submit-button"
                    disabled={
                        !amount ||
                        !location ||
                        !transactionType ||
                        !date ||
                        amountError
                    }
                    onClick={() => {
                        axios
                            .post("/api/transactions/", {
                                amount: amount,
                                location: location,
                                transactionType: transactionType,
                                transactionDate: date,
                                username: userInfo.username,
                            })
                            .then((res) => {
                                navigate("/create");
                            });
                    }}
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default CreateTxn;
