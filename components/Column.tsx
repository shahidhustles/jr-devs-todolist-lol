"use client";

import { getIndicators } from "@/lib/getIndicators";
import { getNearestIndicator } from "@/lib/getNearestIndicator";
import { useState } from "react";
import { Card } from "./Board";
import { clearHighlights } from "@/lib/clearHighlights";
import { highlightIndicator } from "@/lib/highlightIndicator";
import TodoCard from "./Card";
import DropIndicator from "./DropIndicator";
import AddCard from "./AddCard";
import { useColumnStore } from "@/store/useColumnStore";
import { Dispatch, SetStateAction } from "react";
import { useUser } from "@clerk/nextjs";


type ColumnProps = {
  title: string;
  column: string; // Changed from columnName to match Board.tsx
  headingColor: string; // Added missing prop
  cards: Card[];
  setBurnActive: Dispatch<SetStateAction<boolean>>; // Added missing prop
};

/**
 * Represents a column in the kanban board (Backlog, Todo, Doing, Done)
 * Handles drag and drop functionality for cards within the column
 */
export default function Column({
  title,
  column,
  headingColor,
  cards,
  setBurnActive,
}: ColumnProps) {
  // Track if a card is currently being dragged over this column
  const [active, setActive] = useState<boolean>(false);
  const { user } = useUser();
  if (!user) {
    throw new Error("unauthorized");
  }
  /**
   * Called when a card starts being dragged
   * Stores the card ID in the drag event data
   */
  const handleDragStart = (e: React.DragEvent<HTMLElement>, card: Card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  /**
   * Called when a card is dropped in this column
   * Rearranges the cards array based on where the card was dropped
   */
  const handleDragEnd = (e: React.DragEvent<HTMLElement>) => {
    const cardId = e.dataTransfer.getData("cardId");
    setActive(false);
    clearHighlights(null, column); // Clear drop indicators when drag ends

    // Find the nearest indicator to drop position
    const indicators = getIndicators(column);
    const { element } = getNearestIndicator(e, indicators);

    if (!element) {
      // If no valid drop target was found, we still need to hide the burn barrel
      setBurnActive(false);
      return;
    }

    // Get the id of the card to insert before
    const beforeId = element.dataset.before || "-1";

    // Only update if the card position actually changes
    if (beforeId !== cardId) {
      // Get reorderCards function from the store
      const { reorderCards } = useColumnStore.getState();

      // Update card position using the new function
      reorderCards(cardId, column, beforeId, user?.id);
    }

    // Hide the burn barrel after successful placement
    setBurnActive(false);
  };

  /**
   * Called continuously when a card is being dragged over this column
   * Shows drop indicators to guide the user
   */
  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    highlightIndicator(e, column);

    setActive(true);
  };

  /**
   * Called when a card is dragged out of this column
   * Clears the drop indicators
   */
  const handleDragLeave = () => {
    clearHighlights(null, column);
    setActive(false);
  };

  // Filter cards that belong to this column
  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-56 shrink-0 ">
      <div className="mb-3 flex items-center justify-between">
        <h3
          className={`font-medium ${headingColor} [text-shadow:0_0_4px_currentColor,0_0_7px_rgba(255,90,200,0.4)]`}
        >
          {title}
        </h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {/* Render all cards in this column */}
        {filteredCards.map((c) => {
          return (
            <TodoCard
              key={c.id}
              {...c}
              handleDragStart={handleDragStart}
              setBurnActive={setBurnActive}
            />
          );
        })}

        {/* Add a final drop indicator at the bottom of the column */}
        <DropIndicator beforeId={null} column={column} />

        {/* Button to add new cards to this column */}
        <AddCard column={column} />
      </div>
    </div>
  );
}
