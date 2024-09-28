"use client"
import { checkSession } from "@/lib/session";
import { useEffect } from "react";

const SessionChecker = () => {
  useEffect(() => {
    checkSession()
  },[])
    
  return ( 
    <></>
   );
}
 
export default SessionChecker;