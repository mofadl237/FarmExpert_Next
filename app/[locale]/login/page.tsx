import { AnimatedHeader } from "@/components/AnimatedHeader";
import { LoginForm } from '@/components/FarmLogin';
import Navbar from "@/components/Nav";

export default async function Page() {
 // const cookieStore = await cookies();
//   const submitHandle=()=>{
//     cookieStore.set(
//     "tokenSign",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtMUBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJtYW5hZ2VyIiwiRmFybUlkIjoiMSIsImV4cCI6MTc1MTY2MTgxMSwiaXNzIjoiRmFybVhwZXJ0TmV3IiwiYXVkIjoiRmFybVhwZXJ0TmV3In0.Pc__Vkfl6SwCGtkWSWooSFoIfcWVOtA1FOoRGIC6-dA"
//   );
//   }
  
  return (
    <section className="">
      <Navbar/>
      <div className='flex justify-center items-center w-full h-screen'>

    <div className="w-full md:w-1/2 rounded-md bg-gradient-to-br p-3 from-yellow-200 via-yellow-400 to-red-300">
    <AnimatedHeader title={'Welcome Dashboard'} center/>

    <LoginForm/>
      </div>
    </div>
    </section>
  );
}
