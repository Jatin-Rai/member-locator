"use client";

import React, { useState, useCallback } from 'react';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import { searchClient } from '@/lib/algoliasearch';
import CustomHits from './CustomHits';

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

  // Handle input change in the search box
  const handleInputChange = useCallback((e) => {
    const value = e.currentTarget.value;
    setQuery(value);

    if (!value) {
      // If the input is cleared, reset the search results
      onSearchResults([]);
    }
  }, [onSearchResults]);

  // Handle search results from Algolia
  const handleSearchResults = useCallback((hits) => {
    onSearchResults(hits);
  }, [onSearchResults]);

  return (
    <div className="absolute left-4 top-5 z-50">
      <InstantSearch searchClient={searchClient} indexName="maps_search">
        <SearchBox
          autoFocus
          value={query}
          onChange={handleInputChange}
          className="flex items-center bg-white border border-gray-300 rounded-lg p-2 shadow-lg"
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