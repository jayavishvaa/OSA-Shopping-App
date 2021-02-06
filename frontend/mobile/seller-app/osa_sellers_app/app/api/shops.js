import client from "./client";

const createShop = (data, onUploadProgress) => client.post("/shops", data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
});

const getShop = sellerId => client.get("/shops/sellerSideShop", sellerId);

const createCategory = (data, onUploadProgress) => client.put("/shops/createCategory", {
  categoryName: data.categoryName,
  shopId: data.shopId,
}, {
  onUploadProgress: (progress) =>
    onUploadProgress(progress.loaded / progress.total),
});
const createItem = (data, onUploadProgress) => client.post("/shops/createItem", { ...data }, {
  onUploadProgress: (progress) =>
    onUploadProgress(progress.loaded / progress.total),
});

const editItem = (data, onUploadProgress) => client.put("/shops/editItem", { ...data }, {
  onUploadProgress: (progress) => 
    onUploadProgress(progress.loaded / progress.total),
});

const deleteItem = (_id, onUploadProgress) => client.delete("/shops/deleteItem", _id, {
  onUploadProgress: (progress) => 
    onUploadProgress(progress.loaded / progress.total),
})

const getShopById = shopId => client.get("/shops/findByShopId", shopId);

const getItems = (shopId, categoryName) => client.get("/shops/getItems", { shopId, categoryName });

export default {
  createShop,
  getShop,
  createCategory,
  createItem,
  editItem,
  deleteItem,
  getShopById,
  getItems
};