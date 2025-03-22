import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTasksByUid = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) =>
    await ctx.db
      .query("tasks")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect(),
});

// mutation to add task
export const addTask = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    column: v.string(),
    id: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tasks", {
      card: {
        column: args.column,
        title: args.title,
        id: args.id,
      },
      userId: args.userId,
    });
  },
});

//mutation to delete task

export const deleteTask = mutation({
  args: {
    cardId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db
      .query("tasks")
      .withIndex("by_card_user_id", (q) => q.eq("userId", args.userId).eq("card.id", args.cardId))
      .unique();

    if (!task) {
      return;
    }

    await ctx.db.delete(task._id);
  },
});

//mutation to patch task.
export const updateColOfTask = mutation({
  args: {
    userId: v.string(),
    newColumn: v.string(),
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db
      .query("tasks")
      .withIndex("by_card_user_id", (q) => q.eq("userId", args.userId).eq("card.id", args.id))
      .unique();

    if (!task) {
      return;
    }

    await ctx.db.patch(task?._id, {
      card: {
        ...task.card,
        column: args.newColumn,
      },
    });
  },
});
