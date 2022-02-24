import { useState } from "react";
import axios from "axios";

function History() {

    const [eh, setEh] = useState("sad");

    axios.get("/").then(res => {
        setEh("HAPPY!!");
        console.log(res.data);
    })

    return (
        <div className="history-main">
            <h1>This is where you can view your transaction history....</h1>
            <p>{eh}</p>
        </div>
    );
}

export default History;
