'use client'
import { Button } from "@/components/ui/button"

const page = () => {
    
  return (
    <section className="mt-16 flex justify-center h-screen items-center">
      <div className="space-y-3 w-full flex justify-center items-center flex-col">
        <p className="text-center w-full">You Sure Sign Out</p>
      <Button variant={'destructive'} onClick={()=>{localStorage.removeItem("User"); location.href='/en/e-commerce'}  }>Sign Out</Button>
      </div>
    </section>
  )
}

export default page