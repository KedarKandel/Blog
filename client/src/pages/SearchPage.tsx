// HomePage.js
import { useState, useEffect } from "react";
import SearchBar from "../components/Search";
import FilterOptions from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchBlogs } from "../redux/reducers/blogSlice";

import Blog from "../components/Blog";
import Pagination from "../components/Pagination";
import { BlogType } from "../../../server/src/sharedTypes";

const SearchPage = () => {
  const blogs = useSelector((state: RootState) => state.blog.blogs);

  const pages = useSelector((state: RootState) => state.blog.totalPages);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState<number>(
    useSelector((state: RootState) => state.blog.currentPage)
  );
  const [selectedFilter, setSelectedFilter] = useState("latest");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBlogs());
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
        {blogs?.map((blog: BlogType, index) => (
          <Blog key={index} blog={blog} />
        ))}
      </div>
      <div>
        <Pagination
          page={page || 1}
          pages={pages || 1}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default SearchPage;
