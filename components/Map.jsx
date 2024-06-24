"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Button from './Button';
import MarkerPortal from './MarkerPortal';
import ImageAvatar from './ImageAvatar';

/**
 * Map Component
 *
 * This component initializes a Mapbox map, handles zooming in and out, and places markers for given members.
 * The markers are grouped by their coordinates, and clicking on a marker zooms in on the location.
 *
 * @param {object} mapRef - A ref object to store the map instance.
 * @param {Array} members - Array of member objects with location data.
 *
 * @returns {JSX.Element} The rendered map and controls.
 *
 */
const Map = ({ mapRef, members }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  const handleZoomIn = useCallback(() => {
    if (map) {
      const currentZoom = map.getZoom();
      map.setZoom(currentZoom + 0.2);
    }
  }, [map]);

  const handleZoomOut = useCallback(() => {
    if (map) {
      const currentZoom = map.getZoom();
      map.setZoom(currentZoom - 0.2);
    }
  }, [map]);

  const handleZoomToMember = useCallback((lng, lat) => {
    if (map) {
      map.flyTo({ center: [lng, lat], zoom: 12 });
    }
  }, [map]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      map.flyTo({ center: [0, 0], zoom: 1.5 });
    }
  }, [map]);

  // Group members by their coordinates
  const groupedMembers = members.reduce((acc, member) => {
    const key = `${member['location.lng']},${member['location.lat']}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(member);
    return acc;
  }, {});

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 1.5
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

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className='h-screen w-screen relative overflow-hidden'>
      <div ref={mapContainer} className='h-full' />
      <div className='absolute bottom-6 right-0 transform -translate-x-1/2 z-10 flex flex-col gap-2'>
        <Button handleZoom={handleZoomIn} symbol="+" />
        <Button handleZoom={handleZoomOut} symbol="-" />
      </div>
      {map && Object.entries(groupedMembers).map(([key, members]) => {
        const [lng, lat] = key.split(',').map(Number);
        return (
          <MarkerPortal key={key} lng={lng} lat={lat} map={map} members={members}>
            {members[0].photo && (
              <ImageAvatar
                photo={members[0].photo}
                fullName={members[0].fullName}
                onClick={() => handleZoomToMember(lng, lat)}
              />
            )}
            {!members[0].photo && (
              <div
                className='w-6 h-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold cursor-pointer'
                onClick={() => handleZoomToMember(lng, lat)}
              >
                {members[0].fullName.charAt(0)}
              </div>
            )}
          </MarkerPortal>
        );
      })}
    </div>
  );
};

export default Map;