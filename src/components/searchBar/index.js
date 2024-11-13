export default function SearchBar({ text, state, setState }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={text}
        className="search-bar-input"
      />
    </div>
  );
}

{
  /* <div className="searchBar">
      <div className="stateLayer">
        <div className="TrailingElements">
          <div className="icon1Trailing"></div>
        </div>
        <div className="ContentSearchBar">
          <div className="textSearchBar"></div>
        </div>
      </div>
    </div> */
}
