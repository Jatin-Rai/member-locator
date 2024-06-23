"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { index } from '@/lib/algoliasearch';
import Map from "@/components/Map";
import Search from "@/components/Search";
import Loader from '@/components/Loader';

/**
 * Home component
 * 
 * This component is the main page of the application. It handles the fetching, 
 * searching, and displaying of member data using Algolia's search index. 
 * It also manages the loading and error states during data fetching.
 */
export default function Home() {

  const [initialMembers, setInitialMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Ref to store the map instance
  const mapRef = useRef(null);

  // useEffect hook to fetch members data from Algolia when the component mounts
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { hits } = await index.search('', { hitsPerPage: 500 });
        setInitialMembers(hits);
        setMembers(hits);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // useCallback hook to handle search results and update members state
  const handleSearchResults = useCallback((results) => {
    setMembers(results.length > 0 ? results : initialMembers);
  }, [initialMembers]);

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
