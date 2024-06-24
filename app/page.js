"use client";

import React, { useCallback, useRef } from 'react';
import { index } from '@/lib/algoliasearch';
import Map from "@/components/Map";
import Search from "@/components/Search";
import Loader from '@/components/Loader';
import useFetchMembers from '@/hooks/useFetchMembers';

/**
 * Home component
 * 
 * This component is the main page of the application. It handles the fetching, 
 * searching, and displaying of member data using Algolia's search index. 
 * It also manages the loading and error states during data fetching.
 */
export default function Home() {

  const { initialMembers, members, setMembers, loading, error } = useFetchMembers(index);

  // Ref to store the map instance
  const mapRef = useRef(null);

  // useCallback hook to handle search results and update members state
  const handleSearchResults = useCallback((results) => {
    setMembers(results.length > 0 ? results : initialMembers);
  }, [initialMembers, setMembers]);

  return (
    <main>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className='text-red-500 font-semibold text-center mt-10'>{error.message}</p>
      ) : (
        <>
          <Search onSearchResults={handleSearchResults} mapRef={mapRef} />
          <Map members={members} mapRef={mapRef} />
        </>
      )}
    </main>
  );
}
