import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import arrowImage from "@/assets/arrow.svg";
import { apiClient } from "@/shared/apiClient";

type Vote = { id: number, postId: number, voteType: 'Upvote' | 'Downvote' };
type Comment = {
  id: number;
  text: string;
  memberId: number;
  postId: number;
  parentCommentId: number | null;
};
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

  // If less than a day, show hours.
  const diffInHours = Math.abs(Math.round(diff / (1000 * 60 * 60)));
  if (diffInHours < 24) {
    dateText = 'hours ago';
    return diffInHours.toString() + ' ' + dateText;
  }

  if (diff === 1) {
    dateText = 'day ago';
  }

  return Math.abs(Math.round(diff / (1000 * 60 * 60 * 24))).toString() + ' ' + dateText;
}

const Vote = ({computedVotes}: { computedVotes: number }) => (
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
        posts.map((post, i) => (
          <li className="flex mb-4" key={i}>
            <Vote computedVotes={post.votes.length}/>
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
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    apiClient.getRecentPosts().then((result) => {
      setPosts(result.data);
    });
  }, []);

  return (
    <div>
      <PostsViewSwitcher />
      <PostList posts={posts} />
    </div>
    )
}