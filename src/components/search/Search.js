import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_URL, geoAPIoptions } from "../../api";

import "./search.css";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const onChangeHandler = (data) => {
    setSearch(data);
    onSearchChange(data);
  };

  const loadOptionhandler = (inputValue) => {
    return fetch(
      `${GEO_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
      geoAPIoptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name} ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };
  return (
    <AsyncPaginate
      placeholder="Search for city"
      debouncetimeout={600}
      value={search}
      onChange={onChangeHandler}
      loadOptions={loadOptionhandler}
      className="search-bar"
    />
  );
};

export default Search;
