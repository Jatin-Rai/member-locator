import Image from "next/image";

/**
 * Hit component
 * 
 * This component displays search result (hit) from Algolia. 
 * It shows the member's photo or initial, name, and location.
 * 
 * @param {Object} hit - The search result object containing member data.
 * @param {Function} onClick - The function to handle click event on the hit.
**/
const Hit = ({ hit, onClick }) => (
    <div className="p-2 cursor-pointer hover:bg-gray-200 flex items-center space-x-2" onClick={() => onClick(hit)}>
        {hit.photo ? (
            <Image src={hit.photo} alt={hit.fullName} className="w-10 h-10 rounded-full" width={40} height={40} />
        ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-xl">
                {hit.fullName.charAt(0)}
            </div>
        )}
        <div>
            <p className="font-semibold">{hit.fullName}</p>
            {(hit['location.state'] && hit['location.country']) ? (
                <p className="text-xs">{`${hit['location.state']}, ${hit['location.country']}`}</p>
            ) : <p className="text-xs">{hit['location.city']}</p>}
        </div>
    </div>
);

export default Hit;