"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/vet", label: "Vet" },
  { href: "/e-commerce", label: "E-commerce" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
<div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl bg-secondary text-primary rounded-md shadow-md">
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
      <div className="hidden md:flex gap-6">
        {links.map((link) => (
          <NavLink key={link.href} href={link.href}>
            {link.label}
          </NavLink>
        ))}
        <ModeToggle/>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size={'default'} className="md:hidden w-[25px] h-[25px]">
            <Menu className=" text-white w-[25px] h-[25px]"   />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="flex flex-col h-full bg-[var(--secondary)] text-[var(--primary)] ">
            <div className="p-4 border-b">
              <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
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
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg"
                >
                  {link.label}
                </NavLink>
              ))}
              <ModeToggle/>
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
        isActive ? "font-bold text-primary" : "text-white",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}