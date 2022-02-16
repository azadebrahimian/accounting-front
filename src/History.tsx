import { useState } from "react";
import axios from "axios";

function History() {
    const [sample, setSample] = useState("");

    axios.get("/history").then((res) => {
        setSample(res.data.title);
    });

    return (
        <div className="history-main">
            <h1>This is where you can view your transaction history.</h1>
            <p>{sample}</p>
        </div>
    );
}

export default History;
