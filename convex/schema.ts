import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    userId: v.string(),
    card: v.object({
      title: v.string(),
      id: v.string(),
      column: v.string(),
    }),
  })
    .index("by_user_id", ["userId"])
    .index("by_cardId", ["card.id"])
    .index("by_card_user_id", ["userId", "card.id"])
});
