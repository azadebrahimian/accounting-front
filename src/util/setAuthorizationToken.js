import axios from "axios";

const setAuthorizationToken = (token) => {
    if (token) {
        console.log("jiogpiwajoaiwjh");
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthorizationToken;