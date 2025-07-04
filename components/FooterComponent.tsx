import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-muted text-muted-foreground py-8 px-4 md:px-8">
      <div className="bg-transparent shadow-none border-none">
        <Image
          src="/logo.png"
          alt="Farm Expert Logo"
          width={200}
          height={100}
          className="mx-auto md:mb-[10rem]"
        />
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-10">
          {/* Navigation Section */}

          <div className="   gap-4 w-full md:w-1/2">
            <Separator className="w-[70%] h-[3px]" />
            <nav>
              <ul className="flex  justify-between py-4 gap-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-secondary text-md md:text-2xl"
                  >
                    Company
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-secondary text-md md:text-2xl"
                  >
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-secondary text-md md:text-2xl"
                  >
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-secondary  text-md md:text-2xl"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </nav>
            <Separator className="w-[70%]" />
          </div>

          <div className="flex flex-col  w-full md:w-[50%] ">
            <Separator className="w-[70%]" />

            <div className="text-sm md:text-xl leading-relaxed">
              Built by <span >Farm Expert Team</span> Copyright © <span className="bg-gradient-to-r from-green-300 via-green-500 to-emerald-600 bg-clip-text text-transparent hover:[]">
  Mohamed Fadl.
</span> Farm Expert
              Team is a leading company specializing in smart farming solutions.
              We provide advanced systems to optimize farm management, ensuring
              efficiency and productivity for both small and large-scale farms.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
