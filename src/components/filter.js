import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Filter Component -------------------------------------------------

const Filter = ({ filters, setFilters, offerCount }) => {
  //Handle dynamic filter change
  const handleFilter = (evt, filterProperty, num) => {
    const newFilter = { ...filters };

    if (num) {
      newFilter[filterProperty] = parseInt(evt.target.value);
      newFilter.page = 1;
      setFilters(newFilter);
    } else {
      newFilter[filterProperty] = evt.target.value;
      setFilters(newFilter);
    }
  };

  //Handle page number drop-down, Dynmaic as per number of query results
  const pageSelector = (filters) => {
    let options = [];
    const pages =
      offerCount <= filters.resultsPerPage
        ? 1
        : ~~(offerCount / filters.resultsPerPage) + 1;
    for (let i = 1; i <= pages; i++) {
      options.push(
        <option value={`${i}`} key={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  //Handle ranger slider change..
  const handleRange = (e, values) => {
    const newFilter = { ...filters };
    newFilter.range = [...values];
    setFilters(newFilter);
  };

  //Handle Sort order toggle
  const handleSortOrder = (event) => {
    const newFilters = { ...filters };
    newFilters.ascending = event.target.checked;
    setFilters(newFilters);
  };

  return (
    <div className="filter">
      {/* Sorty by propery ie. product price or prduct name */}
      <div>
        <span>Triez par: </span>
        <span onChange={(evt) => handleFilter(evt, "sortBy")}>
          <input
            type="radio"
            name="sort"
            id="prix"
            value="price"
            defaultChecked={true}
          />
          <label htmlFor="prix">Prix</label>
          <input type="radio" name="sort" id="prix" value="name" />
          <label htmlFor="prix">Titre</label>
        </span>
      </div>

      {/* Sort order id. ascending or descending  */}
      <div className="sliders-pan">
        <div>
          <FontAwesomeIcon icon="angle-double-down" />
          <Switch
            checked={filters.ascending}
            onChange={handleSortOrder}
            inputProps={{ "aria-label": "controlled" }}
          />
          <FontAwesomeIcon icon="angle-double-up" />
        </div>
        <div className="slider">
          {/* Price range slider component, Materil UI*/}
          {/* Sort price range */}
          <Slider
            min={10}
            step={5}
            max={1000}
            getAriaLabel={() => "price range"}
            value={filters.range}
            onChangeCommitted={handleRange}
            valueLabelDisplay="on"
          />
        </div>
      </div>

      {/* Number of products per page */}
      <div className="pages">
        <label htmlFor="results-per-page">Afficher</label>
        <select
          name="results-per-page"
          id="results-per-page"
          onChange={(evt) => handleFilter(evt, "resultsPerPage", true)}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
        <label htmlFor="page">Page</label>
        <select
          name="page"
          id="page"
          onChange={(evt) => handleFilter(evt, "page")}
        >
          {pageSelector(filters)}
        </select>
      </div>
    </div>
  );
};

export default Filter;
