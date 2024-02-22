type Props = {
  handleFilter: (filterQuery: string) => void;
};

const FilterOptions = ({ handleFilter }: Props) => {
  return (
    <select onChange={(e) => handleFilter(e.target.value)}>
      <option value="latest">Latest</option>
      <option value="oldest">Oldest</option>
      <option value="science">Science</option>
      <option value="nature">Nature</option>
      <option value="love">Love</option>
      <option value="technology">Technology</option>
      <option value="history">History</option>
      <option value="sports">Sports</option>
    </select>
  );
};

export default FilterOptions;
