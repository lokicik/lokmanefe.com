import { useParams } from "react-router-dom";
import { usePosts } from "../lib/usePosts";

const Post = () => {
  const { id } = useParams();
  const posts = usePosts();
  const post = posts.find((p) => p.slug === id);

  if (!post) return <p>Post not found.</p>;

  const { Component, title } = post;
  document.title = `${title} - Blog`;

  return <Component />;
};

export default Post;
