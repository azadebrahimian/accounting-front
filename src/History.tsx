import { useState } from "react";
import axios from "axios";

function History() {

    const [eh, setEh] = useState("sad");
    const [tot, setTot] = useState(0);

    axios.get("/api/").then(res => {
        setEh("HAPPY!!");
        console.log(res.data);
    });

    axios.get("/api/transactions/").then(res => {
        console.log(res.data);
    });

    return (
        <div className="history-main">
            <h1>This is where you can view your transaction history....</h1>
            <p>{eh}</p>
        </div>
    );
}

export default History;
