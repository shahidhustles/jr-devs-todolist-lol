import { clearHighlights } from "./clearHighlights";
import { getIndicators } from "./getIndicators";
import { getNearestIndicator } from "./getNearestIndicator";

/**
 * Highlights the nearest drop indicator to the current mouse position
 * This function is called when a card is being dragged over a column
 *
 * @param e - The drag event
 * @param column - The column identifier (backlog, todo, doing, done)
 */
export const highlightIndicator = (
  e: React.DragEvent<HTMLElement>,
  column: string
) => {
  // Get all indicators in this column
  const indicators = getIndicators(column);

  // Clear any previously highlighted indicators
  clearHighlights(indicators);

  // Only proceed if we have indicators
  if (indicators.length === 0) {
    return;
  }

  // Find the nearest indicator to the current cursor position
  const el = getNearestIndicator(e, indicators);

  // Highlight the nearest indicator by setting its opacity to 1
  // Only set opacity if element exists
  if (el && el.element) {
    el.element.style.opacity = "1";
  }
};
