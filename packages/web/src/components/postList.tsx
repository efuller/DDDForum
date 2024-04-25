import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Link } from "react-router-dom";
import { Vote, Votes } from "@/components/vote.tsx";

type Comment = {
  id: number;
  text: string;
  memberId: number;
  postId: number;
  parentCommentId: number | null;
};

export type Post = {
  title: string;
  dateCreated: string;
  memberPostedBy: { user: { userName: string } };
  comments: Comment[];
  votes: Vote[];
}

function dateDiff(date1: Date, date2: Date) {
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

export const PostList = ({posts}: { posts: Post[] }) => {
  if (!posts.length) {
    return <div>No posts found</div>;
  }

  return (
    <ul>
      {
        posts.map((post, i) => (
          <li className="flex mb-4" key={i}>
            <Votes computedVotes={post.votes.length}/>
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