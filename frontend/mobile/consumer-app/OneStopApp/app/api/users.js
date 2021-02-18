import client from "./client";

const register = (userInfo) => client.put("/users/customer", userInfo);
const get = _id => client.get('/users', _id);

const createNewList = data => client.post("/users/newList", data);

const getLists = data => client.get("/users/getSavedLists", data);

const addItemToCart = data => client.post("/users/addItemToCart", data);

const addItemToSavedList = data => client.post("/users/addItemToSavedList", data);

const getCartItems = data => client.get("/users/getCartItems", data);

const deleteCartItem = data => client.delete("/users/deleteCartItem", data);

export default {
    register,
    get,
    createNewList,
    getLists,
    addItemToCart,
    addItemToSavedList,
    getCartItems,
    deleteCartItem
};