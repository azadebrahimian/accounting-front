import { useState } from "react";
import { TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";
// import { LocalizationProvider, DatePicker } from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { isUserInputPriceInvalid } from "./util/UserInputUtil";

import "./CreateTxn.scss";

function CreateTxn() {
    const [amountError, setAmountError] = useState(false);
    const [amount, setAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("spent");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState(null);

    const amountErrorMessage =
        "Amount entered must be a non-negative, valid price.";

    return (
        <div className="create-main">
            <h1>Create a new transaction here.</h1>
            <form className="create-form">
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
                <TextField
                    variant="standard"
                    label="Location"
                    onChange={(e) => setLocation(e.target.value)}
                />
                <RadioGroup row value={transactionType}>
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
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Date"
                        value={date}
                        onChange={(e) => {
                            setDate(e);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider> */}
            </form>
        </div>
    );
}

export default CreateTxn;
