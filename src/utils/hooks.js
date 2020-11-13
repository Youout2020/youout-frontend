import React, { useEffect, useRef } from 'react';

export function useLazyObserver () {
  const roomRef = useRef(null);

  useEffect(() => {
    let observer;

    if (roomRef) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(roomRef.current);
        }
      }, { threshold: [0.25] });
      observer.observe(roomRef.current);
    }

    return () => {
      observer && observer.disconnect(roomRef);
    };
  }, [roomRef]);

  return { roomRef };
}
