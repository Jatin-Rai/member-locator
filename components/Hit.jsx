import ImageAvatar from './ImageAvatar';

/**
 * Hit component
 * 
 * This component displays search result (hit) from Algolia. 
 * It shows the member's photo or initial, name, and location.
 * 
 * @param {Object} hit - The search result object containing member data.
 * @param {Function} onClick - The function to handle click event on the hit.
 */
const Hit = ({ hit, onClick }) => (
    <div className="p-2 cursor-pointer hover:bg-gray-200 flex items-center space-x-2" onClick={() => onClick(hit)}>
        <ImageAvatar photo={hit.photo} fullName={hit.fullName} size={40} border />
        <div>
            <p className="font-semibold">{hit.fullName}</p>
            {hit["location.city"] ? (
                <p className="text-xs">{`${hit["location.city"]}${hit["location.state"] ? `, ${hit["location.state"]}` : ""}, ${hit["location.country"]}`}</p>
            ) : (
                <p className="text-xs">{hit["location.country"]}</p>
            )}
        </div>
    </div>
);

export default Hit;
