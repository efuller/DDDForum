import { Button } from "@/components/ui/button.tsx";

export const PostsViewSwitcher = () => (
  <div>
    <Button variant="ghost">Popular</Button>
    {' |'}
    <Button variant="ghost">New</Button>
  </div>
);