import { useState, useContext, useEffect } from "react";
import {
    DataGrid,
    GridColDef,
    getGridStringOperators,
    getGridNumericOperators,
} from "@mui/x-data-grid";
import axios from "axios";
import { UserContext } from "./UserContext";
import { sampleData } from "./util/json";
import getFormattedDate from "./util/DateFormat";

import "./History.scss";

function History() {
    const { userInfo } = useContext(UserContext);
    const [transactionData, setTransactionData] = useState([]);

    useEffect(() => {
        if (userInfo) {
            const { username } = userInfo;
            const fetchData = async () => {
                const allTransactions = await axios.get(
                    `/api/transactions/${username}`
                );

                allTransactions.data.forEach((t) => {
                    delete Object.assign(t, { ["id"]: t["_id"] })["_id"];
                });
                setTransactionData(allTransactions.data);
                console.log(transactionData);
            };

            fetchData();
        }
    }, []);

    const columns: GridColDef[] = [
        {
            field: "location",
            headerName: "Location",
            flex: 1,
            filterOperators: getGridStringOperators().filter(
                (operator) =>
                    operator.value === "equals" || operator.value === "isAnyOf"
            ),
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 1,
            align: "left",
            headerAlign: "left",
            type: "number",
            filterOperators: getGridNumericOperators().filter(
                (operator) =>
                    !(
                        operator.value === "isEmpty" ||
                        operator.value === "isNotEmpty" ||
                        operator.value === "isAnyOf"
                    )
            ),
        },
        {
            field: "transactionType",
            headerName: "Type",
            flex: 1,
            type: "singleSelect",
            valueOptions: ["spent", "received"],
        },
        {
            field: "transactionDate",
            headerName: "Date",
            flex: 1,
            type: "date",
            valueFormatter: (params) => {
                const valueFormatted = getFormattedDate(params.value);
                return valueFormatted;
            },
            valueGetter: ({ value }) => value && new Date(value),
        },
    ];

    return (
        <div style={{ display: "flex", height: 700 }}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid
                    rows={transactionData}
                    columns={columns}
                    initialState={{
                        sorting: {
                            sortModel: [
                                { field: "transactionDate", sort: "desc" },
                            ],
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default History;
