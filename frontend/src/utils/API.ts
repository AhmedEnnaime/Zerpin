import axios from "axios";

const user = JSON.parse(sessionStorage.getItem("user") || "{}");
axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
export default axios.create({
  baseURL: `http://localhost/api/`,
});
