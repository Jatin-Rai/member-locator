"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import { searchClient } from '@/lib/algoliasearch';
import CustomHits from './CustomHits';
import lodash from 'lodash';

/**
 * Search component
 * 
 * This component handles the search functionality using Algolia's InstantSearch. 
 * It allows users to search for members and displays the search results.
 * 
 * @param {Function} onSearchResults - Callback function to handle search results.
 * @param {Object} mapRef - A ref to the map instance.
 */
const Search = ({ onSearchResults, mapRef }) => {
  const [query, setQuery] = useState('');

  // Handle search results from Algolia
  const handleSearchResults = useCallback((hits) => {
    onSearchResults(hits);
  }, [onSearchResults]);

  // Handle input change in the search box with debounce
  const handleInputChange = useMemo(() => 
    lodash.debounce((e) => {
      const value = e.target.value;
      setQuery(value);

      if (!value) {
        onSearchResults([]);
      }
    }, 300), [onSearchResults]
  );

  return (
    <div className="absolute left-4 top-5 z-50">
      <InstantSearch searchClient={searchClient} indexName="maps_search">
        <SearchBox
          autoFocus
          value={query}
          onChange={handleInputChange}
          className="search-bar"
          placeholder="Search members..."
          submitIconComponent={null}
          resetIconComponent={null}
        />
        {query && (
          <CustomHits onSearchResults={handleSearchResults} mapRef={mapRef} />
        )}
      </InstantSearch>
    </div>
  );
};

export default Search;
