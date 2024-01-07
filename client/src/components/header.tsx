

const Header = () => {
  return (
    <div className="flex items-center justify-around shadow-lg h-40 rounded-lg">
      <h2 className=" text-cyan-500 text-2xl font-mono font-semibold">All Blogs</h2>
      <select
        name="Sort"
        id=""
        className=" text-cyan-500 outline-none p-2 rounded-lg"
      >
        <option value="" selected>All</option>
        <option value="">Newest</option>
        <option value="">Oldest</option>
        <option value="">Science</option>
        <option value="">Commerce</option>
        <option value="">Finance</option>
      </select>
      <input
        className=" p-2 text-justify outline-none text-cyan-500 placeholder:text-cyan-500 rounded-lg"
        type="text"
        placeholder="search"
      />
    </div>
  );
};

export default Header;
