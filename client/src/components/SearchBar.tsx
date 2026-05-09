interface Props {
  search: string;

  setSearch: (
    value: string
  ) => void;
}

const SearchBar = ({
  search,
  setSearch,
}: Props) => {

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="w-full border border-slate-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black"
    />
  );
};

export default SearchBar;