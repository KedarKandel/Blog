// HomePage.js
import { useState, useEffect } from "react";
import SearchBar from "../components/Search";
import FilterOptions from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchBlogs } from "../redux/reducers/blogSlice";
import { IBlog } from "../types";
import Blog from "../components/Blog";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {blogs.map((blog: IBlog) => (
         <Blog key= {blog.id} blog= {blog}/>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
