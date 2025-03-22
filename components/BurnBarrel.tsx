"use client";

import { useState } from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { Dispatch, SetStateAction } from "react";
import { useUser } from "@clerk/nextjs";

type BurnBarrelProps = {
  moveCardToTrash: (cardId: string, userId: string) => void;
  setBurnActive: Dispatch<SetStateAction<boolean>>;
};

const BurnBarrel = ({ moveCardToTrash, setBurnActive }: BurnBarrelProps) => {
  const [active, setActive] = useState(false);
  const { user } = useUser();

  if (!user) {
    throw new Error("Unauthorized");
  }
  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
    setBurnActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");
    moveCardToTrash(cardId, user.id);
    setActive(false);
    setBurnActive(false);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-gray-500 bg-black text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

export default BurnBarrel;
