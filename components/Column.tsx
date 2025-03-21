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

type ColumnType = {
  title: string;
  headingColor: string;
  cards: Card[];
  column: string;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;

  setBurnActive: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Represents a column in the kanban board (Backlog, Todo, Doing, Done)
 * Handles drag and drop functionality for cards within the column
 */
const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,

  setBurnActive,
}: ColumnType) => {
  // Track if a card is currently being dragged over this column
  const [active, setActive] = useState<boolean>(false);

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

    //get its id to compare with card id
    const before = element.dataset.before || "-1";

    // Only update if the card position actually changes
    if (before !== cardId) {
      let copy = [...cards];

      // Find the card being moved
      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) {
        setBurnActive(false);
        return;
      }

      // Update its column to the current column
      cardToTransfer = { ...cardToTransfer, column };

      // Remove it from the old position
      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        // If dropping at the end
        copy.push(cardToTransfer);
      } else {
        // If dropping between cards
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) {
          setBurnActive(false);
          return;
        }

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      // Update the cards state
      setCards(copy);
    }

    // Only hide the burn barrel after successful placement
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
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};
export default Column;
