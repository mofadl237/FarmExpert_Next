"use client";

import { getToken } from "@/lib/utils";
import { IJwtPayload } from "@/interface";
import { jwtDecode } from "jwt-decode";
import { SendNotification } from "../Model/SendNotification";
import { AlertWorkTable } from '@/components/Table/AlertWorkTable';
import { AlertTable } from '@/components/Table/AlertTable';

const RenderAlert = () => {
  const token = getToken();
  if (!token) {
    return (
      <div className="w-full h-full flex justify-center items-center ">
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

  if (role === "manager") {
    return (
      <div className="w-full space-y-4 ">
        <SendNotification />
        {/* bg-gradient-to-r from-green-300 via-green-500 to-emerald-600 bg-clip-text text-transparent */}
        <h1 className="text-center ">
          I Manager For Send && Delete && Edit Alert {role} - {email} FarmerId -{" "}
          {FarmId}
        </h1>
        <AlertTable/> 
      </div>
    );
  }
  if (role === "Worker") {
    return (
      <div className="w-full space-y-4 ">
        <h1>
          I Worker For Show Alert {role} - {email} FarmerId - {FarmId}
        </h1>
        <AlertWorkTable/>
      </div>
    );
  }
};

export default RenderAlert;
