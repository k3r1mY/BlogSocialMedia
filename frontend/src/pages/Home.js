//Components
import BlogDetails from "../components/BlogDetails";
import BlogForm from "../components/BlogForm";
//React
import { useEffect } from "react";
import { useBlogsContext } from "../hooks/useBlogsContext";

const Home = () => {
  const { blogs, dispatch } = useBlogsContext();
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("/api/blogs");
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_BLOGS", payload: data });
      }
    };
    fetchBlogs();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="blogs">
        {blogs &&
          blogs.map((blog) => <BlogDetails key={blog._id} blog={blog} />)}
      </div>
      <BlogForm />
    </div>
  );
};

export default Home;
