/**
 * Gets all drop indicator elements in a specific column
 * Used to determine possible positions where a card can be dropped
 *
 * @param column - The column identifier (backlog, todo, doing, done)
 * @returns Array of HTMLElements that serve as drop indicators
 */
export const getIndicators = (column: string): HTMLElement[] => {
  // Ensure this function is only called in browser environment
  if (typeof document === "undefined") {
    return [];
  }

  // Query for all elements that have data-column attribute matching the column
  return Array.from(
    document.querySelectorAll(`[data-column="${column}"]`)
  ) as HTMLElement[];
};
