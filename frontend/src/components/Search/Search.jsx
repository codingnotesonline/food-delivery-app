import PropTypes from "prop-types";
import { useAppContext } from "../../context/AppContext";
import "./Search.css";

function Search({ searchStatus, changeSearchStatus }) {
  const { changeSearchContent } = useAppContext();

  const initializeSearchContent = (event) => {
    if (event.key == "Enter") {
      changeSearchStatus();
    } else {
      changeSearchContent(event.target.value);
    }
  };

  return (
    <div id="navbar-search" className={`${searchStatus}`}>
      <div className="search-box">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search here"
          onKeyDown={initializeSearchContent}
        />
      </div>
      <div className="search-btn">
        <button type="button" onClick={changeSearchStatus}>
          Search
        </button>
      </div>
    </div>
  );
}

Search.propTypes = {
  searchStatus: PropTypes.any,
  changeSearchStatus: PropTypes.any,
};

export default Search;
