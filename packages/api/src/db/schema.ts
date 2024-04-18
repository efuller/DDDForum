import { AnyPgColumn, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { relations } from "drizzle-orm";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email').unique().notNull(),
    userName: varchar('username').unique().notNull(),
    firstName: varchar('first_name'),
    lastName: varchar('last_name'),
    password: varchar('password').notNull(),
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

export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;

export const memberRelations = relations(members, ({ many }) => ({
    posts: many(posts),
    votes: many(votes),
    comments: many(comments),
}));

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

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
    parentCommentId: integer('parent_comment_id').references((): AnyPgColumn => comments.id),
});

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;

export const commentRelations = relations(comments, ({one}) => ({
    memberPostedBy: one(members, {
        fields: [comments.memberId],
        references: [members.id]
    }),
    post: one(posts, {
        fields: [comments.postId],
        references: [posts.id]
    }),
}));

export const votes = pgTable('votes', {
    id: serial('id').primaryKey(),
    voteType: varchar('vote_type').notNull(),
    memberId: integer('member_id').notNull().references(() => members.id),
    postId: integer('post_id').notNull().references(() => posts.id),
});

export type Vote = typeof votes.$inferSelect;
export type NewVote = typeof votes.$inferInsert;

export const votesRelations = relations(votes, ({one}) => ({
    memberPostedBy: one(members, {
        fields: [votes.memberId],
        references: [members.id]
    }),
    post: one(posts, {
        fields: [votes.postId],
        references: [posts.id]
    }),
}));