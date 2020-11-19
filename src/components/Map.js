/* global kakao */
import React, { useEffect, useState } from 'react';
import styles from './Map.module.scss';
import Button from './Button';
import { pageName } from '../constants/page';

const Map = ({ setPage, gameInfo, setGameInfo }) => {
  // user 정보 다시 가져오기
  const [ currentCoords, setCurrentCoords ] = useState({
    lat: 37.5058543,
    lng: 127.0569843,
  });
  const { lat, lng } = currentCoords;
  const [ address, setAddress ] = useState(null);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    const markerPosition = new kakao.maps.LatLng(lat, lng);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      clickable: true,
      draggable: true,
    });
    marker.setMap(map);

    kakao.maps.event.addListener(marker, 'dragend', () => {
      const newPosition = marker.getPosition();
      setCurrentCoords({
        lat: newPosition.getLat(),
        lng: newPosition.getLng(),
      });
    });

    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(lat, lng);
    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
      }
    });
  }, [currentCoords]);

  const handleSelectButton = () => {
    setGameInfo({
      ...gameInfo,
      address,
      location: {
        type: 'Point',
        coordinates: [ lng, lat ],
      },
    });
    setPage(pageName.FIRST);
  };

  return (
    <div className={styles.container}>
      <div id='map' className={styles.map} />
      <span className={styles.address}>{address}</span>
      <Button text='선택' onClick={handleSelectButton} />
    </div>
  );
};

export default Map;
