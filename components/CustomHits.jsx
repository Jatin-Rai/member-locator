"use client";

import { useEffect } from 'react';
import { connectHits } from 'react-instantsearch-dom';
import Hit from './Hit';

/**
 * CustomHits component
 * 
 * This component connects to Algolia's search hits and updates the search results.
 * 
 * @param {Array} hits - The list of search results.
 * @param {Function} onSearchResults - Callback function to handle search results.
 * @param {Object} mapRef - A ref to the map instance.
 */
const CustomHits = connectHits(({ hits, onSearchResults, mapRef }) => {

    // Update the search results whenever the hits change
    useEffect(() => {
        onSearchResults(hits);
    }, [hits, onSearchResults]);

    // Function to handle click on a search result
    const handleClick = (hit) => {
        if (mapRef.current && hit) {
            mapRef.current.flyTo({ center: [hit['location.lng'], hit['location.lat']], zoom: 12 });
        }
    };

    return (
        <div className="max-h-56 max-w-[250px] overflow-y-auto bg-white border border-gray-300 rounded-b-xl shadow-lg mt-1">
            {hits.map(hit => <Hit key={hit.objectID} hit={hit} onClick={() => handleClick(hit)} />)}
        </div>
    );
});

export default CustomHits;
