import algoliasearch from 'algoliasearch';

/**
 * Initializes the Algolia search client and index.
 * 
 * This module sets up the Algolia search client using environment variables 
 * for the application ID and search API key, and initializes the index for 
 * searching member data.
 */

// Validate the presence of required environment variables
const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY;

if (!appId || !apiKey) {
    throw new Error("Algolia app ID and API key must be provided");
}

// Initialize Algolia search client
const searchClient = algoliasearch(appId, apiKey);

// Initialize the Algolia index to be used for searching members
const index = searchClient.initIndex('maps_search');

export { searchClient, index };
