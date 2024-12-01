"use client";
import { fetchPayments, fetchUser, initate } from "@/actions/useractions";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import React, { useState, useEffect } from "react";
import Alert from "./Alert";

interface UserDetails {
  username: string;
}

const PaymentPage = ({ username }: UserDetails) => {
  const [paymentForm, setPaymentForm] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [razorpayReady, setRazorpayReady] = useState(false);
  const [userName, SetUserName] = useState({ username: "", email: "" });
  const [payments, SetPayments] = useState([]);
  const searchParams = useSearchParams();
  const [alert, setalert] = useState("");
  // * Ensuring Razorpay is loaded and ready
  useEffect(() => {
    const checkRazorpay = () => {
      if (window.razorpay) {
        setRazorpayReady(true);
      } else {
        setTimeout(checkRazorpay, 100); // Check every 100ms until Razorpay is ready
      }
    };
    checkRazorpay();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Updating payment form
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    // ^ Setting the username and payments
    let user = await fetchUser(username.toLowerCase());
    SetUserName(user);
    let dbPayments = await fetchPayments(username);
    SetPayments(dbPayments);
  };
  useEffect(() => {
    // Loading the data when the page is loaded
    let payment = searchParams.get("payment");
    let amount = searchParams.get("amount");
    if(payment==="true" && amount){
      setalert(`Amount sent of ₹${amount}`);
    }
    getData();
  }, [searchParams]);

  const pay = async (amount: string) => {
    let response = await initate(amount, username, paymentForm);
    let orderId = response.id;
    //  This code in from the documentation of razorpay
    //  Razorpay Documentation : https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/
    let options = {
      key_id: process.env.NEXT_PUBLIC_KEY_ID,
      amount: amount,
      currency: "INR",
      name: "Get Me a Drink", // your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, // Pass the id obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: paymentForm.name, // your customer's name
        email: "venkatsaikilli464@gmail.com",
        contact: "6301482636", // Provide the customer's phone number
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    try {
      var rzp1 = new window.Razorpay(options); // Using window.Razorpay instead of imported Razorpay
      rzp1.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
    }
  };

  return (
    <>
      {/* //^ Entire Payment Gateway and web intergration using razorpay */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div>
        {alert.length !== 0 && <Alert alertMsg={alert} time={2600} />}
        <div className="relative">
          <div className="w-full cover h-[45vh]">
            <img className="w-full h-full" src="violet_background.jpg" alt="" />
            <div className="absolute -bottom-16 w-[13vw] rounded-[100%] border-2 border-white/[0.6] overflow-hidden right-[43.5%]">
              <img
                className="w-full h-full"
                src="https://imgcdn.stablediffusionweb.com/2024/4/9/dbe93a28-1dce-48a8-a2c9-2d486d3da01b.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="mt-[5rem]">
          <h4 className="text-xl font-semibold text-center font-inter capitalize tracking-wide">
            {userName.username}
          </h4>
          <p className="text-center font-nunito text-white/[.5] my-2">
            Creating animation and style in tailwind for developers
          </p>
          <p className="text-center font-nunito text-white/[.5]">
            {payments.length} payments | ₹ {payments.reduce((a,b)=>a+b.amount,0)} Rasied
          </p>
        </div>
        <div className="payments flex gap-2 justify-center my-5 ">
          <div className="supporters bg-slate-900 w-[40%] p-10 rounded-lg">
            <h2 className="text-2xl font-semibold font-inter text-center mb-4">
              Supporters
            </h2>
            <ul className="overflow-auto max-h-[45vh] hide-scrollbar">
              {/* //* Display payments which are completed */}
              {payments.length !== 0 ? (
                payments.map((record, id) => {
                  return (
                    <li
                      key={id}
                      className="flex my-[.5rem] bg-slate-800 p-4 rounded-lg border-slate-700 border-solid border-[1px]"
                    >
                      <div className="rounded-[100%] overflow-hidden">
                        <img
                          src="https://imgcdn.stablediffusionweb.com/2024/4/9/dbe93a28-1dce-48a8-a2c9-2d486d3da01b.jpg"
                          width={45}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col items-start justify-center mx-3 text-[14px] font-poppins text-gray-300">
                        <h6>
                          <span className="capitalize">{record.name}</span>{" "}
                          donated{" "}
                          <span className="text-green-400 font-bold">
                            {" "}
                            ₹ {record.amount}
                          </span>
                        </h6>
                        <p>
                          <span className="text-gray-500">Message : </span>
                          {record.message}
                        </p>
                      </div>
                    </li>
                  );
                })
              ) : (
                <h1 className="text-center">No payments received yet!</h1>
              )}
            </ul>
          </div>
          <div className="make-payments w-1/2 bg-slate-900 p-10 rounded-lg">
            <h2 className="text-center font-semibold font-inter text-2xl">
              Make a Payment
            </h2>
            <div className="flex flex-col gap-5 my-5">
              <input
                type="text"
                className="bg-slate-800 px-5 py-4 rounded-md w-full border-[1px] border-solid border-gray-700 "
                placeholder="Enter Name"
                name="name"
                onChange={handleChange}
                value={paymentForm.name}
              />
              <input
                type="number"
                style={{
                  appearance: "none",
                  MozAppearance: "textfield",
                  WebkitAppearance: "none",
                }}
                className="bg-slate-800 px-5 py-4 rounded-md w-full border-[1px] border-solid border-gray-700 hide-scrollbar "
                placeholder="Enter Amount"
                name="amount"
                onChange={handleChange}
                value={paymentForm.amount}
              />
              <input
                type="text"
                name="message"
                className="bg-slate-800 px-5 py-4 rounded-md w-full border-[1px] border-solid border-gray-700 "
                placeholder="Enter Message"
                onChange={handleChange}
                value={paymentForm.message}
              />
            </div>
            <div className="short-payments flex gap-4">
              <button
                className="bg-slate-800 px-5 py-3 rounded-md"
                onClick={() => pay("100")}
              >
                Pay ₹100
              </button>
              <button
                className="bg-slate-800 px-5 py-3 rounded-md"
                onClick={() => pay("500")}
              >
                Pay ₹500
              </button>
              <button
                className="bg-slate-800 px-5 py-3 rounded-md"
                onClick={() => pay("1000")}
              >
                Pay ₹1000
              </button>
            </div>
            <div className="my-5">
              <button
                className="btn-purple w-full cursor-pointer"
                disabled={
                  Number.parseInt(paymentForm.amount) < 10 ||
                  paymentForm.name.length < 2
                }
                onClick={() => pay(paymentForm.amount)}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
