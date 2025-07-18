import Barchart from "../Statiscs/Barchart";
import PieChartCard from "../Statiscs/PieChart";

interface IProps{
    role:string;
    email:string;
    FarmId:string
    chartDataMilk:{ date: string; total: number; tagNumber: string }[];
    MilkLitre ?:number;
    PieDataCattle:{ name: string; value ?: number }[];
}
const AnalysisWorker = ({FarmId,role,email,chartDataMilk,MilkLitre,PieDataCattle}:IProps) => {
  return (
    <div className="w-full   ">
            <h1 className="text-center">
              Show Data Analysis For {role} - {email} FarmerId - {FarmId}
            </h1>
            < div className="space-y-4 bg-gradient-to-br mb-4 p-3 from-[#4cb050] to-[#2980b9]">
              
                <Barchart title="Daily Milk " data={chartDataMilk ?? []} />
              
    
              <div className="space-y-4">
                <h1>Milk Total</h1>
                <div className="text-sm  px-3 py-1 bg-green-100 text-green-800 rounded-md font-medium">
                  {MilkLitre}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full gap-4 mb-4">
                <PieChartCard key={'cattle'} COLORS={["#22c55e", "#3b82f6", "#facc15"]} title="Cattle" data={PieDataCattle ?? []} />
            </div>
            {/* <div className="bg-red-600 p-5 rounded-md space-y-4 text-white">
              <h1>
                Counting Cattle == Sheep -- {Sheep?.length ? Sheep?.length : "0"} --
                Cows -- {Cows?.length ? Cows?.length : "0"}
                -- Buffalo -- {Buffalo?.length ? Buffalo?.length : "0"}
              </h1>
              <h1>Counting Staff {Staff?.length}</h1>
              <h1>Counting Milk Litre {MilkLitre}</h1>
              <h1>Counting Salary Staff - {staffSalary!}</h1>
              <h1>money Sell Milk - {MilkLitre! * 20}</h1>
            </div> */}
          </div>
  )
}

export default AnalysisWorker