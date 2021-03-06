import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import { UserContext } from "./UserContext";
import {
  isUserInputPriceInvalid,
  amountErrorMessage,
} from "./util/UserInputUtil";

import "./Home.scss";

function Home() {
  const { userInfo } = useContext(UserContext);
  const [dailySpending, setDailySpending] = useState(0);
  const [weeklySpending, setWeeklySpending] = useState(0);
  const [weeklyRemaining, setWeeklyRemaining] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [newWeeklyBudget, setNewWeeklyBudget] = useState(0);

  useEffect(() => {
    if (userInfo) {
      const { username } = userInfo;

      const fetchData = async () => {
        const currentWeekData = await axios.get(
          `/api/transactions/${username}/currentWeek`
        );
        const weeklyBudget = await axios.get(`/api/users/getWeeklyBudget/${username}`);

        let dailyTotal = 0;
        let weeklyTotal = 0;

        const today = new Date();
        currentWeekData.data.forEach((wt) => {
          if (
            new Date(
              wt.transactionDate.replace(/-/g, "/").replace(/T.+/, "")
            ).getDate() === today.getDate()
          ) {
            dailyTotal += wt.amount;
          }

          weeklyTotal += wt.amount;
        });

        setDailySpending(dailyTotal);
        setWeeklySpending(weeklyTotal);
        setWeeklyRemaining(weeklyBudget.data.weeklyLimit - weeklyTotal);
      };

      fetchData();
    }
  });

  if (!userInfo) {
    return (
      <div className="home-main">
        <h1>Please login</h1>
      </div>
    );
  }

  return (
    <div className="home-main">
      <h1>Welcome back {userInfo.username}.</h1>
            <h3>Today you spent: ${dailySpending.toFixed(2)}</h3>
            <h3>So far this week you spent: ${weeklySpending.toFixed(2)}</h3>
      <div className="remaining-week-section">
        <h2>
          Remaining balance this week:{" "}
          <span className="remaining-balance">
            ${weeklyRemaining.toFixed(2)}
          </span>
          <Button
            variant="link"
            size="sm"
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Change weekly budget?
          </Button>
        </h2>
      </div>
      <Dialog open={openDialog}>
        <DialogTitle>Change Weekly Budget</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your current weekly budget is ${weeklyRemaining}. What should your new budget be?
          </DialogContentText>
          <TextField
            variant="standard"
            label="Amount"
            error={amountError}
            helperText={amountError && amountErrorMessage}
            onChange={(e) => {
              if (isUserInputPriceInvalid(e.target.value)) {
                setAmountError(true);
              } else {
                setNewWeeklyBudget(Number(e.target.value));
                setAmountError(false);
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="secondary"
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              axios
                .post("/api/users/updateWeeklyBudget", {
                  weeklyLimit: newWeeklyBudget,
                  username: userInfo.username,
                })
                .then((res) => {
                  setOpenDialog(false);
                });
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
