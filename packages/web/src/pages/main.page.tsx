import { useEffect, useState } from "react";
import { apiClient } from "@/shared/apiClient";
import { Post, PostList } from "@/components/postList.tsx";
import { PostsViewSwitcher } from "@/components/postsViewSwitcher.tsx";

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