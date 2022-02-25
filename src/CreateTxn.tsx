import { useState } from "react";
import { isUserInputPriceInvalid } from "./util/UserInputUtil";
import { TextField, RadioGroup, Radio, FormControlLabel } from "@mui/material";

import "./CreateTxn.scss";
import axios from "axios";

function CreateTxn() {
  const [amountError, setAmountError] = useState(false);
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("spent");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const amountErrorMessage =
    "Amount entered must be a non-negative, valid price.";
  return (
    <div className="create-main">
      <h1>Create a new transaction here.</h1>
      <form className="create-form">
        <div className="create-form-individual-item">
          {/* <label>Amount:</label> */}
          {/* <input
            type="text"
            onChange={(e) => {
              if (isUserInputPriceInvalid(e.target.value)) {
                setAmountError(true);
              } else {
                setAmount(Number(e.target.value));
                setAmountError(false);
              }
            }}
          /> */}
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
        {/* {amountError && (
          <div className="amount-error-message">
            <p>{amountErrorMessage}</p>
          </div>
        )} */}
        <div className="create-form-individual-item">
          {/* <label>Location:</label>
          <input
            type="text"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          /> */}
          <TextField
            variant="standard"
            label="Location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <div className="create-form-individual-item">
          {/* <label>Spent</label>
          <input
            type="radio"
            checked={transactionType === "spent"}
            onChange={() => {
              setTransactionType("spent");
            }}
          />
          <label>Received</label>
          <input
            type="radio"
            checked={transactionType === "received"}
            onChange={() => {
              setTransactionType("received");
            }}
          /> */}
          <RadioGroup row value={transactionType}>
            <FormControlLabel value="spent" label="Spent" control={<Radio />} />
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
        <button
          type="submit"
          className="form-submit-button"
          onClick={() => {
            axios
              .post("/api/transactions/", {
                amount: amount,
                location: location,
                transactionType: transactionType,
                transactionDate: date,
              })
              .then((res) => {
                console.log("posted!");
              });
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateTxn;
