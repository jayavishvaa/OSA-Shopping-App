import client from "./client";

const sendOTP = phoneNumber => client.post("/auth/sendOTP", { phoneNumber });

export default {
  sendOTP,
};