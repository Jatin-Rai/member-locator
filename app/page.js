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

  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Ref to store the map instance
  const mapRef = useRef(null);

  // useEffect hook to fetch members data from Algolia when the component mounts
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { hits } = await index.search('');
        setMembers(hits);
        setFilteredMembers(hits);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching members data from Algolia:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // useCallback hook to handle search results and update filteredMembers state
  const handleSearchResults = useCallback((results) => {
    setFilteredMembers(results);
  }, []);

  return (
    <main>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className='text-red-500 font-semibold text-center mt-10'>{error.message}</p>
      ) : (
        <>
          <Search onSearchResults={handleSearchResults} members={members} mapRef={mapRef} />
          <Map members={filteredMembers} mapRef={mapRef} />
        </>
      )}
    </main>
  );
}
