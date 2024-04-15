import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { relations } from "drizzle-orm";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email').unique().notNull(),
    userName: varchar('username').unique().notNull(),
    firstName: varchar('first_name'),
    lastName: varchar('last_name')
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const userRelations = relations(users, ({ one }) => ({
    member: one(members, {
        fields: [users.id],
        references: [members.userId]
    }),
}));

export const members = pgTable('members', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
});

export const memberRelations = relations(members, ({ many }) => ({
    posts: many(posts),
    votes: many(votes),
    comments: many(comments),
}));

export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    postType: varchar('post_type').notNull(),
    title: varchar('title').notNull(),
    content: text('text').notNull(),
    dateCreated: timestamp('date_created').notNull(),
    memberId: integer('member_id').notNull().references(() => members.id),
});

export const postRelations = relations(posts, ({one, many}) => ({
    memberPostedBy: one(members, {
        fields: [posts.memberId],
        references: [members.id]
    }),
    comments: many(comments),
    votes: many(votes),
}));

export const comments = pgTable('comments', {
    id: serial('id').primaryKey(),
    text: text('text').notNull(),
    memberId: integer('member_id').notNull().references(() => members.id),
    postId: integer('post_id').notNull().references(() => posts.id),
});

export const commentRelations = relations(comments, ({one}) => ({
    memberPostedBy: one(members, {
        fields: [comments.memberId],
        references: [members.id]
    }),
}));

export const votes = pgTable('votes', {
    id: serial('id').primaryKey(),
    voteType: varchar('vote_type').notNull(),
    memberId: integer('member_id').notNull().references(() => members.id),
    postId: integer('post_id').notNull().references(() => posts.id),
});

export const votesRelations = relations(votes, ({one}) => ({
    memberPostedBy: one(members, {
        fields: [votes.memberId],
        references: [members.id]
    }),
}));