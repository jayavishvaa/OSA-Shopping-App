import client from "./client";

const shops = ({pinCode, apiEndPoint}) => client.get("/shops", { pinCode, apiEndPoint });

export default {
  shops,
};