import DashboardCard from "@/components/dashboard/card";
import { EthernetPort } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-content-between gap-5 mb-5">
        <DashboardCard
          title='IP Address'
          count={10}
          icon={<EthernetPort className="text-slate-500" size={36}/>}
        />
      </div>    
    </>
  );
}
