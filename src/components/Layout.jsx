import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/blog">Blog</Link>
      </nav>
      <hr />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
