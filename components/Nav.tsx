"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  // { path: "vet", label: "Vet" },
  // { path: "e-commerce", label: "E-commerce" },
  { path: "dashboard", label: "Dashboard" },
];

export default function Navbar() {
  //1-State
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl rounded-md  transition-colors duration-300",
        scrolled
          ? "bg-secondary shadow-md "
          : "bg-transparent "
      )}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 py-3shadow-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden  md:flex items-center gap-6">
          {links.map((link) => (
            <NavLink key={link.path} href={`/${locale}/${link.path}`} className={`${scrolled && 'text-white'}`}>
              {link.label}
            </NavLink>
          ))}
          <ModeToggle />
          <LanguageSwitcher />
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="">
            <Button
              variant="ghost"
              size={"default"}
              className="md:hidden bg-secondary"
            >
              <Menu size={50}strokeWidth={5} className="text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <div className="flex flex-col h-full bg-[var(--secondary)] text-[var(--primary)] ">
              <div className="p-4 border-b">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </Link>
              </div>
              <nav className="flex flex-col gap-4 p-4">
                {links.map((link) => (
                  <NavLink
                    key={link.path}
                    href={`/${locale}/${link.path}`}
                    onClick={() => setOpen(false)}
                    className="text-lg"
                  >
                    {link.label}
                  </NavLink>
                ))}
                <ModeToggle />
                <LanguageSwitcher />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

import { usePathname } from "next/navigation";
import { ModeToggle } from "./DarkMode";
import { LanguageSwitcher } from "./LanguageSwitch";
import { useLocale } from "next-intl";
type NavLinkProps = React.ComponentProps<typeof Link> & {
  children: React.ReactNode;
};

function NavLink({ href, children, className, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href as string}
      className={cn(
        "transition-colors hover:text-green-800",
        isActive ? "font-bold text-primary" : "",
        
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
