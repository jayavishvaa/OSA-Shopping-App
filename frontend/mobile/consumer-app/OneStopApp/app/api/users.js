import client from "./client";

const register = (userInfo) => client.put("/register", userInfo);

export default { register };
