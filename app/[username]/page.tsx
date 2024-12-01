import PaymentPage from "@/Components/PaymentPage";
import React from "react";

interface Params {
  username: string;
}
const Username: React.FC<{ params: Params }> = async({ params }) => {
  let {username} = await params;
  return (
    <div>
      <PaymentPage username={username}/>
    </div>
  );
};
export default Username;
