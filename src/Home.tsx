import { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

import "./Home.scss";

function Home() {
    const { userInfo } = useContext(UserContext);
    let weeklyTransactions = [];
    let dailyTotal = 0;
    let weeklyTotal = 0;


    useEffect(() => {
        if (userInfo) {
            const username = userInfo.username;
            axios
                .get(`/api/transactions/${username}/currentWeek`)
                .then((res) => {
                    weeklyTransactions = res.data;

                    const today = new Date();
                    console.log(today);
                    weeklyTransactions.forEach((wt) => {
                        if (new Date(wt.transactionDate).getDate() === today.getDate()) {
                            dailyTotal += wt.amount;
                        }

                        weeklyTotal += wt.amount;

                        console.log(weeklyTotal);
                        console.log(dailyTotal);
                    });
                });
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
            <h3>Today you spent: ${dailyTotal}</h3>
            <h3>So far this week you spent: ${weeklyTotal}</h3>
            <div className="remaining-week-section">
                <h2>
                    Remaining balance this week:{" "}
                    <span className="remaining-balance">$99</span>
                </h2>
            </div>
        </div>
    );
}

export default Home;
