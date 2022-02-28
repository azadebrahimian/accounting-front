import axios from "axios";

export default function checkIfTokenIsValid() {
    const userToken = localStorage.getItem("jwtToken") || "";

    return axios.get("/api/users/auth", { headers: { "x-access-token": userToken } })
}