// HomePage.js
import { useState, useEffect } from "react";
import SearchBar from "../components/Search";
import FilterOptions from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchAllBlogs } from "../api-client";

const HomePage = () => {
  const blogs = useSelector((state:RootState)=>state.blog.blogs)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("newest");

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
   // to be continue

   dispatch(dispatch)
    
    
  }, [searchQuery, selectedFilter]);

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
        {/* Render blogs based on the fetched data */}
        {/* Example: {blogs.map(blog => <BlogItem key={blog.id} blog={blog} />)} */}
      </div>
    </div>
  );
};

export default HomePage;
