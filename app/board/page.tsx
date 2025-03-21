"use client";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Board from "@/components/Board";
import { SignInButton, useClerk } from "@clerk/clerk-react";
import Image from "next/image";
import icon from "../../public/icon.svg";
import { BlocksIcon, LogInIcon, NotebookPenIcon } from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const links = [
    {
      label: "To Do's",
      href: "#",
      icon: (
        <NotebookPenIcon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },

    {
      label: "Integrations",
      href: "#",
      icon: (
        <BlocksIcon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex w-full font-mono flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto pointer-events-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex text-lg flex-col gap-10 pointer-events-auto">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="pointer-events-auto">
            <SignedIn>
              <div className="flex items-center justify-evenly">
                <UserButton />
                {open && (
                  <p>
                    {user?.firstName} {user?.lastName}
                  </p>
                )}
              </div>
            </SignedIn>
            <SignedOut>
              <div className="cursor-pointer flex items-center justify-evenly">
                <LogInIcon onClick={() => openSignIn({})} />
                {open && <SignInButton mode="modal" />}
              </div>
            </SignedOut>
          </div>
        </SidebarBody>
      </Sidebar>
      <Board />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black cursor-pointer"
    >
      <Image src={icon} alt="Logo" width={40} height={40} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white cursor-pointer"
      >
        Neon Wave
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image src={icon} alt="Logo" width={40} height={40} />
    </Link>
  );
};
