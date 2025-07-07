'use client'

import { getToken } from "@/lib/utils"
import { IJwtPayload } from "@/interface"
import { jwtDecode } from 'jwt-decode';

const RenderDashboard = () => {

    const token = getToken();
    if(!token){
        return <div className="w-full h-full flex justify-center items-center ">
            <h1>Not Have Authenticated</h1>
        </div>
    }
    const decoded = jwtDecode <IJwtPayload>(String(token) );
       const {
      ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]: role,
      ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]: email,
      FarmId
      
    } = decoded;
    if(role === 'admin'){
        return(
            <div className="w-full h-screen flex justify-center items-center ">
            <h1>Show Data Analysis For {role} - {email} FarmerId - {FarmId}</h1>
        </div>
        )
    }
    if(role === 'manager'){
        return(
            <div className="w-full h-screen flex justify-center items-center ">
            <h1>Show Data Analysis For {role} - {email} FarmerId - {FarmId}</h1>
        </div>
        )
    }
    if(role === 'Worker'){
        return(
            <div className="w-full h-screen flex justify-center items-center ">
            <h1>Show Data Analysis For {role} - {email} FarmerId - {FarmId}</h1>
        </div>
        )
    }

 
}

export default RenderDashboard