import { useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function checkIfTokenIsValid(token) {
    const user = useContext(UserContext);
    console.log(user);
    // const userToken = user.userInfo ? user.userInfo.

    // axios.get("/api/users/auth", { headers: { Authorization: "Bearer " + } })
}