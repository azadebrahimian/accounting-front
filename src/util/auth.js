import axios from "axios";

export default function checkIfTokenIsValid() {
    const userToken = localStorage.getItem("jwtToken") || "";
    const tokenString = "Bearer " + userToken;

    return axios.get("/api/users/auth", { headers: { "x-access-token": tokenString } })
}