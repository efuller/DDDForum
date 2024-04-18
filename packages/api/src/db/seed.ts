import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from 'pg';
import { getDBUri } from "../config";
import {
  members,
  NewPost,
  NewUser,
  Post,
  posts,
  users,
  NewVote,
  votes,
  NewComment,
  comments,
  Member
} from "./schema";

const pool = new Pool({
    connectionString: getDBUri()
});

const db = drizzle(pool);

const initialUsers: NewUser[] = [
  {
    email: "bobvance@gmail.com",
    firstName: "Bob",
    lastName: "Vance",
    userName: "bobvance",
    password: '123'
  },
  {
    email: "tonysoprano@gmail.com",
    firstName: "Tony",
    lastName: "Soprano",
    userName: "tonysoprano",
    password: '123'
  },
  {
    email: "billburr@gmail.com",
    firstName: "Bill",
    lastName: "Burr",
    userName: "billburr",
    password: '123'
  },
];

const initialPosts: Partial<NewPost>[] = [
  {
    title: 'First post!',
    content: "This is bob vances first post",
    postType: "Text",
    dateCreated: new Date(),
  },
  {
    title: 'Second post!',
    content: "This is bobs second post",
    postType: "Text",
    dateCreated: new Date(),
  },
  {
    title: 'another post',
    content: "This is tonys first post",
    postType: "Text",
    dateCreated: new Date(),
  },
  {
    title: 'Links',
    content: "This is a link post",
    postType: "https://khalilstemmler.com>",
    dateCreated: new Date(),
  },
];

function createInitialPostVotes(newMembers: Member[], newPosts: Post[]): NewVote[] {
  return [
    {
      memberId: newMembers[0].id,
      postId: newPosts[0].id,
      voteType: 'Upvote'
    },
    {
      memberId: newMembers[0].id,
      postId: newPosts[1].id,
      voteType: 'Upvote'
    },
    {
      memberId: newMembers[1].id,
      postId: newPosts[2].id,
      voteType: 'Upvote'
    },
    {
      memberId: newMembers[1].id,
      postId: newPosts[3].id,
      voteType: 'Upvote'
    },
    {
      memberId: newMembers[0].id,
      postId: newPosts[2].id,
      voteType: 'Upvote'
    },
    {
      memberId: newMembers[2].id,
      postId: newPosts[1].id,
      voteType: 'Downvote'
    },
  ];
}

async function main() {
  console.log('Seeding database started...');

  const newUsers = await db
    .insert(users)
    .values(initialUsers)
    .returning();

  for (const user of newUsers) {
    await db
      .insert(members)
      .values({
        userId: user.id
      })
      .returning();
  }

  const newMembers = await db
    .select()
    .from(members)
    .execute();

  initialPosts[0].memberId = newMembers[0].id;
  initialPosts[1].memberId = newMembers[0].id;
  initialPosts[2].memberId = newMembers[1].id;
  initialPosts[3].memberId = newMembers[1].id;

  const newPosts: Post[] = await db
    .insert(posts)
    .values(initialPosts as NewPost[])
    .returning();

  const initialPostVotes: NewVote[] = createInitialPostVotes(newMembers, newPosts);

  await db
    .insert(votes)
    .values(initialPostVotes)
    .execute();

  const initialPostComments: NewComment[] = [
    { text: 'I posted this!', memberId: newMembers[0].id, postId: newPosts[0].id, parentCommentId: null },
    { text: 'Nice', memberId: newMembers[1].id, postId: newPosts[1].id, parentCommentId: null }
  ];

  await db
    .insert(comments)
    .values(initialPostComments)
    .execute();
}

main().then().catch((err) => {
  console.error('Error seeding database', err);
  process.exit(0);
});

export {main};