"use client";

import { DEFAULT_CARDS } from "@/lib/defaultCards";
import { Dispatch, SetStateAction, useState } from "react";
import Column from "./Column";
import BurnBarrel from "./BurnBarrel"; // Import BurnBarrel
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";

/**
 * Card interface represents a task in the kanban board
 * Used throughout the application for consistency
 */
export interface Card {
  title: string;
  id: string;
  column: string;
  handleDragStart?: (event: React.DragEvent<HTMLElement>, card: Card) => void;
  setBurnActive?: Dispatch<SetStateAction<boolean>>;
}

/**
 * Main kanban board component
 * Contains all columns and manages the shared cards state
 */
const Board = () => {
  const [cards, setCards] = useState<Card[]>(DEFAULT_CARDS);
  const [burnActive, setBurnActive] = useState<boolean>(false);

  return (
    <BackgroundBeamsWithCollision>
      <div className="flex h-full bg-gradient-to-b from-[#120329] from-0% via-[#2d0252] via-33% to-[#8e027b] to-50% rounded-2xl justify-center  w-full gap-3 overflow-scroll p-12   ">
        <Column
          title="Backlog"
          column="backlog"
          headingColor="text-neutral-500"
          cards={cards}
          setCards={setCards}
          setBurnActive={setBurnActive}
        />
        <Column
          title="TODO"
          column="todo"
          headingColor="text-yellow-200"
          cards={cards}
          setCards={setCards}
          setBurnActive={setBurnActive}
        />
        <Column
          title="In progress"
          column="doing"
          headingColor="text-blue-200"
          cards={cards}
          setCards={setCards}
          setBurnActive={setBurnActive}
        />
        <Column
          title="Complete"
          column="done"
          headingColor="text-emerald-200"
          cards={cards}
          setCards={setCards}
          setBurnActive={setBurnActive}
        />

        {/* Add burn barrel in a fixed position at the bottom right */}
        {burnActive && (
          <div className="absolute bottom-8 right-8">
            <BurnBarrel setCards={setCards} setBurnActive={setBurnActive} />
          </div>
        )}
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default Board;
