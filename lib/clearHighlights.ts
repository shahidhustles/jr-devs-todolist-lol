
import { getIndicators } from "./getIndicators";

/**
 * Resets all drop indicators to be invisible
 * Called to clear previous highlighting when drag position changes
 *
 * @param els - Optional array of indicator elements to clear
 * @param column - Optional column identifier to clear indicators from
 */
export const clearHighlights = (
  els?: HTMLElement[] | NodeListOf<Element> | null,
  column?: string,

) => {

  if (!els && !column) {
    console.warn("clearHighlights: Either els or column must be provided");
    return;
  }

  // Ensure indicators is always a proper array
  let indicators: HTMLElement[];

  if (els) {
    // Convert to array if it's not already an array
    indicators = Array.isArray(els) ? els : (Array.from(els) as HTMLElement[]);
  } else if (column) {
    // If column is provided, get all indicators in that column
    indicators = getIndicators(column);
  } else {
    indicators = [];
  }

  // Hide all indicators by setting opacity to 0
  indicators.forEach((i: HTMLElement) => {
    i.style.opacity = "0";
  });
};
