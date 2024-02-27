import React, { useRef, useEffect } from 'react';
import ReactSwipe from 'react-swipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import img4 from "../images/img-4.jpg";
import img5 from "../images/img-5.png";
import img9 from "../images/img-9.png";
import "./Gallery.css";

const Gallery = () => {
  const slideImages = [
    { id: 1, src: img9 },
    { id: 3, src: img4 },
    { id: 2, src: img5 },
  ];

  const reactSwipeEl = useRef(null);

  const handleNext = () => {
    if (reactSwipeEl.current) {
      reactSwipeEl.current.next();
    }
  };

  const handlePrev = () => {
    if (reactSwipeEl.current) {
      reactSwipeEl.current.prev();
    }
  };

  const handleSwipeLeft = () => {
    handleNext();
  };

  const handleSwipeRight = () => {
    handlePrev();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel_container">
      <ReactSwipe
        className="carousel"
        swipeOptions={{
          continuous: true,
          callback: (index) => console.log(`Current slide index: ${index}`),
          threshold: 100,
          onSwipeLeft: handleSwipeLeft,
          onSwipeRight: handleSwipeRight,
        }}
        ref={reactSwipeEl}
      >
        {slideImages.map((image) => (
          <div className='image_wrapper' key={image.id}>
            <img src={image.src} alt={`Image ${image.id}`} />
          </div>
        ))}
      </ReactSwipe>
    </div>
  );
};

export default Gallery;
