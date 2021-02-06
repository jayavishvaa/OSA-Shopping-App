import client from "./client";

const registerSeller = data => client.put("/users/seller", data);

export default {
  registerSeller,
};