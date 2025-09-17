import Header from "@/components/Header";

import Footer from "@/components/Footer";
import LoginDialog from "@/components/Login";
import RegisterDialog from "@/components/register";
import { useState } from "react";

export default function Landing() {
    const [l,setL] = useState(true);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated={false} />
      {l? <LoginDialog onSwitch={()=>{setL(false)}}/>:
       <RegisterDialog onSwitch={()=>{setL(true)}}/>}
      <Footer />
    </div>
  );
}