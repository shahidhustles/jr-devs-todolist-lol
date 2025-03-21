"use client";

import { Card } from "./Board";
import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator";
import { GlowingEffect } from "./ui/glowing-effect";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { CheckCheckIcon, SquarePenIcon, Trash2Icon } from "lucide-react";

/**
 * Represents a task card in the kanban board
 * Each card can be dragged and dropped between columns
 */
const TodoCard = ({
  title,
  id,
  column,
  handleDragStart,
  setBurnActive,
}: Card) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="relative mt-2">
          {/* 
        Each card has a drop indicator above it
        This creates the drop zones between cards
      */}
          <DropIndicator beforeId={id} column={column} />
          <GlowingEffect
            spread={20}
            glow={true}
            disabled={false}
            proximity={0}
            inactiveZone={0.01}
            borderWidth={3}
          />
          <motion.div
            layout // Animate layout changes with Framer Motion
            layoutId={id} // Used by Framer Motion for smooth transitions
            draggable="true" // Make the card draggable
            onDragStart={(event) => {
              handleDragStart?.(
                event as unknown as React.DragEvent<HTMLElement>,
                {
                  title,
                  id,
                  column,
                }
              );
              setBurnActive?.(true);
            }}
            className="cursor-grab rounded-lg  border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
          >
            <p className="text-sm text-neutral-100">{title}</p>
          </motion.div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56 bg-neutral-800 border border-neutral-700">
        <ContextMenuItem inset className="cursor-pointer">
          <SquarePenIcon className="mr-1" />
          Edit Task
        </ContextMenuItem>

        <ContextMenuSeparator />

        {/* TODO : Disable when already in respective col  */}
        <ContextMenuItem inset className="cursor-pointer">
          <CheckCheckIcon className="mr-1" />
          Mark as Complete
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Move To</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48 bg-neutral-800 border border-neutral-700">
            <ContextMenuItem className="cursor-pointer">
              Backlog
            </ContextMenuItem>

            <ContextMenuItem className="cursor-pointer">TODO</ContextMenuItem>

            <ContextMenuItem>In Progress</ContextMenuItem>

            <ContextMenuItem className="cursor-pointer">
              Completed
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />

        <ContextMenuItem inset className="cursor-pointer text-red-500">
          <Trash2Icon className="mr-1" />
          Trash
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
export default TodoCard;
