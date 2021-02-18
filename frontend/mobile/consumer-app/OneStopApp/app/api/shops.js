import client from "./client";

const shops = (apiEndPoint, pinCode) => client.get("/shops", { apiEndPoint, pinCode });

const getCategories = shopId => client.get("/shops/getCategories", { shopId });

const getItems = (shopId, categoryName) => client.get("/shops/getItems", { shopId, categoryName });

export default {
  shops,
  getCategories,
  getItems
};