import client from "./client";

const shops = apiEndPoint => client.get("/shops", { apiEndPoint });

export default {
  shops,
};