"use client";

import React, { useEffect, useRef, useState } from 'react';

import mapboxgl from 'mapbox-gl';

import Button from './Button';

/**
 * Map component
 * 
 * This component displays a Mapbox map and plots markers for the members' locations. 
 * It handles initializing the map, adding markers, and providing zoom controls.
 * 
 * @param {Array} members - The list of member objects with location data.
 * @param {Object} mapRef - A ref to store the map instance.
 */
const Map = ({ members, mapRef }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  // useEffect hook to initialize the Mapbox map when the component mounts
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 1.4
      });

      mapInstance.on('load', () => {
        setMap(mapInstance);
        mapRef.current = mapInstance;
      });

      return mapInstance;
    };

    if (!map) {
      const newMap = initializeMap();
      setMap(newMap);
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map, mapRef]);

  // useEffect hook to update the markers on the map when the members data changes
  useEffect(() => {
    if (map && Array.isArray(members)) {
      // Remove existing markers
      document.querySelectorAll('.member-marker').forEach(marker => marker.remove());

      // Group members by coordinates
      const coordinateGroups = members.reduce((groups, member) => {
        const key = `${member['location.lng']},${member['location.lat']}`;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(member);
        return groups;
      }, {});

      // Add new markers
      Object.values(coordinateGroups).forEach((group) => {
        const memberElement = document.createElement('div');
        memberElement.className = 'member-marker relative bg-white text-black p-2 rounded-lg shadow-lg flex items-center justify-center space-x-2';

        if (group.length > 1) {
          // Create a dropdown for locations with multiple members
          const dropdownContent = group.map(member => `
            <div class="flex items-center justify-center space-x-2 mb-2">
              ${member.photo
                ? `<img src="${member.photo}" alt="${member.fullName}" class="w-10 h-10 rounded-full" />`
                : `<div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">${member.fullName.charAt(0)}</div>`
              }
              <div>
                <p class="text-xs font-semibold">${member.fullName}</p>
                ${member['location.city'] ? `<p class="text-xs">${member['location.city']}</p>` : ''}
              </div>
            </div>
          `).join('');

          memberElement.innerHTML = `
            <div class="relative">
              <button class="dropdown-toggle text-xs font-semibold">Members (${group.length})</button>
              <div class="dropdown-content absolute -top-2 left-28 bg-white shadow-lg rounded-lg p-4 hidden">
                ${dropdownContent}
              </div>
            </div>
          `;

          // Toggle dropdown visibility on click
          memberElement.querySelector('.dropdown-toggle').addEventListener('click', () => {
            const dropdown = memberElement.querySelector('.dropdown-content');
            dropdown.classList.toggle('hidden');
          });
        } else {
          // Display single member information directly
          const member = group[0];
          memberElement.innerHTML = `
            ${member.photo
              ? `<img src="${member.photo}" alt="${member.fullName}" class="w-10 h-10 rounded-full" />`
              : `<div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">${member.fullName.charAt(0)}</div>`
            }
            <div>
              <p class="text-xs font-semibold">${member.fullName}</p>
              ${member['location.city'] ? `<p class="text-xs">${member['location.city']}</p>` : ''}
            </div>
          `;
        }

        new mapboxgl.Marker(memberElement)
          .setLngLat([group[0]['location.lng'], group[0]['location.lat']])
          .addTo(map);

        // Add click event listener to marker element to fly to the marker
        memberElement.addEventListener('click', () => {
          map.flyTo({ center: [group[0]['location.lng'], group[0]['location.lat']], zoom: 5.5 });
        });
      });
    }
  }, [map, members]);

  // useEffect hook to handle the 'Escape' key to reset map view
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        map.flyTo({ center: [0, 0], zoom: 1.4 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [map]);

  // Function to handle zoom in action
  const handleZoomIn = () => {
    if (map) {
      const currentZoom = map.getZoom();
      map.setZoom(currentZoom + 1);
    }
  };

  // Function to handle zoom out action
  const handleZoomOut = () => {
    if (map) {
      const currentZoom = map.getZoom();
      map.setZoom(currentZoom - 1);
    }
  };

  return (
    <div className='h-screen w-screen relative'>
      <div ref={mapContainer} className='h-full' />
      <div className='absolute bottom-6 right-0 transform -translate-x-1/2 z-10 flex flex-col gap-2'>
        <Button handleZoom={handleZoomIn} symbol="+" />
        <Button handleZoom={handleZoomOut} symbol="-" />
      </div>
    </div>
  );
};

export default Map;
