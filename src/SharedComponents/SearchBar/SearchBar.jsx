import React, { useState } from "react";
import "./styles.scss";
import _ from "lodash";
import { searchUsers_service } from "../../Services/sitecore-services";
import Spinner from "../../SharedComponents/Loader/Loader";
import ResultListComponent from "../ResultList/ResultList";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState({});
  const [dataList, setDataList] = useState();
  const [errorMssg, setErrorMsg] = useState("Type to search...");
  const [isLoading, setIsLoading] = useState(false);
  const searchUser = async (keyword) => {
    const bodyParameters = ["1b09f42a-4cfa-4192-9337-3953792010d4"];
    const searchData = await searchUsers_service(keyword, bodyParameters);
    if (searchData.data && searchData.status === 200) {
      setDataList(searchData.data);
      setErrorMsg("");
    } else {
      setDataList([]);
      setErrorMsg("No results found!");
    }
    setIsLoading(false);
  };

  const onChange = ({ target: { value } }) => {
    setQuery(value);
    const search = _.debounce(searchUser, 500);

    if (value.length > 2) {
      setIsLoading(true);
      search(value);
    } else {
      setIsLoading(false);
      setDataList([]);
      setErrorMsg("Type to search...");
    }

    setSearchQuery((prevSearch) => {
      if (prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });
  };

  return (
    <div className="groups-search">
      <div>
        <input
          className="groups-search__bar"
          type="text"
          value={query}
          placeholder="Enter user name..."
          onChange={onChange}
        />
      </div>
      <div className="groups-search__results">
        {isLoading ? (
          <div className="spinner-placeholder d-flex">
            <Spinner />
          </div>
        ) : !errorMssg ? (
          <ResultListComponent members={dataList} />
        ) : (
          <h3 className="error-msg">{errorMssg}</h3>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
