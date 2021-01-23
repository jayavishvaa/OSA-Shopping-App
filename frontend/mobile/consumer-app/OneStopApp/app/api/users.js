import client from "./client";

const register = (userInfo) => client.put("/users/customer", userInfo);
const get = _id => client.get('/users', _id);

export default { register, get };
