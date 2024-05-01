export const genOtp = async () => {
  const otp = Math.floor(10000 + Math.random() * 900000);

  let expiry = new Date();

  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { otp, expiry };
};

export const onRequestOTP = async (otp: number, toPhonenNumber: string) => {
  try {
    const accountSid = "AC4f16a39c633856c7d42bcb367e9ae142";
    const authToken = "8ed5c5188c2335e61a48b53b22e9fdbb";

    const client = require("twilio")(accountSid, authToken);

    const response = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: "+13148885018",
      to: `+91${toPhonenNumber}`,
    });

    return response;
  } catch (err) {
    return err;
  }
};
