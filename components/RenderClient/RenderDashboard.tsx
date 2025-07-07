"use client";

import { getToken } from "@/lib/utils";
import { IJwtPayload } from "@/interface";
import { jwtDecode } from "jwt-decode";
import {
  useGetCattleQuery,
  useGetMilkQuery,
  useGetWorkerQuery,
} from "@/store/services/ManagerFarm";
import { useGetFarmsQuery } from "@/store/services/Farm";
import { useGetManagersQuery } from "@/store/services/Manager";
import { useGetRequestsQuery } from "@/store/services/Request";
import AnalysisManager from "../DataAnalysis/AnalysisManager";

const RenderDashboard = () => {
  //1- state Get Data
  const { data: Farms } = useGetFarmsQuery();
  const { data: managers } = useGetManagersQuery();
  const { data: Requests } = useGetRequestsQuery();
  const { data: Cows } = useGetCattleQuery({ typeCattle: "Cow" });
  const { data: Buffalo } = useGetCattleQuery({ typeCattle: "Buffalo" });
  const { data: Sheep } = useGetCattleQuery({ typeCattle: "Sheep" });
  const { data: Staff } = useGetWorkerQuery();
  const { data: Milk } = useGetMilkQuery();
  //
  const chartDataMilk = Milk?.map((item) => ({
    date: new Date(item.date!).toLocaleDateString(),
    total: item.total ?? 0,
    tagNumber: item.tagNumber,
  }));
  const PieDataCattle = [
    {name:'Cows',value:Cows?.length},
    {name:'Sheep',value:Sheep?.length},
    {name:'Buffalo',value:Buffalo?.length},
  ];

    const pieDataStaff = [
        {name:'farmer',value:3},
        {name:"vet" , value:1},
        {name:"SuperVisor", value:2}
    ]

  const MilkLitre = Milk?.reduce((acc, curr) => acc + curr.total!, 0);
//   const staffSalary = Staff?.reduce(
//     (acc, curr) => acc + Number(curr.salary),
//     0
//   );

  const token = getToken();
  if (!token) {
    return (
      <div className="w-full h-full   ">
        <h1>Not Have Authenticated</h1>
      </div>
    );
  }
  const decoded = jwtDecode<IJwtPayload>(String(token));
  const {
    ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]: role,
    ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]:
      email,
    FarmId,
  } = decoded;
  if (role === "admin") {
    return (
      <div className="w-full h-screen  ">
        <h1>
          Show Data Analysis For {role} - {email}
        </h1>
        <h2>Counting Farm {Farms?.length} </h2>
        <h2>Counting Manager {managers?.length} </h2>
        <h2>Counting Requests {Requests?.length} </h2>
      </div>
    );
  }
  if (role === "manager") {
    return (
    <AnalysisManager role={role} FarmId={FarmId} email={email} chartDataMilk={chartDataMilk ?? []} MilkLitre={MilkLitre}  pieDataStaff={pieDataStaff} PieDataCattle={PieDataCattle} />
    );
  }
  if (role === "Worker") {
    return (
      <div className="w-full h-screen   ">
        <h1>
          Show Data Analysis For {role} - {email} FarmerId - {FarmId}
        </h1>
        <div className="bg-red-600 p-5 rounded-md border-md text-white">
          <h1>
            Counting Cattle == Sheep -- {Sheep?.length ? Sheep?.length : "0"} --
            Cows -- {Cows?.length ? Cows?.length : "0"}
            -- Buffalo -- {Buffalo?.length ? Buffalo?.length : "0"}
          </h1>
          <h1>Counting Staff {Staff?.length}</h1>
          <h1>Counting Milk Litre {MilkLitre}</h1>
        </div>
      </div>
    );
  }
};

export default RenderDashboard;
