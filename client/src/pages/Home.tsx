// HomePage.js
import { useState, useEffect } from "react";
import SearchBar from "../components/Search";
import FilterOptions from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchBlogs } from "../redux/reducers/blogSlice";

const HomePage = () => {
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("newest");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      fetchBlogs({ searchTerm: searchQuery, filterOptions: selectedFilter })
    );
  }, [searchQuery, selectedFilter, dispatch]);

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  const handleFilter = (filterQuery: string) => {
    setSelectedFilter(filterQuery);
  };

  return (
    <div className="container mx-auto flex flex-col">
      <div className="flex justify-between">
        <SearchBar handleSearch={handleSearch} />
        <FilterOptions handleFilter={handleFilter} />
      </div>

      <div>
        {blogs.map((blog) => (
          <div key={blog.id}>
            <h1 key={blog.title}>{blog.title}</h1>
            <p key={blog.description}>{blog.description}</p>
            <p key={blog.createdBy}>{blog.createdBy}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
