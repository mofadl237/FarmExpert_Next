'use client'
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const page = () => {
 
  return (
    <section className="mt-16 flex justify-center items-center h-screen ">
      <div className="mt-4 mb-8 space-y-4 text-center flex flex-col items-center justify-center">
        <CheckCircle2 size={" 5rem"} className="text-secondary " />
        <h3 className="text-secondary text-2xl font-bold">Payment Successful !</h3>
        <p>We Sent Email With &apos;Test Mode Sent One Email Not Have Domain&apos;</p>
        <Button>
          <Link href="/en/e-commerce">GO To Home</Link>
        </Button>
      </div>
    </section>
  );
};

export default page;
