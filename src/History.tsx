import { useState, useContext, useEffect } from "react";
import { DataGrid, GridColDef, getGridStringOperators, getGridNumericOperators } from "@mui/x-data-grid";
import axios from "axios";
import { UserContext } from "./UserContext";
import { sampleData } from "./util/json";
import getFormattedDate from "./util/DateFormat";

import "./History.scss";

function History() {
  const { userInfo } = useContext(UserContext);
  const [transactionData, setTransactionData] = useState([]);
  const [transactionDataModified, setTransactionDataModified] = useState([]);

  useEffect(() => {
    if (userInfo) {
      const { username } = userInfo;
      const fetchData = async () => {
        const allTransactions = await axios.get(
          `/api/transactions/${username}`
        );
        setTransactionData(allTransactions.data);
        setTransactionDataModified(allTransactions.data);
      };

      fetchData();
    }
  });

  const columns: GridColDef[] = [
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'equals' || operator.value === 'isAnyOf',
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      align: "left",
      headerAlign: "left",
      type: "number",
      filterOperators: getGridNumericOperators().forEach((operator) => {
          console.log(operator);
      })
    },
    {
      field: "transactionType",
      headerName: "Type",
      flex: 1,
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
    },
  ];

//   if (sampleData) {
//     sampleData.forEach((t) => {
//       t.transactionDate = getFormattedDate(t.transactionDate);
//     });
//   }

  return (
    // <div className="history-main">
    <div style={{ display: "flex", height: 500 }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid rows={sampleData} columns={columns} />
      </div>
    </div>
    // </div>
  );
}

export default History;
