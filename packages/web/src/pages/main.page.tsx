import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import arrowImage from "@/assets/arrow.svg";
import { Link } from "react-router-dom";

type Vote = { id: number, postId: number, voteType: 'Upvote' | 'Downvote' };
type Comment = {};

type Post = {
  title: string;
  dateCreated: string;
  memberPostedBy: { user: { userName: string } };
  comments: Comment[];
  votes: Vote[];
}

function dateDiff (date1: Date, date2: Date) {
  let dateText = 'days ago';
  const diff = date1.getTime() - date2.getTime();

  if (diff === 1) {
    dateText = 'day ago';
  }

  return Math.abs(Math.round(diff / (1000 * 60 * 60 * 24))).toString() + ' ' + dateText;
}

const posts: Post[] = [
  {
    title: 'Domain services vs Application services',
    dateCreated: 'Sat Apr 06 2024 21:02:15 GMT-0400',
    memberPostedBy: {
      user: {
        userName: 'stemmlerjs'
      }
    },
    comments: [{}, {}, {}, {}, {}],
    votes: [
      {
        id: 1,
        postId: 1,
        voteType: 'Upvote'
      },
      {
        id: 2,
        postId: 1,
        voteType: 'Downvote'
      },
      {
        id: 3,
        postId: 1,
        voteType: 'Upvote'
      }
    ]
  },
  {
    title: 'Ports and Adapters',
    dateCreated: 'Fri Apr 05 2024 21:02:56 GMT-0400',
    memberPostedBy: {
      user: {
        userName: 'stemmlerjs'
      }
    },
    comments: [{}],
    votes: [
      {
        id: 1,
        postId: 2,
        voteType: 'Upvote'
      },
      {
        id: 2,
        postId: 2,
        voteType: 'Downvote'
      },
      {
        id: 3,
        postId: 2,
        voteType: 'Upvote'
      },
      {
        id: 3,
        postId: 2,
        voteType: 'Upvote'
      }
    ]
  },
  {
    title: 'An Introduction to Domain-Driven Design DDD w/ TypeScript',
    dateCreated: 'Tue Apr 02 2024 21:03:16 GMT-0400',
    memberPostedBy: {
      user: {
        userName: 'stemmlerjs'
      }
    },
    comments: [{}, {}, {}, {}, {}],
    votes: [
      {
        id: 1,
        postId: 1,
        voteType: 'Upvote'
      },
      {
        id: 2,
        postId: 1,
        voteType: 'Downvote'
      },
      {
        id: 3,
        postId: 1,
        voteType: 'Upvote'
      }
    ]
  },

]

const Vote = ({computedVotes}: { computedVotes: number}) => (
  <div className="flex flex-col justify-between mr-4">
    <div>
      <Button variant="ghost" asChild>
        <img src={arrowImage} alt="upvote"/>
      </Button>
    </div>
    <div>
      {computedVotes}
    </div>
    <div>
      <Button variant="ghost" asChild>
        <img className="rotate-180" src={arrowImage} alt="downvote"/>
      </Button>
    </div>
  </div>
);

const PostsViewSwitcher = () => (
  <div>
  <Button variant="ghost">Popular</Button>
    {' |'}
    <Button variant="ghost">New</Button>
  </div>
);

const PostList = ({posts}: {posts: Post[]}) => {
  if (!posts.length) {
    return <div>No posts found</div>;
  }

  return (
    <ul>
      {
        posts.map((post) => (
          <li className="flex mb-4" key={post.dateCreated}>
            <Vote computedVotes={9}/>
            <Card className="flex-1">
              <CardContent className="text-left pb-4 pt-4">
                <h2>{post.title}</h2>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">{dateDiff(new Date(post.dateCreated), new Date())}</Badge>
                <Badge variant="outline">
                  <Link to={`/member/${post.memberPostedBy.user.userName}`}>
                    by {post.memberPostedBy.user.userName}
                  </Link>
                  </Badge>
                <Badge variant="outline">
                  {post.comments.length}{" "}
                  {post.comments.length === 1 ? 'comment' : 'comments'}
                </Badge>
              </CardFooter>
            </Card>
          </li>
        ))
      }
    </ul>
  );
}

export const MainPage = () => {
  return (
    <div>
      <PostsViewSwitcher />
      <PostList posts={posts}/>
    </div>
    )
}