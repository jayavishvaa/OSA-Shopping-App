import client from "./client";

const login = ({phoneNumber, otp}) => client.post("/auth/verifySeller", { phoneNumber, otp });

export default {
  login,
};