import client from "./client";

const location = coordinates => client.get("/location", coordinates);

export default {
  location,
};