"use client";

import { Dispatch, SetStateAction, useEffect, useState} from "react";
import Column from "./Column";
import BurnBarrel from "./BurnBarrel";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import { useColumnStore } from "@/store/useColumnStore";
import { useCards } from "@/hooks/useCards";
import { KanbanSkeleton } from "./TodoSkeleton";
import { getCardsData } from "@/lib/getCardsData";

/**
 * Card interface represents a task in the kanban board
 * Used throughout the application for consistency
 */
export interface Card {
  userId?: string;
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
  const { moveCardToTrash } = useColumnStore();
  const [burnActive, setBurnActive] = useState<boolean>(false);
  const { cards, isLoading } = useCards();

  useEffect(() => {
    const initializeStore = async () => {
      const cards = await getCardsData();
      //this doesnt create a subscription to the zustand store. so that it doesnt repeat itself like b4. 
      useColumnStore.getState().initializeCards(cards);
    };
    initializeStore()
  }, [])

  // Show loading state with skeleton UI
  if (isLoading) {
    return (
      <BackgroundBeamsWithCollision>
        <div className="flex h-full bg-gradient-to-b from-[#120329] from-0% via-[#2d0252] via-33% to-[#8e027b] to-50% rounded-2xl justify-center w-full gap-3 overflow-scroll p-12">
          <KanbanSkeleton />
        </div>
      </BackgroundBeamsWithCollision>
    );
  }

  // Group cards by column
  const backlogCards = cards.filter((card) => card.column === "backlog");
  const todoCards = cards.filter((card) => card.column === "todo");
  const inProgressCards = cards.filter((card) => card.column === "inProgress");
  const doneCards = cards.filter((card) => card.column === "done");

  return (
    <BackgroundBeamsWithCollision>
      <div className="flex h-full bg-gradient-to-b from-[#120329] from-0% via-[#2d0252] via-33% to-[#8e027b] to-50% rounded-2xl justify-center  w-full gap-3 overflow-scroll p-12   ">
        <Column
          title="Backlog"
          column="backlog"
          headingColor="text-neutral-500"
          cards={backlogCards}
          setBurnActive={setBurnActive}
        />
        <Column
          title="TODO"
          column="todo"
          headingColor="text-yellow-200"
          cards={todoCards}
          setBurnActive={setBurnActive}
        />
        <Column
          title="In progress"
          column="inProgress"
          headingColor="text-blue-200"
          cards={inProgressCards}
          setBurnActive={setBurnActive}
        />
        <Column
          title="Complete"
          column="done"
          headingColor="text-emerald-200"
          cards={doneCards}
          setBurnActive={setBurnActive}
        />

        {/* Add burn barrel in a fixed position at the bottom right */}
        {burnActive && (
          <div className="absolute bottom-8 right-50%">
            <BurnBarrel
              moveCardToTrash={moveCardToTrash}
              setBurnActive={setBurnActive}
            />
          </div>
        )}
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default Board;
