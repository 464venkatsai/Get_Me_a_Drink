import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import ConnectDb from "@/db/ConnectDB";

export const POST = async (req: Request)=>{
  // Setting the page after payment 
  await ConnectDb()
  let body =  await req.formData();
  body = Object.fromEntries(body)
  let p = Payment.findOne({orderId:body.razorpay_order_id})
  if (!p){
    return NextResponse.json({success:false, message:"Can no find Order Id"})
  }
  let xx = validatePaymentVerification({"order_id":body.razorpay_order_id,"payment_id":body.razorpay_payment_id},body.razorpay_signature,process.env.NEXT_PUBLIC_SECRET_KEY) 
  // Updating the payment if it is completed successfully.
  if(xx){
    const record = await Payment.findOneAndUpdate(
      { orderId: body.razorpay_order_id},
      { $set: { done: true } },
      { new: true }
    );
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${record.toUser}?payment=true&amount=${record.amount}`);
  }
  return NextResponse.json({success:false, message:"Payment Verification Failed"})
}