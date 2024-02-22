// SearchBar.js
import { useState } from "react";

type Props = {
  handleSearch: (searchQuery: string) => void;
};

const Search = ({ handleSearch }: Props) => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
    <input
      type="text"
      placeholder="Search blogs..."
      value={query}
      onChange={handleChange}
      className="appearance-none outline-none bg-white border px-4 py-2 rounded-l shadow focus:outline-none focus:shadow-outline"
    />
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r shadow"
    >
      Search
    </button>
  </form>
  
  );
};

export default Search;
