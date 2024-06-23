"use client";

import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import Image from 'next/image';

/**
 * MarkerPortal Component
 *
 * This component renders a custom Mapbox marker and a popup containing member information on a map.
 *
 * @param {React.ReactNode} children - The child elements to render inside the marker.
 * @param {number} lng - The longitude where the marker should be placed.
 * @param {number} lat - The latitude where the marker should be placed.
 * @param {object} map - The Mapbox map instance to which the marker should be added.
 * @param {Array} members - Array of member objects to display in the popup.
 *
 * @returns {null} This component does not render anything directly in the DOM.
 *
 */
const MarkerPortal = ({ children, lng, lat, map, members }) => {
  const markerRef = useRef(new mapboxgl.Marker({ element: document.createElement('div') }));
  const popupRef = useRef(new mapboxgl.Popup({ offset: 25, paddingLeft: "10px" }));

  useEffect(() => {
    const marker = markerRef.current;
    const markerElement = marker.getElement();
    const root = createRoot(markerElement);

    root.render(children);
    marker.setLngLat([lng, lat]).addTo(map);

    const popup = popupRef.current;
    const popupContent = document.createElement('div');
    const popupRoot = createRoot(popupContent);

    popupRoot.render(
      <div className='max-h-44 overflow-y-auto flex flex-col px-4 pt-1'>
        {members.map((member) => (
          <div key={member.objectID} className='flex items-center space-x-4 mb-2'>
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.fullName}
                width={50}
                height={50}
                className="rounded-full border-2 border-blue-400"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-xl">
                {member.fullName.charAt(0)}
              </div>
            )}
            <div className='flex flex-col'>
              <span className="block text-sm font-semibold">{member.fullName}</span>
              <span className="block text-xs">{member['location.city']}</span>
            </div>
          </div>
        ))}
      </div>
    );

    popup.setDOMContent(popupContent);
    marker.setPopup(popup);

    return () => {
      root.unmount();
      popupRoot.unmount();
      marker.remove();
    };
  }, [children, lng, lat, map, members]);

  return null;
};

export default MarkerPortal;
