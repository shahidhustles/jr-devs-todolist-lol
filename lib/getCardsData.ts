"use server";

import { Card } from "@/components/Board";
import { api } from "@/convex/_generated/api";
import { DEFAULT_CARDS } from "@/lib/defaultCards";
import { currentUser } from "@clerk/nextjs/server";
import { convex } from "./convexClient";

// Function to fetch cards data from the server
// Note: This is for initial/server-side data loading.
// For real-time updates, use the useCards hook on the client
export async function getCardsData() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const fetchedTasks = await convex.query(api.tasks.getTasksByUid, {
    userId: user.id,
  });

  let cards: Card[] = [];
  if (fetchedTasks.length) {
    cards = fetchedTasks.map((task) => task.card);
  } else {
    cards = DEFAULT_CARDS;
  }

  return cards;
}