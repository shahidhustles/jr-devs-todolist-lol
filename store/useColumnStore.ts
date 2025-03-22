import { Card } from "@/components/Board";
import { api } from "@/convex/_generated/api";
import { convex } from "@/lib/convexClient";
import { create } from "zustand";

type Store = {
  cards: Card[];
  getCardIdxById: (cardId: string) => number;
  addCard: (card: Card) => void;
  updateColOfCard: (cardId: string, newColumn: string, userId: string) => void;
  moveCardToTrash: (cardId: string, userId: string) => void;
  reorderCards: (
    cardId: string,
    newColumn: string,
    beforeId: string | null,
    userId: string
  ) => void;
  initializeCards: (initialCards: Card[]) => void; // New method
};

export const useColumnStore = create<Store>()((set, get) => ({
  cards: [],
  getCardIdxById: (cardId: string) => {
    const state = get();
    const card = state.cards.find((card) => card.id === cardId);
    if (!card) {
      console.error(`Card with id ${cardId} not found`);
      return -1;
    }
    return state.cards.indexOf(card);
  },

  addCard: (card: Card) => {
    try {
      set((state) => ({ cards: [...state.cards, card] }));

      if (card.userId) {
        convex
          .mutation(api.tasks.addTask, {
            column: card.column,
            id: card.id,
            title: card.title,
            userId: card.userId,
          })
          .catch((err) => {
            console.error("Failed to add card to backend:", err);
          });
      }
    } catch (error) {
      console.error("Error adding card:", error);
    }
  },

  updateColOfCard: (cardId: string, newColumn: string, userId: string) => {
    try {
      const state = get();
      const index = state.getCardIdxById(cardId);

      if (index === -1) return;

      const updatedCards = [...state.cards];
      updatedCards[index].column = newColumn;
      set(() => ({
        cards: updatedCards,
      }));

      convex
        .mutation(api.tasks.updateColOfTask, {
          id: cardId,
          newColumn: newColumn,
          userId: userId,
        })
        .catch((err) => {
          console.error("Failed to update column in backend:", err);
        });
    } catch (error) {
      console.error("Error updating column:", error);
    }
  },

  moveCardToTrash: (cardId: string, userId: string) => {
    try {
      console.log("Trashing card:", cardId);

      const state = get();
      const updatedCards = state.cards.filter((card) => card.id !== cardId);
      set(() => ({
        cards: updatedCards,
      }));
      convex.mutation(api.tasks.deleteTask, {
        cardId: cardId,
        userId: userId,
      });
    } catch (error) {
      console.error("Error moving card to trash:", error);
    }
  },

  reorderCards: (
    cardId: string,
    newColumn: string,
    beforeId: string | null,
    userId: string
  ) => {
    try {
      console.log(
        "Reordering card:",
        cardId,
        "to column:",
        newColumn,
        "before:",
        beforeId
      );

      const state = get();
      const copy = [...state.cards];

      // Find the card to move
      const cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) {
        console.error("Card to transfer not found:", cardId);
        return;
      }

      // Create an updated version with the new column
      const updatedCard = { ...cardToTransfer, column: newColumn };
      state.updateColOfCard(cardId, newColumn, userId);
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
    } catch (error) {
      console.error("Error reordering cards:", error);
    }
  },

  initializeCards: (initialCards: Card[]) => {
    set({ cards: initialCards });
    const state = get();
    console.log("Successfully set the global state", state.cards);
  },
}));
