import algoliasearch from 'algoliasearch';

/**
 * Initializes the Algolia search client and index.
 * 
 * This module sets up the Algolia search client using environment variables 
 * for the application ID and search API key, and initializes the index for 
 * searching member data.
 */

// Initialize Algolia search client using application ID and search API key from environment variables
const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

// Initialize the Algolia index to be used for searching members
const index = searchClient.initIndex('maps_search');

export { searchClient, index };
