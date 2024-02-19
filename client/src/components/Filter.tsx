type Props = {
    handleFilter:(filterQuery: string)=>void
}

const FilterOptions = ({ handleFilter }: Props) => {
  return (
    <select onChange={(e) => handleFilter(e.target.value)}>
      <option value="newest">Latest</option>
      <option value="oldest">Oldest</option>
      <option value="science">Science</option>
      <option value="nature">Nature</option>
      <option value="technology">Technology</option>
    </select>
  );
};

export default FilterOptions;
