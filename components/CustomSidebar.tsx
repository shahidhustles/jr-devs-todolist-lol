"use client";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import icon from "../public/icon.svg";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { SignInButton, useClerk } from "@clerk/clerk-react";
import { BlocksIcon, LogInIcon, NotebookPenIcon } from "lucide-react";

export default function CustomSidebar() {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [open, setOpen] = useState(false);
  
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

  return (
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
              <UserButton afterSignOutUrl="/"/>
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
  );
}

const Logo = () => {
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

const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image src={icon} alt="Logo" width={40} height={40} />
    </Link>
  );
};
