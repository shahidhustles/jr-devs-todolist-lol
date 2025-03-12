"use client";

import { DEFAULT_CARDS } from "@/lib/defaultCards";
import { useState } from "react";
import Column from "./Column";
import BurnBarrel from "./BurnBarrel";

/**
 * Card interface represents a task in the kanban board
 * Used throughout the application for consistency
 */
export interface Card {
  title: string;
  id: string;
  column: string;
  handleDragStart?: (event: React.DragEvent<HTMLElement>, card: Card) => void;
}

/**
 * Main kanban board component that orchestrates the entire UI
 * Contains all columns and manages the shared cards state
 */
const Board = () => {
  // Single source of truth for all cards across all columns
  const [cards, setCards] = useState<Card[]>(DEFAULT_CARDS);

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      {/* Render each column with appropriate cards */}
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />

      {/* Burn barrel lets you delete cards by dropping them on it */}
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

export default Board;
