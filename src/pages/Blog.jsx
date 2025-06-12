import { Link } from "react-router-dom";
import { usePosts } from "../lib/usePosts";

const Blog = () => {
  const posts = usePosts();

  return (
    <>
      <h1>Blog</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link to={`/blog/${p.slug}`}>{p.title}</Link> - {p.date}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Blog;
