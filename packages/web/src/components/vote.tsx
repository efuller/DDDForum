import { Button } from "@/components/ui/button.tsx";
import arrowImage from "@/assets/arrow.svg";

export type Vote = { id: number, postId: number, voteType: 'Upvote' | 'Downvote' };
export const Votes = ({computedVotes}: { computedVotes: number }) => (
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