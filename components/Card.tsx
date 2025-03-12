"use client";

import { Card } from "./Board";
import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator";

/**
 * Represents a task card in the kanban board
 * Each card can be dragged and dropped between columns
 */
const TodoCard = ({ title, id, column, handleDragStart }: Card) => {
  return (
    <>
      {/* 
        Each card has a drop indicator above it
        This creates the drop zones between cards
      */}
      <DropIndicator beforeId={id} column={column} />

      <motion.div
        layout // Animate layout changes with Framer Motion
        layoutId={id} // Used by Framer Motion for smooth transitions
        draggable="true" // Make the card draggable
        onDragStart={(event) =>
          handleDragStart?.(event as unknown as React.DragEvent<HTMLElement>, {
            title,
            id,
            column,
          })
        }
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  );
};
export default TodoCard;
