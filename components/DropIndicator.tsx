"use client";

/**
 * A visual indicator showing where a card will be placed when dropped
 * Appears as a horizontal line between cards when dragging
 *
 * @param beforeId - The ID of the card that would be above the indicator
 * @param column - The column this indicator belongs to
 */
const DropIndicator = ({
  beforeId,
  column,
}: {
  beforeId: string | null;
  column: string;
}) => {
  return (
    <div
      data-before={beforeId || "-1"} // "-1" means "drop at the end of the list"
      data-column={column} // Used to identify which column this indicator belongs to
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0" // Initially invisible
    />
  );
};

export default DropIndicator;
