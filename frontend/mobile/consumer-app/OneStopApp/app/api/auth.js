import client from "./client";

const login = ({phoneNumber, otp}) => client.post("/auth/verify", { phoneNumber, otp });

export default {
  login,
};