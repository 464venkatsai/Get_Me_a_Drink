"use server";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import ConnectDb from "@/db/ConnectDB";
import User from "@/models/User";

export const initate = async (
  amount: string,
  toUserName: string,
  fromUsername: string
) => {
  await ConnectDb();
  //  Connecting to razorpay
  let razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_KEY_ID || "",
    key_secret: process.env.NEXT_PUBLIC_SECRET_KEY || "",
  });
  let options: { amount: Number; currency: string } = {
    amount: Number.parseInt(amount) * 100,
    currency: "INR",
  };
  // Creating the payment
  let x = await razorpay.orders.create(options);
  await Payment.create({
    orderId: x.id,
    amount: amount,
    name: fromUsername.name,
    toUser: toUserName,
    message: fromUsername.message,
  });
  return x;
};

export const fetchUser = async (username: String) => {
  await ConnectDb();
  // finding the user name from database
  let user = await User.findOne({ username: username }).lean();
  return user;
};

export const fetchPayments = async (username: String) => {
  await ConnectDb();
  //  find all payments sorted in decending order of amount and flatting the objects
  let payments = await Payment.find({ toUser: username,done:true })
    .sort({ amount: -1 })
    .lean();
  return payments;
};

export const updateUserProfile = async (CurrentUserData, oldUsername: string) => {
  await ConnectDb();
  // Updating the user details

  // let CurrentUserData = Object.fromEntries(data);
    let user = await User.findOne({ username: CurrentUserData.username });
    if (user && oldUsername!==CurrentUserData.username) {
      //  If Present Throw Error username previously exist
      return {
        error: `Sorry! ${CurrentUserData.username} has already taken. Please consider choosing another`,
      };
    }
    console.log("Current User Data :"+CurrentUserData)
    // Updating in the User table
    await User.updateOne(CurrentUserData)
    // Updating in the payment table
    await Payment.updateMany({toUser:oldUsername},{toUser:CurrentUserData.username})
};
