/**
 * Represents a drop indicator element with its offset from cursor position
 */
interface IndicatorElement {
  offset: number;
  element: HTMLElement | null;
}

/**
 * Calculates which drop indicator is closest to the current drag position
 * Used to determine where a card will be placed when dropped
 *
 * @param e - The drag event containing cursor position
 * @param indicators - Array of indicator elements in the column
 * @returns The closest indicator and its distance offset
 */
export const getNearestIndicator = (
  e: React.DragEvent<HTMLElement>,
  indicators: HTMLElement[]
): IndicatorElement => {
  // This offset helps determine proximity - adjust if needed for UX
  const DISTANCE_OFFSET = 50;

  // Handle empty indicators array
  if (!indicators || indicators.length === 0) {
    return { offset: 0, element: null };
  }

  // Get the default element (last one or null if none exist)
  // This handles the case of dropping at the end of the list
  const defaultElement =
    indicators.length > 0 ? indicators[indicators.length - 1] : null;

  // Find the indicator that is closest above the cursor position
  const el = indicators.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();

      // Calculate vertical distance from cursor to indicator plus offset
      const offset = e.clientY - (box.top + DISTANCE_OFFSET);

      // If indicator is above the cursor (negative offset)
      // AND closer than previously found closest indicator, use this one
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      // Start with negative infinity to ensure something will be found
      offset: Number.NEGATIVE_INFINITY,
      element: defaultElement,
    }
  );

  return el;
};
