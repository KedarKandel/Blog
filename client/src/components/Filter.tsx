type Props = {
  handleFilter: (filterQuery: string) => void;
};

const FilterOptions = ({ handleFilter }: Props) => {
  return (
    <select
      onChange={(e) => handleFilter(e.target.value)}
      className="appearance-none bg-blue-500 border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow focus:outline-none focus:shadow-outline text-white font-semibold cursor-pointer"
    >
      <option value="" disabled>
        Filters
      </option>
      <option className="text-blue-600 font-semibold" value="latest">
        Latest
      </option>
      <option className="text-blue-600 font-semibold" value="oldest">
        Oldest
      </option>
      <option className="text-blue-600 font-semibold" value="science">
        Science
      </option>
      <option className="text-blue-600 font-semibold" value="nature">
        Nature
      </option>
      <option className="text-blue-600 font-semibold" value="love">
        Love
      </option>
      <option className="text-blue-600 font-semibold" value="technology">
        Technology
      </option>
      <option className="text-blue-600 font-semibold" value="history">
        History
      </option>
      <option className="text-blue-600 font-semibold" value="sports">
        Sports
      </option>
    </select>
  );
};

export default FilterOptions;
