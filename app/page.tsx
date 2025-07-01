import Navbar from "@/components/Nav";


export default function Home() {
  return (
  <>
  <Navbar/>
    <main
      className="relative h-[95vh] mt-16 
  bg-[url('/main-2.jpg')] bg-cover bg-center sm:bg-top
  [clip-path:polygon(0_0,100%_0,100%_75vh,0_100%)]
  before:content-[''] before:absolute before:inset-0 
  before:bg-gradient-to-br before:from-green-300/80 before:to-emerald-500/50
  before:[clip-path:polygon(0_0,100%_0,100%_75vh,0_100%)]"
    >
      <div className="relative z-10 flex items-center justify-center h-full text-white">
        <div className="text-center px-4">
          <h1 className="text-[2rem] md:text-[4rem] lg:text-[6rem] tracking-[0.5rem] md:tracking-[1.5rem] lg:tracking-[2rem] font-bold">
            FarmExpert
          </h1>
          <h2 className="text-xl md:text-3xl lg:text-[3rem] tracking-[0.3rem] md:tracking-[1rem] lg:tracking-[1.9rem]">
            Smart Cows Farm
          </h2>
        </div>
      </div>
    </main>
  </>
  );
}
