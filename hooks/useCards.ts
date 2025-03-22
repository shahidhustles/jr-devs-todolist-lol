"use client";

import { Card } from "@/components/Board";
import { api } from "@/convex/_generated/api";
import { DEFAULT_CARDS } from "@/lib/defaultCards";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

export function useCards() {
  const { user } = useUser();

  // Using useQuery instead of a one-time fetch for real-time updates
  const tasks = useQuery(api.tasks.getTasksByUid, {
    userId: user?.id || "",
  });

  // Handle loading state
  if (tasks === undefined) {
    return { cards: [], isLoading: true };
  }

  // Process the data
  let cards: Card[] = [];
  if (tasks && tasks.length > 0) {
    cards = tasks.map((task) => task.card);
  } else {
    cards = DEFAULT_CARDS;
  }

  return { cards, isLoading: false };
}
