import { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

import "./Home.scss";

function Home() {
    const { userInfo, setUserInfo } = useContext(UserContext);

    useEffect(() => {
        if (userInfo) {
            const username = userInfo.username;
            axios
                .get(`/api/transactions/${username}/currentWeek`)
                .then((res) => {
                    console.log(res.data);
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
            <h3>Today you spent: $69</h3>
            <h3>So far this week you spent: $420</h3>
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
