import { Card } from "@/components/Board";
import { DEFAULT_CARDS } from "@/lib/defaultCards";
import { create } from "zustand";

type Store = {
  cards: Card[];
  getCardIdxById: (cardId: string) => number;
  setCards: (cards: Card[]) => void;
  addCard: (card: Card) => void;
  updateColOfCard: (cardId: string, newColumn: string) => void;
  moveCardToTrash: (cardId: string) => void;
  reorderCards: (
    cardId: string,
    newColumn: string,
    beforeId: string | null
  ) => void;
};

export const useColumnStore = create<Store>()((set, get) => ({
  cards: [...DEFAULT_CARDS],
  setCards: (cards: Card[]) => set({ cards }),
  getCardIdxById: (cardId: string) => {
    const state = get();
    const card = state.cards.find((card) => card.id === cardId);
    if (!card) {
      throw new Error(`Card with id ${cardId} not found`);
    }
    return state.cards.indexOf(card);
  },
  addCard: (card: Card) => set((state) => ({ cards: [...state.cards, card] })),
  updateColOfCard: (cardId: string, newColumn: string) => {
    const state = get();
    const index = state.getCardIdxById(cardId);
    const updatedCards = [...state.cards];
    updatedCards[index].column = newColumn;
    set(() => ({
      cards: updatedCards,
    }));
  },
  moveCardToTrash: (cardId: string) => {
    const state = get();
    const updatedCards = state.cards.filter((card) => card.id !== cardId);
    set(() => ({
      cards: updatedCards,
    }));
  },
  // New function to handle card reordering with proper positioning
  reorderCards: (
    cardId: string,
    newColumn: string,
    beforeId: string | null
  ) => {
    const state = get();
    const copy = [...state.cards];

    // Find the card to move
    const cardToTransfer = copy.find((c) => c.id === cardId);
    if (!cardToTransfer) return;

    // Create an updated version with the new column
    const updatedCard = { ...cardToTransfer, column: newColumn };

    // Remove the card from its current position
    const filteredCards = copy.filter((c) => c.id !== cardId);

    // If beforeId is null or "-1", add to the end of the column
    if (!beforeId || beforeId === "-1") {
      set({ cards: [...filteredCards, updatedCard] });
      return;
    }

    // Otherwise, insert before the specified card
    const insertAtIndex = filteredCards.findIndex((c) => c.id === beforeId);
    if (insertAtIndex === -1) {
      // If target card not found, just append to the end
      set({ cards: [...filteredCards, updatedCard] });
      return;
    }

    // Insert at the specific position
    const result = [
      ...filteredCards.slice(0, insertAtIndex),
      updatedCard,
      ...filteredCards.slice(insertAtIndex),
    ];

    set({ cards: result });
  },
}));
