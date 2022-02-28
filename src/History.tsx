import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

function History() {
    const [tot, setTot] = useState(0);
    const user = useContext(UserContext);
    console.log(user);

    axios.get("/api/transactions/").then((res) => {
        let sum = 0;
        res.data.forEach((e) => {
            if (e.transactionType === "spent") {
                sum += e.amount;
            }
        });
        setTot(sum);
    });

    return (
        <div className="history-main">
            <h1>This is where you can view your transaction history....</h1>
            <p>In total you spent: {tot}</p>
        </div>
    );
}

export default History;
