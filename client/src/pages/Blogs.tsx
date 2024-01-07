import Header from "../components/header";
import Blog from "../components/Blog";

export interface IBlog {
  id: number;
  title: string;
  content: string;
}

const Blogs = () => {
  // Assuming you have a blogPosts array in your Redux store
  const blogPosts: IBlog[] = [
    { id: 1, title: "commerce", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sed augue lacus viverra vitae congue. Ultrices in iaculis nunc sed. " },
    { id: 2, title: "finance",  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.." },
    { id: 3, title: "history",  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sed augue lacus viverra vitae congue. Ultrices in iaculis nunc sed. Amet mass" },
    { id: 4, title: "commerce",  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nu"  },
    { id: 5, title: "finance",  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sed augue lacus viverra vitae congue. Ultrices in iaculis nunc sed. Amet mass" },
    { id: 6, title: "history",  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sed augue lacus viverra vitae congue. Ultrices in iaculis nunc sed. Amet massa vitae tortor condimentum lacinia quis vel eros. Pretium quam vulputate di"  },
    { id: 7, title: "history",  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc nc congue. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel."  },
  ];

  return (
    <div className="p-4">
      <Header />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {blogPosts.map((post: IBlog) => (
          <Blog key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
