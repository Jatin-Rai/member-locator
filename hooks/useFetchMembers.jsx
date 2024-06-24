import { useEffect, useState } from "react";

/**
 * Custom hook to fetch members from the Algolia index.
 *
 * This hook handles fetching member data from Algolia, providing state for 
 * the initial members, current members, loading status, and errors.
 *
 * @param {Object} index - The Algolia index instance.
 *
 * @returns {Object} The state and setters for managing member data.
 */
const useFetchMembers = (index) => {
    const [initialMembers, setInitialMembers] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, [index]);

    return { initialMembers, members, setMembers, loading, error };
};

export default useFetchMembers;
